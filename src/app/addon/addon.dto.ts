import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsString, IsEnum } from 'class-validator';

// ""
// class addon_dto {
// ""
export class addon_dto {
  // @ApiProperty()
  // @IsString()
  // item: string;
  @ApiProperty()
  @IsString()
  itemName: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  price: string;
}
export class CreateAddonDtoForExtend {
  @ApiProperty({ type: addon_dto })
  addon: addon_dto;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: any;

  @ApiProperty()
  @IsString()
  is_activated: boolean;
}
export class CreateAddonDto {
  @ApiProperty()
  @IsString()
  itemId: string;

  @ApiProperty({ required: false })
  @IsString()
  mode: string;

  @ApiProperty({ type: addon_dto })
  @IsOptional()
  addon: addon_dto;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: any;

  @ApiProperty()
  @IsString()
  is_activated: boolean;
}

export class PagingQueryDto {
  @ApiProperty()
  page_number: number;
  @ApiProperty()
  page_size: number;
}

export class updateAddonDto {
  @ApiProperty({ type: addon_dto })
  addon?: addon_dto;
}
enum OrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}
export class addonFilterDto {
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

// export class PagingAddonDto {
//   @ApiProperty()
//   page_no: number;
//   @ApiProperty()
//   page_size: number;
// }

// export class updateAddonDto {
//   @ApiProperty()
//   @IsString()
//   name?: string;

//   @ApiProperty()
//   @IsString()
//   description?: string;

//   @ApiProperty()
//   price?: string;
// }
