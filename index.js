import express from 'express';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/cart.router.js';

const PORT = 8080;
const app = express();

app.use(express.json()); 

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter); 

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});