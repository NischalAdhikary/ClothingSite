import pool from '@/utils/db.js';
import { UUID } from 'crypto';
export const getUserById = async (id: string) => {
  const query = 'SELECT id,name,email,role FROM users WHERE id = $1';
  const values = [id];
  console.log('from repository:', id);
  const result = await pool.query(query, values);
  console.log('Query result:', result);
  return result.rows[0];
};
export const createUser = async (name: string, email: string) => {
  const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;
  const values = [name, email];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getUserByEmail = async (email: string) => {
  const query = `SELECT * FROM users WHERE email=$1`;
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getUserByClietId = async (id: UUID) => {
  const query = `SELECT user_id FROM authproviders where provider_user_id=$1`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const createAuthProvider = async (userId: string, provider: string, providerId: string) => {
  const query = `INSERT INTO authproviders (user_id,provider,provider_user_id) VALUES ($1,$2,$3) RETURNING *`;
  const values = [userId, provider, providerId];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const createUserShippingDetails = async (data) => {
  const query = `INSERT INTO useraddress (user_id,fullname,phone,address_line_1,address_line_2,province,city,postal_code) VALUES
  ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
  const values = [
    data.user_id,
    data.fullname,
    data.phone,
    data.address1,
    data.address2,
    data.province,
    data.city,
    data.postalcode,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};
export const getUserShippingDetails = async (id: string) => {
  const query = `SELECT fullname as fullname,phone as phone,address_line_1 as address1,address_line_2 as address2,province as province,city as city,postal_code as postalcode FROM useraddress where user_id=$1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
