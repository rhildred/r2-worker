import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';
import fs from "node:fs";

describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const headers = new Headers();
		headers.append("Host", "k3p.ca");

		const request = new Request('http://example.com', {headers, method:"GET"});
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, {fs}, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});

	it.skip('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch(request, env, ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	});
});
