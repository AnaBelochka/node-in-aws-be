const express = require('express');
require('dotenv').config();
const axios = require('axios').default;

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());

const key = '/products';
const cache = new Map();

const cashRequest = async (axiosConfig) => {
  if (cache.has(key)) {
    return cache.get(key);
  } else {
    await axios(axiosConfig)
      .then((response) => {
        cache.set(key, response.data);
      });

    const timer = setTimeout(() => {
      cache.delete(key);
      clearTimeout(timer);
    }, 1000 * 60 * 2);

    return cache.get(key);
  }
}

app.all('/*', async (req, res) => {
  console.log('originalUrl', req.originalUrl);
  console.log('method', req.method);
  console.log('body', req.body);

  const recipient = req.originalUrl.split('/')[1];

  console.log('recipient', recipient);

  const recipientUrl = process.env[recipient];

  console.log('recipientUrl', recipientUrl);

  if (recipientUrl) {
    const axiosConfig = {
      method: req.method,
      url: `${recipientUrl}${req.originalUrl === '/cart' ? '/api/profile/cart' : req.originalUrl}`,
      ...(Object.keys(req.body) || {}).length > 0 && ({data: req.body}),
    };

    console.log('axiosConfig', axiosConfig);

    if (req.method === 'GET' && req.originalUrl === '/products') {
      const data = await cashRequest(axiosConfig);

      res.json(data);
    } else {
      axios(axiosConfig)
        .then((response) => {
          console.log('Response from recipient: ', response.data);
          res.json(response.data);
        })
        .catch((error) => {
          console.log('some error: ', JSON.stringify(error));

          if (error.response) {
            const {
              status,
              data
            } = error.response;

            res.status(status).json(data);
          }
          else {
            res.status(500).json({error: error.message});
          }
        });
    }
   } else {
     res.status(500).json({error: 'Cannot process request'});
   }
});

app.listen(PORT, () => {
  console.log(`Example app listening att http://localhost:${PORT}`);
});
