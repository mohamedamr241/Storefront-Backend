# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

Note: to pass the verification of the token you should first create a user and then take the token from the response and then but it in Auth Bearer.

## API Endpoints

#### Products

- Index

  - HTTP VERB: GET
  - End point: /products
  - Request body: no body
  - Response body:

  ```json
  {
    "status": "success",
    "data": {
      "0": {
        "id": 2,
        "name": "XIAOMI REDMI NOTE 9 PRO",
        "price": "6799.40"
      }
    },
    "message": "successfully getting all products"
  }
  ```

  - to access it : http://localhost:3000/products

- Show

  - HTTP VERB: GET
  - End Point: /products/:id
  - Request body: no body
  - Request params: /products/2
  - Response body:

  ```json
  {
    "status": "success",
    "data": {
      "id": 2,
      "name": "XIAOMI REDMI NOTE 9 PRO",
      "price": "6799.40"
    },
    "message": "successfully getting this product"
  }
  ```

  - to access it : http://localhost:3000/products/2

- Create [token required]

  - HTTP VERB: POST
  - End Point: /createProduct
  - Request body:

  ```json
  {
    "name": "IPHONE 13 PRO",
    "price": "2500.20"
  }
  ```

  - Response body:

  ```json
  {
    "status": "success",
    "data": {
      "id": 4,
      "name": "IPHONE 13 PRO",
      "price": "2500.20"
    },
    "message": "successfully creating this product"
  }
  ```

  - to access it: http://localhost:3000/createProduct

- change [token required]
  - HTTP VERB: PUT
  - End Point: /updateProduct
  - Request body:
  ```json
  {
    "id": "3",
    "name": "IPHONE 12 PRO",
    "price": "10000"
  }
  ```
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "id": 2,
      "name": "IPHONE 12 PRO",
      "price": "10000.00"
    },
    "message": "successfully updating this product"
  }
  ```
  - to access it: http://localhost:3000/updateProduct
- destroy [token required]
  - HTTP VERB: DELETE
  - End Point: /deleteProduct
  - Request body:
  ```json
  {
    "id": "4"
  }
  ```
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "id": 4,
      "name": "IPHONE 13 PRO",
      "price": "2500.20"
    },
    "message": "successfully deleting this product"
  }
  ```
  - to access it: http://localhost:3000/deleteProduct

#### Users

- Index [token required]

  - HTTP VERB: GET
  - End Point: /users
  - Request Body: no body
  - Response Body:
    ```json
    {
      "status": "success",
      "data": {
        "0": {
          "username": "ahmedamr241",
          "firstname": "Ahmed",
          "lastname": "Amr"
        },
        "1": {
          "username": "mohamedamr241",
          "firstname": "Mohamed",
          "lastname": "Amr"
        },
        "2": {
          "username": "hadymohamed241",
          "firstname": "hady",
          "lastname": "mohamed"
        }
      },
      "message": "successfully getting all users"
    }
    ```
  - to access it: http://localhost:3000/users

- getUser [token required]

  - HTTP VERB: GET
  - End Point: /getUser
  - Request Body:

  ```json
  {
    "username": "hadymohamed241",
    "password": "hady123"
  }
  ```

  - Response Body:

  ```json
  {
    "status": "success",
    "data": {
      "username": "hadymohamed241",
      "firstname": "hady",
      "lastname": "mohamed",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiaGFkeW1vaGFtZWQyNDEiLCJmaXJzdG5hbWUiOiJoYWR5IiwibGFzdG5hbWUiOiJtb2hhbWVkIn0sImlhdCI6MTY1OTI5MTYxOH0.2MwLrrBY--6hvp77rlka7b5R4U_TctGrDbppq21TF_g"
    },
    "message": "successfully getting this users"
  }
  ```

  - to access it: http://localhost:3000/getUser

- create_user
  - HTTP VERB: POST
  - End Point: /createUser
  - Request body:
    ```json
    {
      "username": "louai241",
      "firstname": "louai",
      "lastname": "mohsen",
      "password": "louai123"
    }
    ```
    - Response body:
    ```json
    {
      "status": "success",
      "data": {
        "User": {
          "username": "louai241"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibG91YWkyNDEifSwiaWF0IjoxNjU5MjkyMTE1fQ.Pd0k5GrgEBQKpDuPbH5qhKpmdlTkl8BjVNsMBMSlLBA"
      },
      "message": "successfully creating user"
    }
    ```
    - to access it: http://localhost:3000/createUser
