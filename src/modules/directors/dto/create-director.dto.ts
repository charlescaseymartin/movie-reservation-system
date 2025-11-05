import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateDirectorDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;
}
