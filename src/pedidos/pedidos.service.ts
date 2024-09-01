import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { DetallePedido } from 'src/detalle-pedidos/entities/detalle-pedido.entity';
import { Producto } from 'src/producto/entities/producto.entity';

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
    
  ) {}
  async create(createPedidoDto: CreatePedidoDto) {
    //  const  cliente=  await this.clienteRepository.findOneBy({dni:72506592})
    //   if(!cliente){
    //     throw new NotFoundException(`No encontramos al cliente `);
    //     //throw new BadRequestException("cliente no existe")
    //   }
    //   const  detalle=await this.detalleRepository.save()
    //    const producto= await this.productoRepository.create(cliente,)
    return "no sabo ayuda"
  }

  findAll() {
    return `This action returns all pedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
