import BaseManager from './BaseManager.js';

class ProductManager extends BaseManager {
    constructor() {
        super('products.json');
    }

    async getProducts() {
        if (this.data.length === 0) await this.initialize();
        return this.data;
    }

    async addProduct(productData) {
        // Validar campos requeridos
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        if (requiredFields.some(field => !productData[field])) {
            throw new Error('Faltan campos obligatorios para el producto.');
        }

        const newProduct = {
            id: this.generateId(this.data),
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: Number(productData.price),
            status: true,
            stock: Number(productData.stock),
            category: productData.category,
            thumbnails: productData.thumbnails || []
        };

        this.data.push(newProduct);
        await this.saveData();
        return newProduct;
    }

    // *** Aquí irían getProductById, updateProduct, deleteProduct ***
}

export default ProductManager;