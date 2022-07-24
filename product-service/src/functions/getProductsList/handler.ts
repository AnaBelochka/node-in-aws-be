import { Client } from "pg";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { dbOptions } from "../../../pg-client-settings";

import { getAllProductsQueryTemplate } from "../constants";

const getProductsList: ValidatedEventAPIGatewayProxyEvent<{}> = async (event) => {
  console.log("Lambda function getProductsList executed with event: ", event);

  const client = new Client(dbOptions);

  await client.connect();

  try {
    const { rows: products } = await client.query(getAllProductsQueryTemplate);

    if (products && products.length) {
      return formatJSONResponse({
        products,
      }, 200);
    } else {
      return formatJSONResponse({
        message: "Products not found",
      },404);
    }
  } catch (error) {
    return formatJSONResponse({
      message: "Internal server error",
      error,
    },500);
  } finally {
    client.end();
  }
};

export const main = middyfy(getProductsList);
