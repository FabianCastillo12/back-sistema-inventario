import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class DetallePedido {

 @PrimaryColumn()
 id:number;
 @Column()
 cantidad:number;
 @Column({type:"float"})
 precio_unitario:number;
 @Column({type:"float"})
 subTotal:number
 @ManyToOne(() => Pedido , (pedido) =>pedido.DetallePedidos)
 pedido:Pedido;
@ManyToOne(()=>Producto,(producto)=>producto.detallePedidos)
 producto:Producto;

}

