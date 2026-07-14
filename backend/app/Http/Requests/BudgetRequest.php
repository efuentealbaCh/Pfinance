<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BudgetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $budgetId = $this->route('budget');
        $userId = $this->user()->id;

        return [
            'category_id' => [
                'required',
                'uuid',
                'exists:categories,id',
            ],
            'amount' => [
                'required',
                'numeric',
                'min:1',
            ],
            'period' => [
                'required',
                Rule::in(['monthly', 'weekly', 'yearly']),
                // Evitar duplicado: mismo usuario + categoría + período
                Rule::unique('budgets')
                    ->where('user_id', $userId)
                    ->where('category_id', $this->input('category_id'))
                    ->ignore($budgetId),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'La categoría es obligatoria.',
            'category_id.exists'   => 'La categoría seleccionada no existe.',
            'amount.required'      => 'El monto del presupuesto es obligatorio.',
            'amount.numeric'       => 'El monto debe ser un valor numérico.',
            'amount.min'           => 'El monto debe ser al menos $1.',
            'period.required'      => 'El período es obligatorio.',
            'period.in'            => 'El período debe ser mensual, semanal o anual.',
            'period.unique'        => 'Ya tienes un presupuesto para esta categoría en el mismo período.',
        ];
    }
}
