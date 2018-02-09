'use strict';

const fs = require('fs');
const path = require('path');

class Render {
  constructor() {
    this.ext;
    this.contentType;
    this.readStream;
    this.directory = 'web';
    this.fileName;
  }

  staticLoad(pathName, req, res) {
    this.ext = path.extname(req.url);
    this.fileName = req.url.slice(1);
    switch(this.ext) {
      case '.js':
        this.contentType = 'text/javascript';
        break;
      case '.css':
        this.contentType = 'text/css';
        break;
      case '.png':
        this.contentType = 'image/png';
        break;
      case '.jpg':
        this.contentType = 'image/jpg';
        break;
      case '.gif':
        this.contentType = 'image/gif';
        break;
      case '.svg':
        this.contentType = 'image/svg+xml';
        break;
      case '.woff2':
        this.contentType = 'application/font-woff2';
        break;
      case '.woff':
        this.contentType = 'application/font-woff';
        break;
    }

    this.readStream = fs.createReadStream(path.resolve(this.directory, this.fileName));
    this.readStream.pipe(res);
    res.statusCode = 200;
    res.setHeader('Content-Type', this.contentType);

    this.readStream.on('error', (err) => {
      this.errorData(err, res);
    });
  }

  renderRoot(res) {
    res.setHeader('Content-Type', 'text/html');

    const readStream = fs.createReadStream(path.resolve('web', 'index.html'));
    res.statusCode = 200;
    readStream.pipe(res);
  
    readStream.on('error', (err) => {
      this.render404(res);
    });
  }

  renderJson(resUrl, pathName, res) {
    // todo : render true json
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', resUrl);
    
    res.end("{\"name\":\"Aleks\"}");
  }

  errorData(err, res) {
    if (err.code === 'ENOENT') {
      res.writeHeader(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
    } else {
      res.writeHeader(500, {'Content-Type': 'text/plain'});
      res.end(err.message);
    }
  }

  render404(res) {
    const readStream = fs.createReadStream(path.resolve('web', '404.html'));
    readStream.pipe(res);
    readStream.on('error', (err) => {
      this.errorData(err, res);
    });
  }
}

module.exports = new Render;