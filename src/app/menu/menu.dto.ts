// import { Store } from '@app/models/store.schema';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBooleanString, IsDateString, IsEnum, IsBoolean } from 'class-validator';
// import { createStoreDto } from '../store/store.dto';
export class createMenuDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  store: string;
  @ApiProperty()
  @IsOptional()
  mode: string;

  @ApiProperty()
  @IsString()
  description: string;

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

export class updateMenuDto {
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
}
// name;
// description;
// itemId;
// is_activated;
// metadata: {
//   platform, os, browser, ip;
// }
// notes;
// admin_notes;
// createdAt;
// updatedAt;
