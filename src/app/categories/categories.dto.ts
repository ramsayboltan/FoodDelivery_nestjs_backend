import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsString, IsEnum } from 'class-validator';

export class createCategoryDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  mode: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  avatar: any;

  @ApiProperty()
  is_activated: boolean;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsString()
  admin_note: string;
}

export class PagingQueryDto {
  @ApiProperty()
  page_no: number;
  @ApiProperty()
  page_size: number;
}

export class updateCategoryDto {
  @IsString()
  @ApiProperty()
  fullname?: string;

  @IsString()
  @ApiProperty()
  description?: string;

  @IsString()
  @ApiProperty()
  note?: string;

  @IsString()
  @ApiProperty()
  admin_note?: string;

  @ApiProperty()
  is_activated?: boolean;
}
export class categoryUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;
}
enum OrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}
export class categoryDtoFilter {
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
