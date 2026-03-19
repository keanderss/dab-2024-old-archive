import { postgres } from "../deps.js";

const sql = postgres({});

const getItem = async (id) => {
  const items = await sql`SELECT * FROM items WHERE id = ${id}`;
  return items[0];
};

const getItems = async () => {
  return await sql`SELECT * FROM items`;
};

const addItem = async (name) => {
  await sql`INSERT INTO items (name) VALUES (${name})`;
};

export { getItem, getItems, addItem };