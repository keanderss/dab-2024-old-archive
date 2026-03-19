const todos = [];

const handleGetTodos = async (request) => {
	return Response.json(todos);
};

const handlePostTodos = async (request) => {
	try {
		const todo = await request.json();
		todos.push(todo);
	} catch (error) {
		console.log(error);
		return new Response("Bad Request", { status: 400 });
	}
	return new Response("OK", { status: 200 });
};

const urlMapping = [
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
