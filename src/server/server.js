import fs from 'fs';
import path from 'path';
import express from 'express';
import webpack from 'webpack';

import getHtml from './ssr/getHtml';

import firebase from '../firebase/wrapper';
firebase.init();

const app = express();
const port = process.env.PORT || 3000;

const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

(async () => {
  const indexPath = path.join(__dirname, './_index.html');
  const indexBuffer = await readFile(indexPath)
  const index = indexBuffer.toString();

  app.use('/', express.static(__dirname));
  
  app.get('*', async (req, res) => {
    const html = await getHtml(req, index);
    res.send(`<!doctype html>${html}`);
  });
  
  app.listen(port, () => console.log(`Listening on port ${port}`));

})();
