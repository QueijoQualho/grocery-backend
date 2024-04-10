import { CategoryResponseDto } from 'src/category/dto/response-category.dto';

export class ProductResponseDto {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number,
    readonly availableQuantity: number,
    readonly productDetail: string,
    readonly brand: string,
    readonly images: ImageProductResponseDto[],
    readonly category: CategoryResponseDto,
  ) {}
}

export class ImageProductResponseDto {
  id: number;
  url: string;
}
