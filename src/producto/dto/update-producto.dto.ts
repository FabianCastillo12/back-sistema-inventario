import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsOptional()
    @IsString()
    nombre?:string;

    @IsOptional()
    @IsNumber()
    precio?:number;

    @IsOptional()
    @IsString()
    categoria?: string;

    @Min(1)
    @IsOptional()
    @IsNumber()
    cantidadStock?: number;
    
    @IsOptional()
    @IsString()
    estado?: string;

    @IsOptional()
    @IsString()
    unidad_medida?: string;

}

