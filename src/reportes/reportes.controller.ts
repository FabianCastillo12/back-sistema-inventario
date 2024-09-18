import { Controller, Get } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('ventas-hoy')
  async obtenerVentasDeHoy() {
    return this.reportesService.obtenerVentasDeHoy();
  }
}
