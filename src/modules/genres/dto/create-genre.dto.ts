import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;
}
