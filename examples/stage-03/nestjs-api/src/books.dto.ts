import {Transform} from 'class-transformer';
import {IsString,IsNotEmpty,MaxLength,IsOptional} from 'class-validator';
const trim=({value}:{value:unknown})=>typeof value==='string'?value.trim():value;
export class CreateBookDto {
 @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(200) title!:string;
 @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(200) author!:string;
}
export class UpdateBookDto {
 @IsOptional() @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(200) title?:string;
 @IsOptional() @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(200) author?:string;
}
