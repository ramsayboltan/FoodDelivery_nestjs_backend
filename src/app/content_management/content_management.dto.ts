import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class banners {
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  banner1?: any;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  banner2?: any;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  banner3?: any;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  banner4?: any;
}
export class PagingQueryDto {
  @ApiProperty()
  page_number: number;
  @ApiProperty()
  page_size: number;
}
export class createUploadProfileDto {
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  banner1: any;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  banner2: any;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  banner3: any;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  banner4: any;
}
