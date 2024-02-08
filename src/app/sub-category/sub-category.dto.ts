import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SubCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  is_activated: boolean;

  @ApiProperty()
  @IsString()
  note: string;

  @IsOptional()
  @ApiProperty()
  mode: string;

  @ApiProperty()
  @IsString()
  admin_note: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: any;
}
export class PagingQueryDto {
  @ApiProperty()
  page_no: number;
  @ApiProperty()
  page_size: number;
}

export class updateSubCategory {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  is_activated?: boolean;

  @ApiProperty()
  @IsString()
  note?: string;

  @ApiProperty()
  @IsString()
  admin_note?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: any;
}
