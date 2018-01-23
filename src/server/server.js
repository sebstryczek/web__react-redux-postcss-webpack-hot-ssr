import express from 'express';
import webpack from 'webpack';

import getHtml from './ssr/getHtml';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(__dirname));

app.get('*', async (req, res) => {
  const html = await getHtml(req);
  res.send(`<!doctype html>${html}`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
