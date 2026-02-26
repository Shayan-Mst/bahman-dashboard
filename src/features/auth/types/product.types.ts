
export interface Product {
      id: number,
      title: string,
      description: string,
      category: string,
      price: number,
      discountPercentage: number,
      rating: number,
      stock: number,
      tags: string[],
      images : string[]
}


export interface getAllProductResponse {
  products: Product[]; // This is what you actually map over
  total: number;
  skip: number;
  limit: number;
}

export interface addProductInput{
 
      title: string,
      description: string,
      category: string,
      price: number,
      discountPercentage: number,
      stock: number,
      tags: string[],
      images : FileList[]
}
export interface editProductInput{
      id: number,
      title: string,
      description: string,
      category: string,
      price: number,
      discountPercentage: number,
      stock: number,
      tags: string[],
      images : FileList[]
}