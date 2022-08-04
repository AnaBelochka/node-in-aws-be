import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

import { formatJSONResponse } from '@libs/api-gateway';

import { main as importProductsFile } from "../handler";

describe("importProductsFile functions",  () => {
  it('should return status code 200 if function was successfully performed', async () => {
    const url = "url";
    const spy = jest.fn().mockReturnValue(url);
    const event = {
      queryStringParameters: {
        name: "name",
      }
    };

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("S3", "getSignedUrl", spy);

    const result = await importProductsFile(event, null);

    const expectedResult = formatJSONResponse(
      {
        signedUrl: url,
      }, 200
    )

    expect(result).toEqual(expectedResult);

    AWSMock.restore('S3');
  });

  it('should return status code 500 if function was unsuccessfully performed', async () => {
    const url = null;
    const spy = jest.fn().mockReturnValue(url);
    const event = {
      queryStringParameters: {
        name: "name",
      }
    };

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("S3", "getSignedUrl", spy);

    const result = await importProductsFile(event, null);

    const expectedResult = formatJSONResponse(
      {
        message: "Internal server error",
      }, 500
    )

    expect(result).toEqual(expectedResult);

    AWSMock.restore('S3');
  });
})
