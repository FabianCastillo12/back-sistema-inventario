import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../pedidos/entities/pedido.entity'; 
import { DetallePedido } from '../detalle-pedidos/entities/detalle-pedido.entity'; 

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
  ) {}

  async obtenerVentasDeHoy(): Promise<any> {
    const hoy = new Date();
    const inicioDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const finDelDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1);

    const ventasHoy = await this.pedidoRepository.createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.detallePedidos', 'detalle') 
      .where('pedido.fecha_pedido >= :inicioDelDia', { inicioDelDia })
      .andWhere('pedido.fecha_pedido < :finDelDia', { finDelDia })
      .getMany();

    return ventasHoy;
  }
}