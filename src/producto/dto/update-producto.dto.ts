import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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




}
