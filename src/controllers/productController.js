const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProducts = async (req, res) => {
    const productos = await prisma.producto.findMany({ include: { categoria: true } });
    
    const resultado = productos.map(p => {
        const data = { ...p, bajoStock: Number(p.stockActual) <= Number(p.stockMinimo) };
        if (req.user && req.user.rol === 'EMPLEADO') {
            delete data.precioCompra;
        }
        return data;
    });
    
    res.json(resultado);
};

exports.createProduct = async (req, res) => {
    const data = req.body;
    const existe = await prisma.producto.findUnique({ where: { sku: data.sku } });
    
    if (existe) {
        return res.status(400).json({ mensaje: 'El SKU ya está registrado' });
    }
    
    const producto = await prisma.producto.create({ data });
    res.status(201).json(producto);
};