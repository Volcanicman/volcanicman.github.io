'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '127.0.0.1';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const indexNames = ['index.html', 'index.xml'];

function safePath(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch (err) {
    return null;
  }
  if (decoded.includes('\0')) {
    return null;
  }
  const resolved = path.resolve(root, '.' + path.posix.normalize('/' + decoded));
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    return null;
  }
  return resolved;
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function serveFile(req, res, filePath) {
  const stat = fs.statSync(filePath);
  const etag = 'W/"' + stat.size + '-' + Math.round(stat.mtimeMs) + '"';
  const headers = {
    'Content-Type': types[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    ETag: etag,
    'Last-Modified': stat.mtime.toUTCString(),
    'X-Content-Type-Options': 'nosniff',
  };
  if (req.headers['if-none-match'] === etag) {
    send(res, 304, headers);
    return;
  }
  headers['Content-Length'] = stat.size;
  res.writeHead(200, headers);
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  const stream = fs.createReadStream(filePath);
  stream.on('error', function () {
    res.destroy();
  });
  stream.pipe(res);
}

const server = http.createServer(function (req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' }, 'Method Not Allowed\n');
    return;
  }

  let urlPath = '/';
  try {
    urlPath = new URL(req.url, 'http://127.0.0.1').pathname;
  } catch (err) {
    send(res, 400, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Bad Request\n');
    return;
  }

  const filePath = safePath(urlPath);
  if (!filePath) {
    send(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden\n');
    return;
  }

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch (err) {
    send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' }, 'Not Found\n');
    return;
  }

  if (stat.isDirectory()) {
    if (!urlPath.endsWith('/')) {
      send(res, 308, { Location: urlPath + '/' }, '');
      return;
    }
    const index = indexNames
      .map(function (name) { return path.join(filePath, name); })
      .find(function (candidate) { return fs.existsSync(candidate) && fs.statSync(candidate).isFile(); });
    if (!index) {
      send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' }, 'Not Found\n');
      return;
    }
    serveFile(req, res, index);
    return;
  }

  serveFile(req, res, filePath);
});

server.listen(port, host, function () {
  console.log('Serving ' + root + ' at http://' + host + ':' + port + '/');
});
