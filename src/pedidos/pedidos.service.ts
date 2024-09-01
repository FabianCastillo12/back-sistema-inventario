import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { DetallePedido } from 'src/detalle-pedidos/entities/detalle-pedido.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { DetallePedidosService } from 'src/detalle-pedidos/detalle-pedidos.service';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(DetallePedido)
    private readonly detalleRepository: Repository<DetallePedido>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly detallePedidosService: DetallePedidosService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: createPedidoDto.clienteId },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${createPedidoDto.clienteId} no encontrado.`);
    }
    
    // El ID del pedido se obtendrá después de guardar el pedido
    const detallesPromises = createPedidoDto.detalles.map(async (detalleDto) => {
      const producto = await this.productoRepository.findOneBy({
        id: detalleDto.productoId,
      });
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${detalleDto.productoId} no encontrado.`);
      }
    
      const precio_unitario = producto.precio;
      const subTotal = detalleDto.cantidad * precio_unitario;
    
      // Crear el detalle del pedido con el ID del pedido
      const detalle = this.detalleRepository.create({
        cantidad: detalleDto.cantidad,
        precio_unitario: precio_unitario,
        subTotal: subTotal,
        producto: producto,
        // Asignar el pedido más adelante después de que se haya creado
      });
  
      return detalle; // Guardar el detalle del pedido después
    });
    
    const pedido = this.pedidosRepository.create({
      fecha_pedido: new Date(),
      actualizar_pedido: new Date(),
      estado: createPedidoDto.estado,
      total: 0, // Se actualizará más tarde
      cliente: cliente,
      detallePedidos: [], // Inicialmente vacío
    });
  
    // Guardar el pedido para obtener el ID
    const savedPedido = await this.pedidosRepository.save(pedido);
    console.log(savedPedido.id);
    
    // Actualizar detalles con el ID del pedido
    const savedDetallesPromises = createPedidoDto.detalles.map(async (detalleDto) => {
      const producto = await this.productoRepository.findOneBy({
        id: detalleDto.productoId,
      });
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${detalleDto.productoId} no encontrado.`);
      }
  
      const precio_unitario = producto.precio;
      const subTotal = detalleDto.cantidad * precio_unitario;
      console.log(savedPedido, "pedido")
      const detalle = this.detalleRepository.create({
        cantidad: detalleDto.cantidad,
        precio_unitario: precio_unitario,
        subTotal: subTotal,
        producto: producto,
        pedido: savedPedido // Asignar el pedido guardado
      });
      console.log(savedPedido, "pedido 2")
      return this.detalleRepository.save(detalle);
    });
  
    const savedDetalles = await Promise.all(savedDetallesPromises);
  
    // Actualizar el pedido con los detalles guardados y el total
    savedPedido.total = savedDetalles.reduce((total, detalle) => total + detalle.subTotal, 0);
    savedPedido.detallePedidos = savedDetalles;
    console.log(savedPedido, "pedido 3")
    return await this.pedidosRepository.save(savedPedido);
    
  }

  findAll() {
    return this.pedidosRepository.find({ relations: ['cliente', 'detallePedidos', 'detallePedidos.producto'] });
  }

  async findOne(id: number) {
    const pedido = await this.pedidosRepository.findOne({
      where: { id: id },
      relations: ['cliente', 'detallePedidos', 'detallePedidos.producto'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidosRepository.preload({
      id: id,
      ...updatePedidoDto,
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }

    return this.pedidosRepository.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.pedidosRepository.findOne({
      where: { id: id },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }

    return this.pedidosRepository.remove(pedido);
  }
}
