import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { getProductsListMockReturnFromDB } from "../mocks/mocked-functions";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<{}> = async () => {
  try {
    const products = await getProductsListMockReturnFromDB();

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
