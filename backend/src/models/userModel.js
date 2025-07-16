// backend/src/models/userModel.js
import pool from '../db.js';
import bcrypt from 'bcrypt';

// Criar novo usuário
export const createUser = async (name, email, password, type = 'user') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (name, email, password, type)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, type
  `;
  const values = [name, email, hashedPassword, type];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Buscar por e-mail (para login)
export const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

// Buscar perfil pelo nome
export const getUserByName = async (name) => {
  const query = 'SELECT name, email, avatar_url, description, type FROM users WHERE name = $1';
  const result = await pool.query(query, [name]);
  return result.rows[0];
};

// Atualizar descrição do usuário
export const updateUserDescription = async (name, description) => {
  const query = 'UPDATE users SET description = $1 WHERE name = $2';
  await pool.query(query, [description, name]);
};

// Atualizar avatar do usuário
export const updateUserAvatar = async (name, avatar_url) => {
  const query = 'UPDATE users SET avatar_url = $1 WHERE name = $2';
  await pool.query(query, [avatar_url, name]);
};