import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsString, IsEnum, IsOptional } from 'class-validator';

export class createTagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tagname: string;

  @IsOptional()
  @ApiProperty()
  mode: string;

  @IsOptional()
  @ApiProperty()
  is_activated: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tittle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  display_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
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

export class TagUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  tagname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tittle: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  display_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;
}
enum OrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}
export class tagFilterDto {
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
