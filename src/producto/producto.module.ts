import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService],

  imports:[TypeOrmModule.forFeature([Producto,Categoria]),CategoriaModule]
})
export class ProductoModule {}
