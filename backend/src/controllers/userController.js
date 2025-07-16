import pool from '../db.js';
import bcrypt from 'bcrypt';
import multer from 'multer';

// REGISTRO - register new user
export const registerUser = async (req, res) => {
  const { name, email, password, type = 'user' } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password, type) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, type]
    );

    const user = result.rows[0];
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas!' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas!' });
    }

    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// PERFIL
export const getUserProfile = async (req, res) => {
  const { name } = req.query;

  try {
    const result = await pool.query(
      'SELECT name, email, description, type FROM users WHERE name = $1',
      [name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// ATUALIZAR DESCRIÇÃO
export const updateDescription = async (req, res) => {
  const { name, description } = req.body;

  try {
    await pool.query(
      'UPDATE users SET description = $1 WHERE name = $2',
      [description, name]
    );
    res.status(200).json({ message: 'Descrição atualizada com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar descrição:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};


// PEGAR AVATAR
export const getAvatar = async (req, res) => {
  const { name } = req.params;

  try {
    const result = await pool.query('SELECT avatar FROM users WHERE name = $1', [name]);
    if (result.rows.length === 0 || !result.rows[0].avatar) {
      return res.status(404).json({ error: 'Avatar não encontrado.' });
    }

    const base64 = result.rows[0].avatar.toString('base64');
    res.status(200).json({ image: base64 });
  } catch (error) {
    console.error('Erro ao buscar avatar:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// ATUALIZAR AVATAR
export const updateAvatar = async (req, res) => {
  const { name } = req.body;
  const avatar = req.file?.buffer;

  if (!name || !avatar) 
    return res.status(400).json({ error: 'Nome ou imagem ausente.' });


  try {
    await pool.query('UPDATE users SET avatar = $1 WHERE name = $2', [avatar, name]);
    res.status(200).json({ message: 'Avatar salvo com sucesso.' });
  } catch (error) {
    console.error('Erro ao salvar avatar:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT name, type, avatar FROM users');

    const users = result.rows.map(user => ({
      name: user.name,
      type: user.type,
      avatar: user.avatar ? user.avatar.toString('base64') : null,
    }));

    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};