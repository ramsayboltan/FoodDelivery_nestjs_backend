import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class createModeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  display_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @ApiProperty()
  is_activated: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  note: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  admin_note: string;
}

export class PagingQueryDto {
  @ApiProperty()
  page_number: number;
  @ApiProperty()
  page_size: number;
}
export class ModeUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  display_name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  note?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  admin_note?: string;

  @IsOptional()
  @ApiProperty()
  is_activated?: boolean;
}
