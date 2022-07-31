import * as AWS from "aws-sdk";

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { BUCKET, PREFIXES } from "../consts";

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<{}> = async (event) => {
  const fileName = event.queryStringParameters.name;
  const catalogPath = `${PREFIXES.uploaded}/${fileName}`;
  const s3 = new AWS.S3({ region: "eu-west-1" });
  const params = {
    Bucket: BUCKET,
    Key: catalogPath,
    Expires: 60,
    ContentType: "text/csv",
  };

  const url = s3.getSignedUrl("putObject", params);

  if (url) {
    return formatJSONResponse({
      signedUrl: url,
    }, 200);
  }

  return formatJSONResponse({
    message: "Internal server error",
  }, 500);
};

export const main = middyfy(importProductsFile);
