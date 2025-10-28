import BaseManager from './BaseManager.js';

class CartManager extends BaseManager {
    constructor() {
        super('carts.json');
    }

    async createCart(productsData) {
        if (!Array.isArray(productsData) || productsData.length === 0) {
            throw new Error('El carrito no puede crearse vacío. Debe proporcionar al menos un producto.');
        }
        const isValid = productsData.every(p => p.productId && p.quantity && typeof p.productId === 'number' && typeof p.quantity === 'number');
        if (!isValid) {
            throw new Error('Formato de producto incorrecto. Se espera [{ productId: Number, quantity: Number }].');
        }

        if (this.data.length === 0) await this.initialize(); 

        const newCart = {
            id: this.generateId(this.data),
            products: productsData.map(p => ({ productId: p.productId, quantity: p.quantity }))
        };
        
        this.data.push(newCart);
        await this.saveData();
        
        return newCart;
    }
}

export default CartManager;