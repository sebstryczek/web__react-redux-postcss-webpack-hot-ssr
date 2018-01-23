import fs from 'fs';
import path from 'path';
import express from 'express';
import webpack from 'webpack';

import firebase from '../firebase/wrapper';
firebase.init();

import getHtml from './ssr/getHtml';

const app = express();
const port = process.env.PORT || 3000;

const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

(async () => {
  const manifestPath = path.join(__dirname, './manifest.json');
  const manifestBuffer = await readFile(manifestPath)
  const manifest = JSON.parse(manifestBuffer.toString());
  
  app.use('/', express.static(__dirname));
  
  app.get('*', async (req, res) => {
    const html = await getHtml(req, manifest);
    res.send(`<!doctype html>${html}`);
  });
  
  app.listen(port, () => console.log(`Listening on port ${port}`));

})();
