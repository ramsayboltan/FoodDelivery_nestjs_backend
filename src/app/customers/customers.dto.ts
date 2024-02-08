import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDtoForExtend } from '@app/app/address/address.dto';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsString,
  IsNotEmpty,
  IsBooleanString,
  IsNumberString,
  IsDateString,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export class CustomerAddressUpdateDto {
  @IsOptional()
  @ApiProperty()
  type: string;

  @IsOptional()
  @ApiProperty()
  is_activated: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  state: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  city: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  zip_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address_line1?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address_line2?: string;
}

enum genderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

class Location {
  @ApiProperty()
  type?: string | 'Point';
  @ApiProperty()
  coordinates?: [number, number];
}

export class createCustomerDto {
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

  @ApiProperty()
  location?: Location;

  @ApiProperty()
  @IsOptional()
  mode: string;

  @IsNumberString()
  @ApiProperty()
  contact_number: string;

  @IsNumberString()
  @ApiProperty()
  alter_contact_number?: string;

  @IsOptional()
  @ApiProperty()
  readonly note: string;

  @IsOptional()
  @ApiProperty()
  readonly admin_note: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [CreateAddressDtoForExtend] })
  readonly address: CreateAddressDtoForExtend[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  is_activated: boolean;
}

export class updateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  dob: Date;

  @IsOptional()
  @IsEnum(genderEnum)
  @ApiProperty()
  gender: string;

  @IsOptional()
  @ApiProperty()
  location?: Location;

  @IsOptional()
  @IsNumberString()
  @ApiProperty()
  contact_number: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty()
  alter_contact_number?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  is_activated?: boolean;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @ApiProperty()
  readonly note: string;

  @IsOptional()
  @ApiProperty()
  readonly admin_note: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: [CustomerAddressUpdateDto] })
  address: CustomerAddressUpdateDto[];
}

export class deleteManyDto {
  @ApiProperty({ required: true })
  @IsArray()
  customer_ids: string[];
}
export class PagingQueryDto {
  @ApiProperty()
  page_number: number;
  @ApiProperty()
  page_size: number;
}

enum OrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export class customerFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBooleanString()
  is_active: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsBooleanString()
  is_inactive: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsEnum(OrderEnum)
  sort_order: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDateString()
  date_from: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDateString()
  date_to: string;
}
