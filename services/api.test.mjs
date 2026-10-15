import test from "node:test";import assert from "node:assert/strict";import {handler} from "./api.mjs";
function response(){return{status:0,body:"",writeHead(code){this.status=code},end(body=""){this.body=body}}}
test("failure injection is explicit and observable",()=>{const res=response();handler({url:"/checkout",method:"POST",headers:{"x-failure-mode":"payment-timeout"}},res);assert.equal(res.status,503);assert.match(res.body,/timeout/);});
