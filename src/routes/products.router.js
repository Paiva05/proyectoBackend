import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const productManager = new ProductManager();
const router = Router();

// GET /api/products/
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error interno del servidor al obtener productos." });
    }
});

// POST /api/products/
router.post('/', async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productManager.addProduct(productData);
        
        res.status(201).json({ 
            status: "success", 
            message: "Producto agregado exitosamente", 
            payload: newProduct 
        });

    } catch (error) {
        if (error.message.includes('Faltan campos obligatorios')) {
            return res.status(400).json({ status: "error", message: error.message });
        }
        res.status(500).json({ status: "error", message: "Error interno del servidor al crear producto." });
    }
});

export default router;