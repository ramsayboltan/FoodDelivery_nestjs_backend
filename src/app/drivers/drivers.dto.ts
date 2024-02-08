import { PartialType, ApiProperty } from '@nestjs/swagger';
import { createUserDto, UserUpdateDto } from '../users/users.dto';
import { IsOptional, IsString, IsBooleanString, IsDateString, IsEnum, IsBoolean } from 'class-validator';
import { CreateAddressDtoForExtend } from '@app/app/address/address.dto';
export class driverAddressUpdateDto {
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

class driver_criteria {
  @ApiProperty()
  @IsString()
  @IsOptional()
  by_earning: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  by_rating: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  by_riding: string;
}
class Bank_dto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  account_number: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  IFC_code: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bank_name: string;
}

class Static_dto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  weekly_order: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  weekly_rating: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  weekly_earning: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  active_hours: string;
}
class Vehicle_detail {
  @ApiProperty()
  @IsOptional()
  vehicle_number: string;
  @ApiProperty()
  @IsOptional()
  vehicle_issue_date: string;
  @ApiProperty()
  @IsOptional()
  vehicle_exp_date: string;
  @ApiProperty()
  @IsOptional()
  dl_number: string;
  @ApiProperty()
  @IsOptional()
  dl_issue_date: string;
  @ApiProperty()
  @IsOptional()
  dl_exp_date: string;
}

export class PagingQueryDto {
  @ApiProperty()
  page_number: number;
  @ApiProperty()
  page_size: number;
}

export class Document_dto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  liscense_image: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  govt_id_image: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  verified_picture: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  rc_image: any;
}

export class createDriverDto extends PartialType(createUserDto) {
  @ApiProperty()
  @IsOptional()
  mode: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  admin_note: string;

  @IsOptional()
  @ApiProperty({ type: Bank_dto })
  bank_details: Bank_dto;

  @ApiProperty({ type: Static_dto })
  @IsOptional()
  statics: Static_dto;

  @ApiProperty({ type: driver_criteria })
  @IsOptional()
  driver_criteria: driver_criteria;

  @ApiProperty({ type: Vehicle_detail })
  @IsOptional()
  vehicle_details: Vehicle_detail;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  liscense_image: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  govt_id_image: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  verified_picture: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  rc_image: any;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: [CreateAddressDtoForExtend] })
  address: CreateAddressDtoForExtend[];
}

export class updateDriverDto extends PartialType(UserUpdateDto) {
  @ApiProperty()
  @IsOptional()
  statics?: Static_dto;

  @ApiProperty()
  @IsOptional()
  vehicle_details?: Vehicle_detail;

  @ApiProperty()
  @IsOptional()
  driver_criteria?: driver_criteria;

  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // liscense_image: any;

  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // adharcard_image: any;

  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // verified_picture: any;

  // @ApiProperty({ type: 'string', format: 'binary', required: false })
  // rc_image: any;

  @IsOptional()
  @ApiProperty({ type: Bank_dto })
  bank_details?: Bank_dto;

  @ApiProperty()
  note?: string;

  @ApiProperty()
  admin_note?: string;

  @ApiProperty()
  is_activated?: boolean;

  @IsOptional()
  @ApiProperty({ type: [driverAddressUpdateDto] })
  address: driverAddressUpdateDto[];
}

export class DriverFileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  liscense_image: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  govt_id_image: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  verified_picture: any;

  @ApiProperty({ type: 'string', format: 'binary' })
  rc_image: any;
}

enum OrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export class driverFilterDto {
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
  by_earning: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @IsEnum(OrderEnum)
  by_rating: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @IsEnum(OrderEnum)
  by_riding: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsEnum(OrderEnum)
  sort_order: string;

  // @IsOptional()
  // @ApiProperty({ required: false })
  // @IsDateString()
  // date_from: string;

  // @IsOptional()
  // @ApiProperty({ required: false })
  // @IsDateString()
  // date_to: string;
}
