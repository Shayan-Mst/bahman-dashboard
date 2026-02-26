import { addProductInput, editProductInput, getAllProductResponse } from "../types/product.types";

export const getAllProduct = async (): Promise<getAllProductResponse> => {
  const response = await fetch("https://dummyjson.com/products?limit=10&skip=50&select=title,category,price,discountPercentage,rating,images,stock,rating,tags", {
    method: "GET",
    credentials:'omit'
  });

  if (!response.ok) {
    const errorData = await response.json();
    // DummyJSON returns error messages in a 'message' field
    throw new Error(errorData.message || "Products not found!");
  }

  return response.json();
};

export const addProduct = async (productData: addProductInput) => {
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add product!");
  }
  return response.json();
};
export const editProduct = async (productData: editProductInput) => {
 
  const response = await fetch(`https://dummyjson.com/products/${productData.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update product!");
  }
  return response.json();
}