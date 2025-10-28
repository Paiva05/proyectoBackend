import fs from 'fs/promises';
import path from 'path';

export default class BaseManager {
    constructor(fileName) {
        this.filePath = path.resolve(process.cwd(), fileName);
        this.data = [];
        this.initialize();
    }

    async initialize() {
        this.data = await this.loadData();
    }

    async loadData() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`Archivo ${path.basename(this.filePath)} no encontrado.`, error.message);
                return [];
            }
            console.error(`Error al cargar ${path.basename(this.filePath)}:`, error.message);
            return [];
        }
    }

    async saveData() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            console.error(`Error al guardar ${path.basename(this.filePath)}:`, error.message);
        }
    }

    generateId(items) {
        const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
        return maxId + 1;
    }
}