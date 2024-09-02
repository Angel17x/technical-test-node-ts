import { ArrayNotEmpty, IsArray, IsOptional, IsString, ValidateNested} from "class-validator";
import { ICategory } from "../../domain/entities";



export class UpdateEvaluationDto {
  
  @IsString()
  @IsOptional()
  comments: string;

  @IsArray()
  @ArrayNotEmpty() // Asegura que el array no esté vacío
  @ValidateNested({ each: true }) // Valida cada elemento del array
  categories: ICategory[];

}