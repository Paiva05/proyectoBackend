import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const cartManager = new CartManager();
const router = Router();

router.post('/', async (req, res) => {
    try {
        const productsData = req.body;
        const newCart = await cartManager.createCart(productsData);
        
        res.status(201).json({ 
            status: "success", 
            message: "Carrito creado exitosamente con productos iniciales", 
            payload: newCart 
        });

    } catch (error) {
        if (error.message.includes('El carrito no puede crearse vacío') || error.message.includes('Formato de producto incorrecto')) {
            return res.status(400).json({ status: "error", message: error.message });
        }
        console.error("Error al crear el carrito:", error);
        res.status(500).json({ 
            status: "error", 
            message: "Error interno del servidor." 
        });
    }
});

export default router;