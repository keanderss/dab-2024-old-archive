import * as itemService from "./services/itemService.js";
import { cacheMethodCalls } from "./util/cacheUtil.js";

const SERVER_ID = crypto.randomUUID();

const cachedItemService = cacheMethodCalls(itemService, ["addItem"]);

const handleGetRoot = async (request) => {
	return new Response(`Hello from ${SERVER_ID}`);
};

const handleGetItem = async (request, urlPatternResult) => {
	const id = urlPatternResult.pathname.groups.id;
	return Response.json(await cachedItemService.getItem(id));
};

const handleGetItems = async (request) => {
	return Response.json(await cachedItemService.getItems());
};

const handlePostItems = async (request) => {
	// assuming that the request has a json object and that
	// the json object has a property name
	const item = await request.json();
	await cachedItemService.addItem(item.name);
	return new Response("OK", { status: 200 });
};

const urlMapping = [
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/items/:id" }),
		fn: handleGetItem,
	},
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/items" }),
		fn: handleGetItems,
	},
	{
		method: "POST",
		pattern: new URLPattern({ pathname: "/items" }),
		fn: handlePostItems,
	},
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/" }),
		fn: handleGetRoot,
	},
];

const handleRequest = async (request) => {
	const mapping = urlMapping.find(
		(um) => um.method === request.method && um.pattern.test(request.url)
	);

	if (!mapping) {
		return new Response("Not found", { status: 404 });
	}

	const mappingResult = mapping.pattern.exec(request.url);
	try {
		return await mapping.fn(request, mappingResult);
	} catch (e) {
		console.log(e);
		return new Response(e.stack, { status: 500 });
	}
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
Deno.serve(portConfig, handleRequest);
