const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCategories = async (req, res) => {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
};

exports.createCategory = async (req, res) => {
    const { nombre } = req.body;
    try {
        const categoria = await prisma.categoria.create({ data: { nombre } });
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la categoría' });
    }
};