import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import { ICategory } from "../../domain/entities";



export class CreateEvaluationDto {
  @IsNotEmpty()
  @IsMongoId()
  employeeId: string;

  @IsNotEmpty()
  @IsMongoId()
  evaluatorId: string;

  @IsOptional()
  @IsString()
  comments: string;

  @IsArray()
  @ArrayNotEmpty() // Asegura que el array no esté vacío
  @ValidateNested({ each: true }) // Valida cada elemento del array
  categories: ICategory[];

}