- authentication [token required]
  - HTTP VERB: POST
  - End Point: /authenicateUser
  - Request body:
  ```json
  {
    "username": "louai241",
    "password": "louai123"
  }
  ```
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "password": "$2b$10$tmDhjfXItm3oni2dnxte.u1MBoRPN0CPnpSMSaCG4kzh00MAGDiti"
    },
    "message": "successfully authenticating user"
  }
  ```
  - to access it: http://localhost:3000/authenicateUser
- update [token required]

  - HTTP VERB: PUT
  - End Point: /updateuser
  - Request body:

  ```json
  {
    "id": "2",
    "username": "mohamedamr241",
    "firstname": "Mohamed",
    "lastname": "Amr",
    "password": "mohamed123"
  }
  ```

  - Response body:

  ```json
  {
    "status": "success",
    "data": {
      "id": 2,
      "username": "mohamedamr241",
      "firstname": "Mohamed",
      "lastname": "Amr",
      "password": "$2b$10$XTjQ4xo1doIxO/.9Sg0qBuY4.rQUMonY2mmDXa3knwA/2QdZyc5Mq"
    },
    "message": "successfully updating user"
  }
  ```

  - to access it: http://localhost:3000/updateuser

- delete [token required]
  - HTTP VERB: DELETE
  - End Point: /deleteuser
  - Request body:
  ```json
  {
    "id": "2"
  }
  ```
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "id": 2,
      "username": "mohamedamr241",
      "firstname": "Mohamed",
      "lastname": "Amr",
      "password": "$2b$10$XTjQ4xo1doIxO/.9Sg0qBuY4.rQUMonY2mmDXa3knwA/2QdZyc5Mq"
    },
    "message": "successfully deleting user"
  }
  ```
  - to access it: http://localhost:3000/deleteuser

#### Orders

- index [token required]
  - HTTP VERB: GET
  - End Point: /orders
  - Request body: no body
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "0": {
        "id": 1,
        "status": "complete",
        "user_id": "3"
      },
      "1": {
        "id": 2,
        "status": "active",
        "user_id": "3"
      },
      "2": {
        "id": 3,
        "status": "complete",
        "user_id": "3"
      }
    },
    "message": "successfully getting all orders"
  }
  ```
  - to access it: http://localhost:3000/orders
- show [token required]
  - HTTP VERB: GET
  - End Point: /orders/:id
  - Request body: no body
  - Request params: /orders/1
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "status": "complete",
      "user_id": "3"
    },
    "message": "successfully getting this order"
  }
  ```
  to access it: http://localhost:3000//orders/1
- create [token required]
  - HTTP VERB: POST
  - End Point: /createOrders
  - Request body:
  ```json
  {
    "userId": "3"
  }
  ```
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "id": 4,
      "status": "active",
      "user_id": "3"
    },
    "message": "successfully creating order"
  }
  ```
  - to access it: http://localhost:3000/createOrders
- change [token required]
  - HTTP VERB: POST
  - End Point: /updateOrder
  - Request body:
  ```json
  {
    "id": "4",
    "status": "complete"
  }
  ```
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "id": 4,
      "status": "complete",
      "user_id": "3"
    },
    "message": "successfully updating order"
  }
  ```
  - to access it: http://localhost:3000/updateOrder
- destroy [token required]
  - HTTP VERB: DELETE
  - End Point: /deleteOrder
  - Request body:
  ```json
  {
    "id": "4"
  }
  ```
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "id": 4,
      "status": "complete",
      "user_id": "3"
    },
    "message": "successfully deleting order"
  }
  ```
  - to access it: http://localhost:3000/deleteOrder
- addproduct [token required]
  - HTTP VERB: POST
  - End Point: /orders/:id/products
  - Request params: /orders/3/products
  - Request body:
  ```json
  {
    "productId": "2",
    "quantity": "5"
  }
  ```
  - Response body:
  ```json
  {
    "status": "success",
    "data": {
      "id": 2,
      "product_id": "2",
      "quantity": 5,
      "order_id": "3"
    },
    "message": "successfully adding product to order"
  }
  ```
  - to access it: http://localhost:3000/orders/3/products

## Database schema

we have two databases one for development and other for testing:

#### my_new_database

### Product

```sql
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

```

### User

```sql
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    password CHAR(60)
);
```

### Orders

```sql
CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    status varchar(9),
    user_id bigint REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE
);
```

### Orders_Products

```sql
CREATE TABLE Orders_Products(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES Products(id) ON DELETE SET NULL ON UPDATE CASCADE,
    order_id bigint REFERENCES Orders(id) ON DELETE SET NULL ON UPDATE CASCADE,
    quantity INT
);
```

#### my_new_database_test

### Product

```sql
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

```

### User

```sql
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    password CHAR(60)
);
```

### Orders

```sql
CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    status varchar(9),
    user_id bigint REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE
);
```

### Orders_Products

```sql
CREATE TABLE Orders_Products(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES Products(id) ON DELETE SET NULL ON UPDATE CASCADE,
    order_id bigint REFERENCES Orders(id) ON DELETE SET NULL ON UPDATE CASCADE,
    quantity INT
);
```
