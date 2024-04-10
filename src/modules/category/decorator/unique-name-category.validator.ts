import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { CategoryService } from '../category.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueNameCategory implements ValidatorConstraintInterface {
  constructor(private categoryService: CategoryService) {}

  async validate(value: any): Promise<boolean> {
    const isUnique = await this.categoryService.findByName(value);

    return !isUnique;
  }
}

export const UniqueNameCategoryValidator = (
  opcoesDeValidacao: ValidationOptions,
) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: opcoesDeValidacao,
      constraints: [],
      validator: UniqueNameCategory,
    });
  };
};
