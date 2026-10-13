const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.wasm':'application/wasm','.data':'application/octet-stream','.json':'application/json','.bundle':'application/octet-stream'};
http.createServer((req,res)=>{
  const url=new URL(req.url,'http://127.0.0.1');
  if(url.pathname==='/__log' && req.method==='POST') { let body=''; req.on('data',x=>{if(body.length<16000)body+=x}); req.on('end',()=>{console.log('BROWSER',body);res.end('ok')});return; }
  let name;try{name=decodeURIComponent(url.pathname)}catch{res.writeHead(400);res.end();return}
  const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  fs.stat(file,(err,stat)=>{
    if(err||!stat.isFile()){console.log('MISSING',name);res.writeHead(404);res.end('Not found');return}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':stat.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    fs.createReadStream(file).pipe(res);
  });
}).listen(8787,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8787'));
