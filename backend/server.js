// Carregar variáveis de ambiente PRIMEIRO (antes de qualquer outra coisa)
import dotenv from 'dotenv';
dotenv.config();

// Depois importar o resto
import express from 'express';
import cors from 'cors';
import leadRoutes from './routes/leads.js';

const app = express();

// 🔐 CORS - Configurado por variáveis de ambiente
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];

console.log(`🔒 CORS Origins Permitidas:`, corsOrigins);

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/leads', leadRoutes);
app.use('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ⚙️ Configurações do servidor
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, HOST, () => {
  console.log(`\n✅ API ${NODE_ENV.toUpperCase()} rodando em http://${HOST}:${PORT}\n`);
});