import {
  addMonths,
  buildSavingsProjection,
  monthsBetween,
  startOfPaceWindow,
  GoalMovementStats,
  ProjectableGoal,
} from './savings-projection.util';

/** Instante fijo de referencia para que los tests no dependan del día en que corren. */
const NOW = new Date(2026, 8, 7, 12, 0, 0); // 7 de septiembre de 2026

/** Arma una meta con los defaults más comunes. */
function goal(overrides: Partial<ProjectableGoal> = {}): ProjectableGoal {
  return {
    target_amount: 1_000_000,
    current_amount: 300_000,
    deadline: null,
    created_at: addMonths(NOW, -6),
    ...overrides,
  };
}

/** Arma los agregados de movimientos con los defaults más comunes. */
function stats(overrides: Partial<GoalMovementStats> = {}): GoalMovementStats {
  return {
    window_deposits: 0,
    window_withdrawals: 0,
    window_first_at: null,
    total_count: 0,
    ...overrides,
  };
}

describe('monthsBetween', () => {
  it('cuenta meses enteros de calendario', () => {
    expect(monthsBetween(new Date(2026, 2, 7), new Date(2026, 8, 7))).toBe(6);
  });

  it('devuelve la fracción del mes en curso', () => {
    // Del 1 al 16 de marzo (31 días): 15/31 del mes.
    const value = monthsBetween(new Date(2026, 2, 1), new Date(2026, 2, 16));
    expect(value).toBeCloseTo(15 / 31, 5);
  });

  it('devuelve 0 si la fecha final no es posterior a la inicial', () => {
    expect(monthsBetween(NOW, NOW)).toBe(0);
    expect(monthsBetween(NOW, addMonths(NOW, -2))).toBe(0);
  });

  it('cruza el fin de año sin desfasarse', () => {
    expect(monthsBetween(new Date(2026, 10, 15), new Date(2027, 1, 15))).toBe(3);
  });
});

describe('startOfPaceWindow', () => {
  it('arranca 6 meses antes de la referencia', () => {
    expect(startOfPaceWindow(NOW)).toEqual(new Date(2026, 2, 7, 12, 0, 0));
  });
});

describe('buildSavingsProjection - ritmo sobre movimientos reales', () => {
  it('promedia el neto de la ventana sobre los meses con actividad', () => {
    // 400.000 aportados a lo largo de 4 meses => 100.000 por mes; faltan 700.000 => 7 meses.
    const result = buildSavingsProjection(
      goal(),
      stats({ window_deposits: 400_000, window_first_at: addMonths(NOW, -4), total_count: 4 }),
      NOW,
    );

    expect(result.rate_basis).toBe('movements');
    expect(result.monthly_rate).toBe(100_000);
    expect(result.status).toBe('projected');
    expect(result.months_to_goal).toBe(7);
    expect(result.projected_date).toBe('2027-04-07');
  });

  it('descuenta los retiros del ritmo', () => {
    const result = buildSavingsProjection(
      goal(),
      stats({
        window_deposits: 600_000,
        window_withdrawals: 200_000,
        window_first_at: addMonths(NOW, -4),
        total_count: 6,
      }),
      NOW,
    );

    expect(result.monthly_rate).toBe(100_000);
  });

  it('con ritmo negativo por retiros no proyecta ninguna fecha', () => {
    const result = buildSavingsProjection(
      goal(),
      stats({
        window_deposits: 100_000,
        window_withdrawals: 300_000,
        window_first_at: addMonths(NOW, -4),
        total_count: 5,
      }),
      NOW,
    );

    expect(result.status).toBe('stalled');
    expect(result.monthly_rate).toBeLessThan(0);
    expect(result.months_to_goal).toBeNull();
    expect(result.projected_date).toBeNull();
    expect(result.message).toContain('no vas a alcanzar la meta');
  });

  it('aplica el piso de un mes cuando todo el historial es de los últimos días', () => {
    // Sin el piso, 50.000 aportados hace 2 días proyectarían un ritmo mensual absurdo.
    const twoDaysAgo = new Date(NOW.getTime() - 2 * 24 * 60 * 60 * 1000);
    const result = buildSavingsProjection(
      goal({ current_amount: 50_000 }),
      stats({ window_deposits: 50_000, window_first_at: twoDaysAgo, total_count: 1 }),
      NOW,
    );

    expect(result.monthly_rate).toBe(50_000);
  });

  it('con historial anterior a la ventana no cae al fallback: el ritmo actual es cero', () => {
    // Meta abandonada: aportó fuerte hace más de 6 meses y nada desde entonces. Estimar sobre
    // `current_amount` acá le prometería una fecha que no va a cumplir.
    const result = buildSavingsProjection(goal(), stats({ total_count: 3 }), NOW);

    expect(result.rate_basis).toBe('movements');
    expect(result.monthly_rate).toBe(0);
    expect(result.status).toBe('stalled');
    expect(result.months_to_goal).toBeNull();
  });
});

