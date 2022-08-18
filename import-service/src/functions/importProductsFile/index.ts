import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true,
            }
          }
        },
        authorizer: {
          name: "basicAuthorizer",
          arn: "arn:aws:lambda:eu-west-1:428646162804:function:authorization-service-dev-basicAuthorizer",
          identitySource: "method.request.header.Authorization",
          type: "token",
        },
      }
    }
  ]
};
