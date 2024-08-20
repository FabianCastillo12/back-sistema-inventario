import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    nombre:string;
    
    @Column()
    email:string;
    @Column()
    telefono:string;
    @Column()
    direccion:string;


}
