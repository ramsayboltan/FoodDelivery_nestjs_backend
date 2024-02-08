import {
  IsBoolean,
  IsNotEmpty,
  IsDateString,
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsObject,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class Location {
  @ApiProperty()
  coordinates: [number, number];

  @ApiProperty()
  address: string;
}
class OpeningClosingTime {
  @ApiProperty()
  open: Date;

  @ApiProperty()
  close: Date;

  @IsNotEmpty()
  @ApiProperty()
  status: 'open' | 'close';
}

class Address_Dto {
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
  address_line1: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address_line2: string;
}
class bank_details_dto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  account_number: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  IFC_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  bank_name: string;
}
class opening_closing_dto {
  @IsOptional()
  @ApiProperty({ type: OpeningClosingTime })
  monday: OpeningClosingTime;
  @IsOptional()
  @ApiProperty()
  tuesday: OpeningClosingTime;
  @IsOptional()
  @ApiProperty()
  wednesday: OpeningClosingTime;
  @IsOptional()
  @ApiProperty()
  thursday: OpeningClosingTime;
  @IsOptional()
  @ApiProperty()
  friday: OpeningClosingTime;
  @IsOptional()
  @ApiProperty()
  saturday: OpeningClosingTime;
  @IsOptional()
  @ApiProperty()
  sunday: OpeningClosingTime;
}

export class PagingQueryDto {
  @ApiProperty()
  page_no: number;
  @ApiProperty()
  page_size: number;
}
export class createStoreDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumberString()
  contact_number: string;

  @ApiProperty()
  @IsObject()
  opening_closing: opening_closing_dto;

  @ApiProperty()
  @IsObject()
  bank_details: bank_details_dto;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  owner: string;

  @ApiProperty()
  @IsNumber()
  delivery_radius: number;

  @ApiProperty()
  @IsString()
  website: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty()
  @IsOptional()
  mode: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  admin_note: string;

  @IsOptional()
  @ApiProperty({ type: Location, required: true })
  location: Location;

  @ApiProperty({ type: Address_Dto })
  @IsOptional()
  address: Address_Dto;
}

export class updateStoreDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  name?: string;

  @IsOptional()
  @ApiProperty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiProperty()
  @IsNumberString()
  contact_number?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  description?: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  delivery_radius?: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  website?: string;

  @IsOptional()
  @ApiProperty()
  opening_closing?: opening_closing_dto;

  @ApiProperty()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  admin_note?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_activated?: boolean;

  @IsOptional()
  @ApiProperty({ type: Location })
  loaction?: Location;

  @ApiProperty({ type: Address_Dto })
  @IsOptional()
  address?: Address_Dto;
}

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
