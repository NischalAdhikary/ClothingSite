import pool from '@/utils/db.js';
export const getAllCatgeory = async () => {
  const query = `SELECT * FROM categories`;
  const result = await pool.query(query);

  return result.rows;
};
export const getAllSubCategory = async () => {
  const query = `SELECT * FROM subcategories `;
  const result = await pool.query(query);
  return result.rows;
};
export const getCategoryById = async (id: string) => {
  const query = `SELECT * FROM categories where id=$1`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getSubCatByCatId = async (id: string) => {
  const query = `SELECT * FROM subcategories WHERE category_id=$1`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows;
};
export const getSubCategoryById = async (id: string) => {
  const query = `SELECT * FROM subcategories WHERE id=$1`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
