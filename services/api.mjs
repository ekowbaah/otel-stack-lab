import {appendFileSync} from "node:fs";import {trace} from "@opentelemetry/api";
let requests=0,failures=0;
function log(record){const line=JSON.stringify(record);console.log(line);if(process.env.LOG_FILE)appendFileSync(process.env.LOG_FILE,`${line}\n`);}
export function handler(req,res){requests++;const span=trace.getActiveSpan();const traceId=span?.spanContext().traceId??"none";const fail=req.url==="/checkout"&&req.headers["x-failure-mode"]==="payment-timeout";if(fail)failures++;log({level:fail?"error":"info",trace_id:traceId,method:req.method,path:req.url,failure:fail});
if(req.url==="/health"){res.writeHead(200,{"content-type":"application/json"});return res.end('{"status":"ok"}');}
if(req.url==="/metrics"){res.writeHead(200,{"content-type":"text/plain"});return res.end(`checkout_requests_total ${requests}\ncheckout_failures_total ${failures}\n`);}
if(fail){res.writeHead(503,{"retry-after":"1"});return res.end("injected payment timeout");}res.writeHead(200,{"content-type":"application/json"});res.end(JSON.stringify({checkoutId:`chk_${requests}`}));}
