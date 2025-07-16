import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer'; 
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

// Configura CORS
app.use(cors());

// Aumenta o limite de JSON e urlencoded para evitar erro 413
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Middleware de upload com limite de 1MB
const upload = multer({
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
});


// Rotas
app.use('/api/users', userRoutes);
app.use('/api', chatRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});