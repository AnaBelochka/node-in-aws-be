import { Pool } from "pg";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { checkTypes } from "./checkTypes";

import { dbOptions } from "../../../pg-client-settings";
import { createProductQueryTemplate, createStockQueryTemplate } from "../constants";
import schema from './schema';

const pool = new Pool(dbOptions);

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log("Lambda function createProduct executed with event: ", event);

  const client = await pool.connect();

  try {
    const { body } = event;
    const typeError = checkTypes(body);

    if (typeError) {
      return formatJSONResponse({
        message: typeError,
      }, 400);
    }

    await client.query("BEGIN");

    const insertIntoProductsTableValues = [body.title, body.description, body.price, body.imageUrl];
    const res = await client.query(createProductQueryTemplate, insertIntoProductsTableValues);
    const insertIntoStockTableValues = [res.rows[0].id, body.count];

    await client.query(createStockQueryTemplate, insertIntoStockTableValues);
    await client.query('COMMIT');

    return formatJSONResponse({
      message: "Product successfully created",
    },200);
  } catch (error) {
    await client.query("ROLLBACK");

    return formatJSONResponse({
      message: "Internal server error",
      error,
    },500);
  } finally {
    client.release();
  }
};

export const main = middyfy(createProduct);
