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
  const manifestPath = path.join(__dirname, './manifest.json');
  const manifestBuffer = await readFile(manifestPath)
  const manifest = JSON.parse(manifestBuffer.toString());
  
  const assetPath = x=> manifest[x] || x;
  const cssFiles =  ['client.css'].map(assetPath);
  const jsFiles =  ['vendor.js', 'client.js'].map(assetPath);
  const assets = {cssFiles, jsFiles}
  
  app.use('/', express.static(__dirname));
  
  app.get('*', async (req, res) => {
    const html = await getHtml(req, assets);
    res.send(`<!doctype html>${html}`);
  });
  
  app.listen(port, () => console.log(`Listening on port ${port}`));

})();
