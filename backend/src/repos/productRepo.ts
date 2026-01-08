import pool from '@/utils/db.js';
export const getProductById = async (id: string) => {
  const query = `SELECT * FROM products WHERE id=$1`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getProductVariantById = async (id: string) => {
  const query = `SELECT * FROM productvariants  WHERE id=$1  `;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const deleteProductById = async (id: string) => {
  const query = `DELETE FROM products WHERE id=$1 RETURNING *`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const deleteVariantByID = async (id: string) => {
  const query = `DELETE FROM productvariants WHERE id=$1 RETURNING *`;
  const values = [id];
  const result = await pool.query(query, values);

  return result.rows[0];
};
