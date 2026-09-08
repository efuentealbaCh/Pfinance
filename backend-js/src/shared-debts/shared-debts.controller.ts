import { Controller, Post, Body, Param, UseGuards, Request, Put, ParseUUIDPipe } from '@nestjs/common';
import { SharedDebtsService } from './shared-debts.service';
import { AuthGuard } from '@nestjs/passport';
import { RejectDebtPaymentDto } from './dto/reject-debt-payment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class SharedDebtsController {
  constructor(private readonly sharedDebtsService: SharedDebtsService) {}

  @Post('groups/:groupId/debts')
  create(@Request() req: any, @Param('groupId') groupId: string, @Body() data: any) {
    return this.sharedDebtsService.create(groupId, req.user.id, data);
  }

  /**
   * El deudor declara que pagó su parte. NO salda la deuda: queda esperando que el acreedor
   * confirme haber recibido el dinero. La ruta se mantiene por compatibilidad con el frontend
   * actual, aunque su significado cambió de "pagado" a "pago declarado".
   */
  @Put('debts/:debtId/pay')
  declarePayment(@Request() req: any, @Param('debtId', ParseUUIDPipe) debtId: string) {
    return this.sharedDebtsService.declarePayment(debtId, req.user.id);
  }

  /**
   * El acreedor confirma que recibió el pago declarado. Recién acá la parte queda saldada.
   * Solo puede hacerlo quien creó la deuda; el servicio rechaza con 403 a cualquier otro.
   */
  @Put('debts/:debtId/splits/:splitId/confirm')
  confirmPayment(
    @Request() req: any,
    @Param('debtId', ParseUUIDPipe) debtId: string,
    @Param('splitId', ParseUUIDPipe) splitId: string,
  ) {
    return this.sharedDebtsService.confirmPayment(debtId, splitId, req.user.id);
  }

  /**
   * El acreedor rechaza un pago declarado (el clásico "a mí no me llegó") y la parte vuelve a
   * pendiente. Sin esta salida, una declaración equivocada dejaría la deuda trabada para siempre.
   */
  @Put('debts/:debtId/splits/:splitId/reject')
  rejectPayment(
    @Request() req: any,
    @Param('debtId', ParseUUIDPipe) debtId: string,
    @Param('splitId', ParseUUIDPipe) splitId: string,
    @Body() dto: RejectDebtPaymentDto,
  ) {
    return this.sharedDebtsService.rejectPayment(debtId, splitId, req.user.id, dto);
  }
}
