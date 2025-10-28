# 🛍️ E-Commerce API (Node.js & Express)

Este proyecto es una API RESTful para gestionar un catálogo de productos y carritos de compra, desarrollada con **Node.js** y **Express**. La persistencia de los datos se realiza en archivos **JSON** utilizando la API de `fs/promises`.

---

## 🚀 Tecnologías Clave

* **Node.js:** Entorno de ejecución.
* **Express.js:** Framework minimalista para *routing* y *middleware*.
* **`fs/promises`:** Manejo **asíncrono** de archivos para persistencia de datos (JSON).
* **`express.Router()`:** Modularización de rutas.
* **`path`:** Módulo para la construcción de rutas de archivo absolutas y consistentes.

---

## ⚙️ Estructura del Proyecto

El código está organizado en capas separando el manejo de datos (Managers) del manejo de peticiones (Routers).

/ecommerce-api
├── src/
│   ├── app.js               # Servidor principal y montaje de routers
│   ├── managers/
│   │   ├── BaseManager.js   # Lógica base de persistencia asíncrona (fs/promises)
│   │   ├── ProductManager.js # Gestión de productos
│   │   └── CartManager.js    # Gestión de carritos
│   └── routes/
│       ├── products.router.js # Endpoints para /api/products
│       └── carts.router.js    # Endpoints para /api/carts
├── products.json            # Base de datos de productos (Persistencia)
├── carts.json               # Base de datos de carritos (Persistencia)
└── package.json

## 💻 Instalación y Ejecución

### 1. Requisitos

Asegúrate de tener **Node.js** instalado.

### 2. Configuración

1.  Instala las dependencias:
    ```bash
    npm install express
    ```
2.  Crea los archivos de persistencia en la raíz del proyecto:
    ```bash
    touch products.json carts.json
    ```

### 3. Ejecución

Inicia el servidor en el puerto `8080`:

```bash
node src/app.js
```

## 🛣️ Endpoints Implementados (Postman)

Todas las rutas deben ser probadas prefijadas con `http://localhost:8080/api`.

---

### 1. Rutas de Productos (`/products`)

| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | Lista todos los productos. | *Ninguno* |
| **POST** | `/api/products` | Agrega un nuevo producto (ID autogenerado). | `{ title, description, code, price (Number), stock (Number), category, thumbnails (Array) }` |

---

### 2. Rutas de Carritos (`/carts`)

| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/carts` | Crea un nuevo carrito. **Requiere** una lista no vacía de productos iniciales. (ID autogenerado). | `[ { productId: Number, quantity: Number } ]` |

## 📝 Ejemplo de Prueba (POST /api/carts)

Para crear un carrito con productos iniciales, envía el siguiente JSON en el cuerpo (`Body > raw > JSON`) de tu solicitud:

**URL:** `POST http://localhost:8080/api/carts`

```json
[
    {
        "productId": 2, 
        "quantity": 2 
    },
    {
        "productId": 3, 
        "quantity": 1 
    }
]
```
## 📋 Pendientes

Para completar la funcionalidad de la API, se requiere la implementación de las siguientes rutas:

* [ ] **GET** `/api/products/:pid`: Obtener un producto por ID.
* [ ] **PUT** `/api/products/:pid`: Actualizar un producto por ID.
* [ ] **DELETE** `/api/products/:pid`: Eliminar un producto por ID.
* [ ] **GET** `/api/carts/:cid`: Listar los productos de un carrito específico.
* [ ] **POST** `/api/carts/:cid/products`: Agregar un producto a un carrito ya existente.