const https = require('https');
const hostname = 'vimarsh-portfolio.vercel.app';

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  try {
    const health = await request({ hostname, path: '/api/health', method: 'GET' });
    console.log('HEALTH', health.status);
    console.log(health.body.slice(0, 500));
    console.log('---');

    const options = await request({ hostname, path: '/api/contact', method: 'OPTIONS', headers: { 'Content-Type': 'application/json' } });
    console.log('OPTIONS', options.status);
    console.log(options.headers);
    console.log('---');

    const payload = JSON.stringify({ name: 'Test', email: 'test@example.com', subject: 'Test', message: 'Hello' });
    const post = await request({ hostname, path: '/api/contact', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } }, payload);
    console.log('POST', post.status);
    console.log(post.body.slice(0, 500));
  } catch (err) {
    console.error('ERROR', err.message);
  }
})();