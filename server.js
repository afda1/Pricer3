#!/usr/bin/env node
/**
 * Pricer3 – Logistics Dashboard
 * Zero-dependency static file server using Node.js built-in modules.
 * No `npm install` required.
 *
 * Usage:
 *   node server.js              # serves on http://localhost:3000
 *   PORT=8080 node server.js    # custom port
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Resolve the requested path; default to logistics-dashboard.html
  let pathname;
  try {
    pathname = new URL(req.url, 'http://localhost').pathname;
  } catch (_) {
    pathname = '/';
  }
  if (pathname === '/' || pathname === '') {
    pathname = '/logistics-dashboard.html';
  }

  const filePath = path.join(ROOT, pathname);

  // Security: prevent directory traversal outside ROOT
  // Use path.resolve to normalize and compare, ensuring filePath is inside ROOT
  const resolvedRoot = path.resolve(ROOT);
  const resolvedFile = path.resolve(filePath);
  if (!resolvedFile.startsWith(resolvedRoot + path.sep) && resolvedFile !== resolvedRoot) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(resolvedFile, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 Not Found: ${pathname}`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    const ext      = path.extname(filePath).toLowerCase();
    const mimeType = MIME[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  🚚  Logistics Dashboard running at http://localhost:${PORT}\n`);
});
