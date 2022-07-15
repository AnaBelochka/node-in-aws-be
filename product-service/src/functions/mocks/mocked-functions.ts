import products from "./mocked-products.json";

export const getProductsListMockReturnFromDB = async () => {
    return Promise.resolve(products);
}

export const getProductsByIdMockReturnFromDB = async (id: string) => {
    return Promise.resolve(products.filter((product) => product.id === id));
}