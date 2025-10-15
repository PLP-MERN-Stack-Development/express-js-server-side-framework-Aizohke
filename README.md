# 🚂 Week 2: Express.js – Server-Side Framework

### Product RESTful API

---

## 📘 Overview

This project is a **RESTful API** built using **Express.js** for managing products.
It implements full **CRUD operations**, structured **routing**, custom **middleware** for logging, authentication, validation, and comprehensive **error handling**.
Advanced features like **filtering**, **pagination**, and **search** are also included.

---

## 🧠 Objective

> Build a RESTful API using Express.js that implements standard CRUD operations, proper routing, middleware implementation, and error handling.

---

## 📂 Project Structure

```
express-products-api/
│
├── server.js
├── package.json
├── README.md
├── .env.example
├── .gitignore
│
├── config/
│   └── db.js
│
├── routes/
│   └── products.js
│
└── middleware/
    ├── logger.js
    ├── auth.js
    ├── validateProduct.js
    └── errorHandler.js
```

---

## ⚙️ Setup Instructions

### 🧩 1. Clone the repository

```bash
git clone https://github.com/<your-username>/express-products-api.git
cd express-products-api
```

### 📦 2. Install dependencies

```bash
npm install
```

### 🔑 3. Create `.env` file

Copy `.env.example` to `.env` and add your API key:

```bash
API_KEY=my-secret-api-key
PORT=3000
```

### ▶️ 4. Run the server

```bash
node server.js
```

Server will start at:

```
http://localhost:3000
```

---

## 🚀 API Endpoints

| Method | Endpoint              | Description                                                    |
| ------ | --------------------- | -------------------------------------------------------------- |
| GET    | `/api/products`       | List all products (supports filtering, pagination, and search) |
| GET    | `/api/products/:id`   | Get product by ID                                              |
| POST   | `/api/products`       | Create new product                                             |
| PUT    | `/api/products/:id`   | Update existing product                                        |
| DELETE | `/api/products/:id`   | Delete product                                                 |
| GET    | `/api/products/stats` | Get product count by category                                  |

---

## 🧱 Product Schema

```json
{
  "id": "string (auto-generated)",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "inStock": "boolean"
}
```

---

## 🔐 Authentication

Each request must include a **header** with the correct API key:

| Key         | Value               |
| ----------- | ------------------- |
| `x-api-key` | your-secret-api-key |

If the header is missing or incorrect, the server responds with:

```json
{
  "error": "Unauthorized: Invalid API Key"
}
```

---

## 🧪 Testing with Postman

You can test all endpoints using **Postman** or **Thunder Client**.

### Example Setup:

1. Open Postman
2. Create a new request
3. Add this header:

   ```
   x-api-key: my-secret-api-key
   ```
4. Choose the HTTP method and paste the URL
   e.g. `http://localhost:3000/api/products`

---

### 🔍 Example Requests & Responses

#### 1️⃣ Get All Products

**GET** `http://localhost:3000/api/products`

**Response:**

```json
[
  {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
]
```

---

#### 2️⃣ Create Product

**POST** `http://localhost:3000/api/products`

**Headers:**

```
x-api-key: my-secret-api-key
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "name": "Wireless Mouse",
  "description": "Smooth, ergonomic wireless mouse",
  "price": 25,
  "category": "electronics",
  "inStock": true
}
```

**Response:**

```json
{
  "id": "e67d0f8c-23b4-45a8-bb31-3f1a2c1e4d3e",
  "name": "Wireless Mouse",
  "description": "Smooth, ergonomic wireless mouse",
  "price": 25,
  "category": "electronics",
  "inStock": true
}
```

---

#### 3️⃣ Get Product by ID

**GET** `http://localhost:3000/api/products/:id`

**Response:**

```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

---

#### 4️⃣ Update Product

**PUT** `http://localhost:3000/api/products/:id`

**Body:**

```json
{
  "price": 999,
  "inStock": false
}
```

**Response:**

```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "1",
    "name": "Laptop",
    "price": 999,
    "inStock": false
  }
}
```

---

#### 5️⃣ Delete Product

**DELETE** `http://localhost:3000/api/products/:id`

**Response:**

```json
{
  "message": "Product deleted successfully"
}
```

---

#### 6️⃣ Search / Filter / Pagination

| Example            | Endpoint                             |
| ------------------ | ------------------------------------ |
| Filter by category | `/api/products?category=electronics` |
| Search by name     | `/api/products?search=phone`         |
| Pagination         | `/api/products?page=1&limit=2`       |

---

## 🧩 Middleware Summary

| Middleware           | File                            | Purpose                               |
| -------------------- | ------------------------------- | ------------------------------------- |
| **Logger**           | `middleware/logger.js`          | Logs method, URL, and timestamp       |
| **Auth**             | `middleware/auth.js`            | Checks API key validity               |
| **Validate Product** | `middleware/validateProduct.js` | Validates request body for POST & PUT |
| **Error Handler**    | `middleware/errorHandler.js`    | Handles and formats all server errors |

---

## ⚠️ Error Handling Examples

**Validation Error (400):**

```json
{
  "error": "Invalid product data. Please check all fields."
}
```

**Not Found Error (404):**

```json
{
  "error": "Product not found"
}
```

**Unauthorized (401):**

```json
{
  "error": "Unauthorized: Invalid API Key"
}
```

---

## 🧰 Technologies Used

* **Node.js (v18+)**
* **Express.js**
* **dotenv**
* **uuid**
* **Postman** (for API testing)

---

## 👨‍💻 Author

**Isaac Mathenge**
Mechanical Engineering Student | Tech Enthusiast | Aspiring Innovator
📍 Kenya

---

## 🧾 License

This project is part of the **Week 2 PLP Backend Development Assignment** for learning purposes.