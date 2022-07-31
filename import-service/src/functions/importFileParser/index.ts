import { handlerPath } from '@libs/handler-resolver';

import { BUCKET, PREFIXES } from "../consts";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET,
        event: "s3:ObjectCreated:*",
        rules: [
          {
            prefix: `${PREFIXES.uploaded}/`,
          }
        ],
        existing: true,
      }
    }
  ]
};