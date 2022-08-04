import * as AWS from "aws-sdk";
import csvParser from "csv-parser";
import { S3Event, Handler } from "aws-lambda";

import { middyfy } from '@libs/lambda';

import {BUCKET, PREFIXES} from "../consts";

const importProductsFile: Handler<S3Event> = async (event) => {
  const s3 = new AWS.S3({ region: "eu-west-1" });
  console.log("event.records", event.Records[0]);
  const key = event.Records[0].s3.object.key;
  const params = {
    Bucket: BUCKET,
    Key: key,
  };
  const s3Stream = await s3.getObject(params).createReadStream();

  let result = [];

  for await (const chunk of s3Stream.pipe(csvParser())) {
    result.push(chunk);
  }

  if (result.length) {
    result.forEach((data) => {
      console.log("Row from file", data);
    });

    await s3.copyObject({
      Bucket: BUCKET,
      CopySource: BUCKET + "/" + key,
      Key: key.replace(PREFIXES.uploaded, PREFIXES.parsed),
    }).promise();

    await s3.deleteObject({
      Bucket: BUCKET,
      Key: key,
    });

    return {
      statusCode: 200,
    }
  }

  return {
    statusCode: 500,
  };
};

export const main = middyfy(importProductsFile);