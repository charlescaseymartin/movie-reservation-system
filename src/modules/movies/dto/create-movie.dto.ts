import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsBoolean,
  IsInt,
  IsDecimal,
  IsDate,
  IsArray,
  IsUUID,
  IsOptional,
  Min,
  MinLength,
  Max,
} from 'class-validator';

export class CreateMovieDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Description must have atleast 2 characters.' })
  description?: string;

  @IsOptional()
  @IsUrl()
  poster?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Price must have atleast 2 characters.' })
  price?: string;

  @IsOptional()
  @IsDate()
  releaseDate?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Certification must have atleast 2 characters.' })
  certification?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  watchTimeSeconds?: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  genres?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  directors?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  writers?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  topCasts?: string[];

  @IsBoolean()
  @IsNotEmpty()
  isPublished: boolean;
}
