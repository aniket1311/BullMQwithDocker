import { Type } from 'class-transformer';
import { AddressDto } from './address.dto.js';
import { IsDate, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  gender: string;

  @IsString()
  name: string;

  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  email: string;

  @IsString()
  age: string;

  @IsString()
  picture: string;

  @IsDate()
  createdAt: Date;
}
