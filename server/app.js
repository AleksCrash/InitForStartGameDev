'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const render = require('./render');

class App {
  constructor(resUrl) {
    this.resUrl = resUrl;
  }

  routing(req, res) {
    let pathName = url.parse(req.url).pathname;

    if (req.method == 'GET') {
      if (req.url.match(/.(css|js|png|jpg|gif|svg|woff2|woff)$/)) {
        render.staticLoad(pathName, req, res);
      } else if (req.url.match(/api.[a-z]/)) {
        render.renderJson(this.resUrl, pathName, res);
      } else {
        if (pathName === '/') {
          render.renderRoot(res);
        } else {
          render.render404(res);
        }
      }
    }
  }
};

module.exports = App;