import * as AWS from "aws-sdk";
import { Pool } from "pg";
import { SQSEvent, Handler } from "aws-lambda";

import { middyfy } from '@libs/lambda';

import { dbOptions } from "../../../pg-client-settings";
import { createProductQueryTemplate, createStockQueryTemplate } from "../constants";

const pool = new Pool(dbOptions);

const catalogBatchProcess: Handler<SQSEvent> = async (event) => {
  const allData = event.Records.map(({ body }) => body);
  const sns = new AWS.SNS({ region: "eu-west-1" });
  const topicArn = process.env.TOPIC_ARN;

  const client = await pool.connect();

  for (const data of allData) {
    try {
      const body = JSON.parse(data);

      await client.query("BEGIN");

      const insertIntoProductsTableValues = [body.title, body.description, Number(body.price)];

      const res = await client.query(createProductQueryTemplate, insertIntoProductsTableValues);

      const insertIntoStockTableValues = [res.rows[0].id, Number(body.count)];

      await client.query(createStockQueryTemplate, insertIntoStockTableValues);
      await client.query('COMMIT');

      await sns.publish({
        Subject: "Data from file was added",
        Message: data,
        TopicArn: topicArn,
        MessageAttributes: {
          price: {
            DataType: 'Number',
            StringValue: body.price,
          }
        }
      }).promise();
    } catch (error) {
      await client.query("ROLLBACK");

      console.log("Error while creating product from file: ", error);
    } finally {
      client.release();
    }
  }
}

export const main = middyfy(catalogBatchProcess);
