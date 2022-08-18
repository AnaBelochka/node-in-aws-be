import { APIGatewayAuthorizerEvent, Handler } from "aws-lambda";
import { middyfy } from '@libs/lambda';

import { generatePolicy } from '../../utils/generatePolicy';

const basicAuthorizer: Handler<APIGatewayAuthorizerEvent> = async (event) => {
  console.log("Event: ", JSON.stringify(event));

  if (event.type !== "TOKEN") {
    return "Unauthorized";
  }

  try {
    const authorizationToken = event.authorizationToken;

    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const username = plainCreds[0];
    const password = plainCreds[1];

    console.log(`username: ${username} and password: ${password}`);

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    return policy;
  } catch (error) {
    return `Unauthorized`;
  }
};

export const main = middyfy(basicAuthorizer);
