# KeyWizards ⌨️

An express-typescript-mongoose backend application for an e-commerce application exclusively for mecahnical keyboards featuring administritive controls like product and order CRUD operations along with efficient inventory managment logic and order processing.

[![Live Server Link](https://img.shields.io/badge/Live_Server_Link-blue)](https://mechanical-keyboard-ecommerce-server.vercel.app/)


## Table of Contents 📝

- [**Features**](#features)
- [**Getting Started**](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [**Usage**](#usage)
- [**API Endpoints**](#api-endpoints)
- [**Project Structure**](#project-structure)
- [**Technologies Used**](#technologies-used)
- [**Contact**](#contact)
  
## Features

- Inventory management
- CRUD operations on products
- Order processing & validation
- Search among products
- Retrieve orders by a specific email
- Integration of MongoDB using Mongoose

## Getting Started 🚀
### Prerequisites 📋
Before you begin, please ensure you have the following dependencies installed:
```bash
Node.js (v20.11.0 or later)
npm (v20.11.0 or later)
```
### Installation 🛠️
1. Clone the repository:
 ```bash
 git clone https://github.com/safia-nusrat-official/mechanical-keyboard-ecommerce-server.git
 ```
2. Move to *mechanical-keyboard-ecommerce-server* :
```bash
cd meeting-room-booking-system
```
3. Install the depecdencies:
```bash
 npm install
 ```

### Configuration ⚙️
1. In the root directory of your project, create a .env file and add the following configuration variables:
```env
PORT=5000
DB_URL=mongodb+srv://sattarabdussattar23:1RAiQp4Pr585Ryzm@learning-mongoose.3blupmm.mongodb.net/assignment-4?retryWrites=true&w=majority&appName=learning-mongoose
NODE_ENV=development
```

## Usage 📖
1. To run the development server, hit:
```bash
npm run dev
```
Or, if you want to run the production server:
```bash
npm run build
npm run start
```
Your server is running on [http://localhost:5000](http://localhost:5000) .

## API Endpoints 🌐
Here is a list of the API Endpoints:
### Room Routes
1. **Create a Product:**
    - *Route:* **POST** `/api/products/`
    - *Request Body:*
```json
   {
    "title": "Premium Wooden Mechanical Keyboard",
    "description": "Luxury meets performance with this wooden mechanical keyboard, equipped with Cherry MX Brown switches and a stunning wood finish.",
    "price": 249.99,
    "rating": 4.8,
    "image": "https://example.com/images/wooden_keyboard.jpg",
    "brand": "WoodType",
    "availableQuantity": 5
  }
```
  2. **Fetch a Product by Id:**
     - *Route:* **GET** `/api/products/:productId`
       
  3. **Fetch all Products:**
     - *Route:* **GET** `/api/products/`
 
 _**N.B:** You can perform also search, filter, sort operations on the result via query parameters😋_
 
 _Example: `/api/products?rating=5&searchTerm=WoodType&sort=price`_
 
  4. **Update a Product:**
      - *Route:* **PATCH** `/api/products/:productId`
      - *Request Body:*
```json
  {
    rating: 3.8
  }
```

  5. **Delete a Product:**
     - *Route:* **DELETE** `/api/products/:productId`
    
### Order Api Endpoints:
1. **Create an Order:**
    - *Route:* **POST** `/api/order/`
    - *Request Body:*
```json
   {
    "email": "john.doe@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "address": "123 Main St, Springfield, USA",
    "paymentMethod": "cash",
    "status": "delivered",
    "productId": "668ffcc3462e10036f8bf5f8",
    "price": 129.99,
    "orderedQuantity": 23,
    "date":"20-04-2026"
  }
```
  2. **Fetch all Orders:**
     - *Route:* **GET** `/api/orders`

## Project Structure 📂
This project follows Modular structure to ensure scalability, flexibility and maintainability, allowing easier management of code and better organization. The main components of the project structure are:
```
mechanical-keyboard-ecommerce-server/
├── src/
│   ├── app/
│   |   ├── builder/
│   |   |   ├── QueryBuilder.ts
│   |   ├── config/
│   |   |   ├── index.ts
│   |   ├── errors/
│   |   |   ├── AppError.ts
│   |   |   ├── handleCastError.ts
│   |   |   ├── handleDuplicateKeyError.ts
│   |   |   ├── handleValidationError.ts
│   |   |   ├── handleZodError.ts
│   |   ├── interfaces/
│   |   |   ├── errors.interface.ts
│   |   ├── middlewares/
│   |   |   ├── validateRequest.ts
│   |   |   ├── globalErrorHandler.ts
│   |   |   ├── notFoundErrorHandler.ts
│   |   ├── utils/
│   |   |   ├── catchAsync.ts
│   |   |   ├── sendResponse.ts
│   |   ├── modules/
│   |   |   ├── products/
│   |   |   |   ├── product.interface.ts
│   |   |   |   ├── product.model.ts
│   |   |   |   ├── product.validations.ts
│   |   |   |   ├── products.controllers.ts
│   |   |   |   ├── products.services.ts
│   |   |   |   ├── products.routes.ts
│   |   |   ├── orders/
│   |   |   |   ├── order.interface.ts
│   |   |   |   ├── order.model.ts
│   |   |   |   ├── order.validations.ts
│   |   |   |   ├── orders.controllers.ts
│   |   |   |   ├── orders.services.ts
│   |   |   |   ├── orders.routes.ts
│   ├── app.ts
│   ├── server.ts
├── eslint.config.json
├── .prettierrc.json
├── .eslintignore
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Technologies Used 💻
- Web-framework: **[Express.Js](https://expressjs.com/)**
- Programming Language: **[Typescript](https://www.typescriptlang.org/)**
- Object Data Modeling: **[Mongoose](https://mongoosejs.com/)**
- Database: **[MongoDB](https://www.mongodb.com/)**
- Validation Library: **[Zod](https://zod.dev/)**
- Formatters: **[ESLint](https://eslint.org/)**, **[Prettier](https://prettier.io/)**
  
## Contact 📞
For any enquires or issues related installation, please reach out to us at _safia.nusrat.official@gmail.com_. We welcome yor feedback and are here to guide you through your troubles and clean up any confusions. Thank you 😊!

_[Safia Nusrat](https://github.com/safia-nusrat-official)_
