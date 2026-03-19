import { postgres } from "../deps.js";

const sql = postgres({});

const getTodo = async (id) => {
	const todos = await sql`SELECT * FROM todos WHERE id = ${id}`;
	return todos[0];
};

const getTodos = async () => {
    return await sql`SELECT * FROM todos`;
};

const addTodo = async (item) => {
    await sql`INSERT INTO todos (item) VALUES (${item})`;
};

const deleteTodos = async (id) => {
    await sql`DELETE FROM todos WHERE id = ${id}`;
}

export { getTodo, getTodos, addTodo, deleteTodos };
