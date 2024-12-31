/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import Bucket from "./Bucket";

export default {
	async fetch(request, env) {
	  const url = new URL(request.url);
	  const sHost = request.headers.get("Host");
	  const oBucket = new Bucket(env);
	  const key = `${sHost}/${url.pathname.slice(1)}`;
  
	  if (request.method == "GET") {
			return new Response("Hello World");
	  }else{

	  }
	}
};
