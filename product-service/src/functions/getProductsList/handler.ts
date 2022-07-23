import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { getProductsListMockReturnFromDB } from "../mocks/mocked-functions";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<{}> = async () => {
  const products = await getProductsListMockReturnFromDB();

  if (products && products.length) {
    return formatJSONResponse({
      products,
    }, 200);
  } else {
    return formatJSONResponse({
      message: "Products not found",
    },404);
  }
};

export const main = middyfy(getProductsList);
