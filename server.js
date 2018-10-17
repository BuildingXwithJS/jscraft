const express = require('express');
const next = require('next');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const main = async () => {
  await app.prepare();

  const server = express();

  const workers = {
    'editor.worker.js': path.join(__dirname, '.next/editor.worker.js'),
    'json.worker.js': path.join(__dirname, '.next/json.worker.js'),
    'css.worker.js': path.join(__dirname, '.next/css.worker.js'),
    'html.worker.js': path.join(__dirname, '.next/html.worker.js'),
    'ts.worker.js': path.join(__dirname, '.next/typescript.worker.js'),
  };

  Object.keys(workers).forEach(key => {
    server.get(`/${key}`, (req, res) => {
      res.set({
        'Content-Type': 'application/javascript',
        'Content-Security-Policy': `worker-src 'self'`,
      });
      res.sendFile(workers[key]);
    });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

main();