describe('buildSavingsProjection - fallback sin movimientos', () => {
  it('estima el ritmo repartiendo lo ahorrado sobre la antigüedad de la meta', () => {
    // 300.000 en 6 meses => 50.000 por mes; faltan 700.000 => 14 meses.
    const result = buildSavingsProjection(goal(), null, NOW);

    expect(result.rate_basis).toBe('estimated');
    expect(result.monthly_rate).toBe(50_000);
    expect(result.months_to_goal).toBe(14);
    expect(result.message).toContain('estimado');
  });

  it('una meta recién creada no divide por menos de un mes', () => {
    const result = buildSavingsProjection(
      goal({ current_amount: 120_000, created_at: new Date(NOW.getTime() - 3 * 24 * 60 * 60 * 1000) }),
      null,
      NOW,
    );

    expect(result.monthly_rate).toBe(120_000);
  });

  it('sin movimientos ni monto ahorrado no hay base para estimar', () => {
    const result = buildSavingsProjection(goal({ current_amount: 0 }), null, NOW);

    expect(result.rate_basis).toBe('none');
    expect(result.status).toBe('stalled');
    expect(result.message).toContain('Todavía no registraste aportes');
  });

  it('sin `created_at` trata la meta como recién creada en vez de romper', () => {
    const result = buildSavingsProjection(goal({ created_at: null }), null, NOW);

    expect(result.monthly_rate).toBe(300_000);
  });
});

describe('buildSavingsProjection - fecha objetivo', () => {
  it('sugiere el aporte mensual necesario para llegar al deadline', () => {
    // Faltan 700.000 y quedan 7 meses => 100.000 por mes.
    const result = buildSavingsProjection(
      goal({ deadline: addMonths(NOW, 7) }),
      stats({ window_deposits: 400_000, window_first_at: addMonths(NOW, -4), total_count: 4 }),
      NOW,
    );

    expect(result.deadline_status).toBe('upcoming');
    expect(result.months_to_deadline).toBe(7);
    expect(result.required_monthly).toBe(100_000);
    expect(result.meets_deadline).toBe(true);
  });

  it('marca que el ritmo no alcanza cuando el deadline está cerca', () => {
    const result = buildSavingsProjection(
      goal({ deadline: addMonths(NOW, 2) }),
      stats({ window_deposits: 400_000, window_first_at: addMonths(NOW, -4), total_count: 4 }),
      NOW,
    );

    expect(result.required_monthly).toBe(350_000);
    expect(result.meets_deadline).toBe(false);
    expect(result.message).toContain('llegás tarde');
  });

  it('con menos de un mes por delante sugiere el total que falta, no una fracción inflada', () => {
    const inFiveDays = new Date(NOW.getTime() + 5 * 24 * 60 * 60 * 1000);
    const result = buildSavingsProjection(goal({ deadline: inFiveDays }), null, NOW);

    expect(result.required_monthly).toBe(700_000);
  });

  it('con el deadline vencido no devuelve un aporte mensual absurdo', () => {
    const result = buildSavingsProjection(goal({ deadline: addMonths(NOW, -2) }), null, NOW);

    expect(result.deadline_status).toBe('overdue');
    expect(result.required_monthly).toBeNull();
    expect(result.months_to_deadline).toBeNull();
    expect(result.message).toContain('la fecha objetivo ya pasó');
  });

  it('el deadline de hoy sigue vigente hasta el final del día', () => {
    const today = new Date(2026, 8, 7);
    const result = buildSavingsProjection(goal({ deadline: today }), null, NOW);

    expect(result.deadline_status).toBe('upcoming');
  });

  it('sin deadline no sugiere aporte mensual', () => {
    const result = buildSavingsProjection(goal(), null, NOW);

    expect(result.deadline_status).toBe('none');
    expect(result.required_monthly).toBeNull();
    expect(result.meets_deadline).toBeNull();
  });
});

describe('buildSavingsProjection - casos borde', () => {
  it('meta completada', () => {
    const result = buildSavingsProjection(goal({ current_amount: 1_200_000 }), null, NOW);

    expect(result.status).toBe('completed');
    expect(result.months_to_goal).toBe(0);
    expect(result.required_monthly).toBe(0);
    expect(result.meets_deadline).toBe(true);
  });

  it('meta con objetivo en cero no se proyecta', () => {
    const result = buildSavingsProjection(goal({ target_amount: 0, current_amount: 0 }), null, NOW);

    expect(result.status).toBe('invalid_target');
    expect(result.months_to_goal).toBeNull();
    expect(result.required_monthly).toBeNull();
  });

  it('un ritmo positivo pero irrisorio se trata como inalcanzable en vez de devolver un número sin sentido', () => {
    const result = buildSavingsProjection(
      goal({ current_amount: 100 }),
      stats({ window_deposits: 100, window_first_at: addMonths(NOW, -6), total_count: 1 }),
      NOW,
    );

    expect(result.status).toBe('stalled');
    expect(result.months_to_goal).toBeNull();
    expect(result.monthly_rate).toBeGreaterThan(0);
  });
});
