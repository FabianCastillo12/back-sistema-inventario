import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ReportesModule } from './reportes/reportes.module'

@Module({
  imports: [
    AuthModule,ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5430,
      username: 'postgres',
      password: 'ostgres',
      database: 'sodaLimon',
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    ProductoModule,
    CategoriaModule,
    ClientesModule,
    PedidosModule,
    ReportesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}