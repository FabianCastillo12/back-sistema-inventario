import { Cliente } from "src/clientes/entities/cliente.entity";
import { DetallePedido } from "src/detalle-pedidos/entities/detalle-pedido.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Pedido {
    @Column({primary:true,generated:true})
    id:number;
    @CreateDateColumn()
    fecha_pedido:Date;
    @UpdateDateColumn()
    actualizar_pedido: Date;
    @Column({type:"boolean"})
    estado:boolean;
    @Column()
    total:number
    @OneToMany(() => DetallePedido, (detalle) =>detalle.id) // note: we will create author property in the Photo class below
    DetallePedidos: DetallePedido[];
    @ManyToOne(()=>Cliente,(cliente=>cliente.pedidos))
    cliente:Cliente;
}

