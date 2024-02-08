import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';

enum statusEnum {
  ACTIVE = 'active',
  DELIVERED = 'delivered',
  CANCEL = 'cancel',
}
// class Location {
//   latitude: number;
//   longitude: number;
// }
class Location {
  @ApiProperty()
  coordinates: [number, number];

  @ApiProperty()
  type: string;
}
export class createOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  restaurant_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_id: string;

  @IsOptional()
  @ApiProperty()
  mode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  driver_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  item_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  payment_method: string;

  @ApiProperty()
  @IsOptional()
  distance: string;

  @ApiProperty()
  @IsOptional()
  preparing_time: string;

  @ApiProperty()
  @IsOptional()
  deliveryFee: string;

  @ApiProperty()
  @IsOptional()
  deliveryAddress: string;

  @ApiProperty()
  @IsOptional()
  tax: string;

  @ApiProperty()
  @IsOptional()
  totalAmount: string;

  @ApiProperty()
  @IsOptional()
  note: string;

  @ApiProperty()
  @IsOptional()
  admin_note: string;

  @ApiProperty()
  @IsOptional()
  location_to: Location;

  @ApiProperty()
  @IsOptional()
  location_from: Location;

  @IsString()
  @ApiProperty()
  perKilometerRate: string;

  @IsOptional()
  @ApiProperty()
  fare: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  card_number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  expiry_Date: string;

  @IsDateString()
  @ApiProperty()
  order_time: Date;

  @IsEnum(statusEnum)
  @IsOptional()
  @ApiProperty()
  status: string;

  @IsOptional()
  @ApiProperty()
  is_activated: boolean;
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

export class OrderUpdateDto {
  // @IsOptional()
  @IsString()
  @ApiProperty()
  restaurant_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  customer_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  mode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  driver_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  item_id?: string;

  @IsString()
  @ApiProperty()
  payment_method?: string;

  @IsDateString()
  @ApiProperty()
  order_time?: Date;

  @ApiProperty()
  preparing_time: string;

  @IsEnum(statusEnum)
  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsOptional()
  distance?: string;

  @ApiProperty()
  @IsOptional()
  deliveryFee: string;

  @ApiProperty()
  @IsOptional()
  deliveryAddress: string;

  @ApiProperty()
  @IsOptional()
  tax?: string;

  @ApiProperty()
  @IsOptional()
  totalAmount?: string;

  @ApiProperty()
  @IsOptional()
  note?: string;

  @ApiProperty()
  @IsOptional()
  admin_note?: string;

  @ApiProperty()
  @IsOptional()
  location_to?: Location;

  @ApiProperty()
  @IsOptional()
  location_from?: Location;

  @IsString()
  @IsOptional()
  @ApiProperty()
  perKilometerRate?: string;

  @IsOptional()
  @ApiProperty()
  fare?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  card_number?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  expiry_Date?: string;

  @IsOptional()
  @ApiProperty()
  is_activated?: boolean;
}
enum OrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}
export class orderFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  // @IsBooleanString()
  is_active: string;

  @IsOptional()
  @ApiProperty({ required: false })
  // @IsBooleanString()
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
// export class orderpdfDto {
//   @IsOptional()
//   @ApiProperty({ required: false })
//   order_time: Date;

//   @IsOptional()
//   @ApiProperty({ required: false })
//   location: Location;
// }
