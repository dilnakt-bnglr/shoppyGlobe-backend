# 1. Clone project

git clone https://github.com/dilnakt-bnglr/shoppyGlobe-backend.git
cd shoppyGlobe-backend

# 2. Install dependencies

npm install

# 3. Run server

npm start

## 📋 API Endpoints

### Authentication (Public)

| Method | Endpoint        | Description       | Auth |
| ------ | --------------- | ----------------- | ---- |
| `POST` | `/api/register` | Register new user | None |
| `POST` | `/api/login`    | Login & get JWT   | None |

### Products (Public)

| Method   | Endpoint            | Description            | Auth |
| -------- | ------------------- | ---------------------- | ---- |
| `GET`    | `/api/products`     | Get all products       | None |
| `GET`    | `/api/products/:id` | Get product by ID      | None |
| `POST`   | `/api/products`     | Add new product        |
| `PUT`    | `/api/products/:id` | Update a product by ID |
| `DELETE` | `/api/products/:id` | Delete a product by ID |

### Cart (Protected)

| Method   | Endpoint        | Description       | Auth    |
| -------- | --------------- | ----------------- | ------- |
| `POST`   | `/api/cart`     | Add to cart       | **JWT** |
| `PUT`    | `/api/cart/:id` | Update quantity   | **JWT** |
| `DELETE` | `/api/cart/:id` | Remove from cart  | **JWT** |
| `GET`    | `/api/cart`     | Get all from cart | **JWT** |
