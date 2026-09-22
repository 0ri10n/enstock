process.env.JWT_SECRET = 'clave_secreta_para_tests';

const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

jest.mock('@prisma/client', () => {
  const mPrisma = { usuario: { findUnique: jest.fn() } };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

const prisma = new PrismaClient();

describe('Pruebas de Autenticación', () => {
  it('Debe rechazar un login con credenciales incorrectas', async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'fake@test.com', password: '123' });
    expect(res.statusCode).toBe(401);
  });

  it('Debe iniciar sesión y devolver un JWT', async () => {
    const hashPassword = await bcrypt.hash('password123', 10);
    prisma.usuario.findUnique.mockResolvedValue({ id: '1', nombre: 'Test', email: 'test@test.com', password: hashPassword, rol: 'ADMIN' });
    
    const res = await request(app).post('/api/v1/auth/login').send({ email: 'test@test.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});