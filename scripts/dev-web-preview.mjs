import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';

// `--port N` (passed by playwright.config.ts as `npm run web -- --port N`) overrides WEB_PREVIEW_PORT.
// Without this the flag was ignored and the self-started test server listened on 8084 while tests waited on N.
const portFlag = process.argv.indexOf('--port');
const cliPort = portFlag >= 0 ? process.argv[portFlag + 1] : undefined;
const publicPort = Number(cliPort ?? process.env.WEB_PREVIEW_PORT ?? '8084');
const expoPort = Number(process.env.EXPO_WEB_PORT ?? String(publicPort + 1));

function proxyExpo(request, response) {
  const upstreamRequest = http.request({
    hostname: '127.0.0.1', port: expoPort, path: request.url, method: request.method,
    headers: { ...request.headers, host: `127.0.0.1:${expoPort}` },
  }, (upstreamResponse) => {
    response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
    upstreamResponse.pipe(response);
  });
  upstreamRequest.on('error', () => {
    response.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'Preview is still starting.' }));
  });
  request.pipe(upstreamRequest);
}

const server = http.createServer(proxyExpo);
const expoCli = path.join(process.cwd(), 'node_modules', 'expo', 'bin', 'cli');
const expo = spawn(process.execPath, [expoCli, 'start', '--web', '--port', String(expoPort), '--localhost'], {
  cwd: process.cwd(), env: { ...process.env, EXPO_NO_DEPENDENCY_VALIDATION: '1' }, stdio: 'inherit',
});
const stop = () => { server.close(); expo.kill(); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
expo.on('exit', (code) => { if (code && code !== 130) process.exitCode = code; server.close(); });
server.listen(publicPort, '127.0.0.1', () => console.log(`Web preview gateway listening on http://127.0.0.1:${publicPort}`));
