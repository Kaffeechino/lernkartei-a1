// Kleiner lokaler Testserver: node serve.js  ->  http://localhost:5173
const http=require("http"),fs=require("fs"),path=require("path");
const root=path.join(__dirname,"docs"),types={".html":"text/html; charset=utf-8",".png":"image/png",".js":"text/javascript",".css":"text/css"};
http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split("?")[0]);if(p.endsWith("/"))p+="index.html";const f=path.join(root,p);
if(!f.startsWith(root)||!fs.existsSync(f)){r.writeHead(404);return r.end("not found")}
r.writeHead(200,{"Content-Type":types[path.extname(f)]||"application/octet-stream"});fs.createReadStream(f).pipe(r)}).listen(5173,()=>console.log("http://localhost:5173"));
