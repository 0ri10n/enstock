const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client', () => {
  const mPrisma = {
    producto: { findMany: jest.fn() },
    categoria: { findMany: jest.fn() }
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

const prisma = new PrismaClient();

describe('Pruebas de Productos y Reglas de Negocio', () => {
  let tokenEmpleado;

  beforeAll(() => {
    // Generamos un token simulado de EMPLEADO
    tokenEmpleado = jwt.sign({ id: '2', rol: 'EMPLEADO' }, process.env.JWT_SECRET || 'super_secret_jwt_key_2026_enstock');
  });

  it('Debe ocultar el precio de compra a los empleados y marcar bajoStock', async () => {
    prisma.producto.findMany.mockResolvedValue([
      { id: '1', sku: 'PROD-1', nombre: 'Laptop', precioCompra: 500, precioVenta: 800, stockActual: 2, stockMinimo: 5 }
    ]);

    const res = await request(app).get('/api/v1/products').set('Authorization', `Bearer ${tokenEmpleado}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body[0]).not.toHaveProperty('precioCompra'); // Regla de negocio 1
    expect(res.body[0].bajoStock).toBe(true); // Regla de negocio 2
  });
});