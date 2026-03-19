import { postgres } from "./deps.js";

const sql = postgres({});

const handleGetTodo = async (request, urlPatternResult) => {
	const id = urlPatternResult.pathname.groups.id;

	const todos = await sql`SELECT * FROM todos WHERE id = ${id}`;
	const todo = todos[0];
	if (todo) {
		return Response.json(todo);
	}
	return new Response("Not found", { status: 404 });
};

const handleGetTodos = async (request) => {
	const todos = await sql`SELECT * FROM todos`;
	return Response.json(todos);
};

const handlePostTodos = async (request) => {
	let todo;
	try {
		todo = await request.json();
	} catch {}

	if (todo?.item) {
		await sql`INSERT INTO todos (item) VALUES (${todo.item})`;
		return new Response("OK", { status: 200 });
	}

	return new Response("Bad request", { status: 400 });
};

const handleDeleteTodos = async (request, urlPatternResult) => {
	const id = urlPatternResult.pathname.groups.id;

	const todos = await sql`SELECT * FROM todos WHERE id = ${id}`;
	const todo = todos[0];
	if (todo) {
		await sql`DELETE FROM todos WHERE id = ${id}`;
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
