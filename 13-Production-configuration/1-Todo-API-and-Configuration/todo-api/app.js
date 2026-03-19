import * as todoService from "./services/todoService.js";
import { cacheMethodCalls } from "./util/cacheUtil.js";

const cachedTodoService = cacheMethodCalls(todoService, ["addTodo", "deleteTodos"]);

const handleGetTodo = async (request, urlPatternResult) => {
	const id = urlPatternResult.pathname.groups.id;

	const todo = await cachedTodoService.getTodo(id);
	if (todo) {
		return Response.json(todo);
	}
	return new Response("Not found", { status: 404 });
};

const handleGetTodos = async (request) => {
	return Response.json(await cachedTodoService.getTodos());
};

const handlePostTodos = async (request) => {
	let todo;
	try {
		todo = await request.json();
	} catch {}

	if (todo?.item) {
		await cachedTodoService.addTodo(todo.item);
		return new Response("OK", { status: 200 });
	}

	return new Response("Bad request", { status: 400 });
};

const handleDeleteTodos = async (request, urlPatternResult) => {
	const id = urlPatternResult.pathname.groups.id;

	const todo = await cachedTodoService.getTodo(id);
	if (todo) {
		await cachedTodoService.deleteTodos(id);
		return new Response("OK", { status: 200 });
	}
	return new Response("Not found", { status: 404 });
}

const urlMapping = [
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/todos/:id" }),
		fn: handleGetTodo,
	},
	{
		method: "GET",
		pattern: new URLPattern({ pathname: "/todos" }),
		fn: handleGetTodos,
	},
	{
		method: "POST",
		pattern: new URLPattern({ pathname: "/todos" }),
		fn: handlePostTodos,
	},
	{
		method: "DELETE",
		pattern: new URLPattern({ pathname: "/todos/:id" }),
		fn: handleDeleteTodos,
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

Deno.serve({ port: 7777, hostname: "0.0.0.0" }, handleRequest);
