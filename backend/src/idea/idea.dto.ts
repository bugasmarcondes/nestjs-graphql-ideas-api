import { IsString } from 'class-validator';

export class ideaDTO {
  @IsString()
  idea: string;

  @IsString()
  description: string;
}
