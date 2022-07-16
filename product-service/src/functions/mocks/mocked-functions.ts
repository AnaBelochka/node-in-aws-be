import { products } from "./mocked-products.ts";

export const getProductsListMockReturnFromDB = async () => {
    return await Promise.resolve(products);
};

export const getProductsByIdMockReturnFromDB = async (id: string) => {
    return await Promise.resolve(products.filter((product) => product.id === id));
};