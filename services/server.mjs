import http from "node:http";import {handler} from "./api.mjs";
const server=http.createServer(handler);server.listen(8080,()=>console.log("checkout-api listening on :8080"));process.on("SIGTERM",()=>server.close());
