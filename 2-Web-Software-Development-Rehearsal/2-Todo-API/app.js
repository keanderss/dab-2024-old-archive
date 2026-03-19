import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";

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
		await sql`INSERT INTO todos (item) VALUES (${todo.item})`
		return new Response("OK", { status: 200 });
	}

	return new Response("Bad request", { status: 400 });
};

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
];

const handleRequest = async (request) => {
	const mapping = urlMapping.find(
		(um) => um.method === request.method && um.pattern.test(request.url)
	);

	if (!mapping) {
		return new Response("Not found", { status: 404 });
	}

	const mappingResult = mapping.pattern.exec(request.url);
	return await mapping.fn(request, mappingResult);
};

Deno.serve({ port: 7777 }, handleRequest);
