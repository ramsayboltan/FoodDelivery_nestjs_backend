import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsDate,
  IsDateString,
  IsStrongPassword,
  IsObject,
} from 'class-validator';

enum genderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

enum roleEnum {
  ADMIN = 'admin',
  OWNER = 'owner',
  CUSTOMER = 'customer',
  DRIVER = 'driver',
}

class Location {
  @ApiProperty()
  coordinates: [number, number];

  @ApiProperty()
  address: string;
}

export class createUserDto {
  @IsOptional()
  @ApiProperty()
  is_activated?: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @IsDateString()
  @ApiProperty()
  dob: Date;

  @IsEnum(genderEnum)
  @ApiProperty()
  gender: string;

  @IsOptional()
  @ApiProperty()
  mode: string;

  @IsOptional()
  @ApiProperty({ type: Location, required: true })
  location: Location;

  @IsNumberString()
  @ApiProperty()
  contact_number: string;

  @IsNumberString()
  @ApiProperty()
  alter_contact_number?: string;

  @IsEnum(roleEnum)
  @IsString()
  @ApiProperty()
  role: string;
}

export class PagingQueryDto {
  @ApiProperty()
  page_no: number;
  @ApiProperty()
  page_size: number;
}

export class HeaderToken {
  @ApiProperty()
  ['x-access-token']: string;
}

export class LoginModel {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UserUpdateDto {
  // @IsOptional()
  // @IsString()
  // @ApiProperty()
  // firstname?: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty()
  // lastname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  fullname?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty()
  contact_number?: string;

  @IsOptional()
  @ApiProperty()
  @IsNumberString()
  altr_contact_number?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dob?: Date;

  @IsOptional()
  @IsEnum(genderEnum)
  @ApiProperty()
  gender?: string;

  @IsOptional()
  @ApiProperty()
  is_activated?: boolean;

  @IsOptional()
  @ApiProperty({
    type: Location,
  })
  location: Location;
}

export class fileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
