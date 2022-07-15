import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { getProductsByIdMockReturnFromDB } from "../mocks/mocked-functions";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<{}> = async (event) => {
  try {
    const productId = event.pathParameters?.productId;
    const products = await getProductsByIdMockReturnFromDB(productId);

    return formatJSONResponse({
      products,
    }, 200);
  } catch (e) {
    return formatJSONResponse({
      message: "Products not found",
    }, 404);
  }
};

export const main = middyfy(getProductsList);