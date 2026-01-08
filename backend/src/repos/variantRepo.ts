import pool from '@/utils/db.js';
export const fetchSizes = async () => {
  const query = `SELECT * FROM sizes `;
  const result = await pool.query(query);
  return result.rows;
};
export const fetchColors = async () => {
  const query = `SELECT * FROM colors`;
  const result = await pool.query(query);
  return result.rows;
};
