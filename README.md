# Project Name: Farm Inventory Management Application

## Overview
This is a modern, single-page application (SPA) built to manage the core operations of a farm business, focusing on income (sales), expenditures and customer records. This project was developed as part of a structured learning curriculum.

## Tech Stack
* **Frontend Framework:** React.js
* **Styling:** Tailwind CSS (for rapid utility-first styling
* **Routing:** React Router DOM
* **State Management (implicit):** React Hooks ('useState', 'useEffect')
* **API Interaction:** Standard 'fetch'(to a Spring Boot/Node.js backend)

  ## Getting Started
Follow these steps to get a local copy of the project up and running:

### Prerequisites
1. Node.js (LTS version recommended)
2. npm (or yarn)
3. API: Swagger API for making calls, POSTS, GET, PATCH and DELETE

   ### Installation
   1. Clone the repository
      git clone https://github.com/Berserker71130/mantisPro.git

   2. Navigate to the project directory:
         cd mypro

   3. Install dependencies:
   npm install

   4. Start the development server:
      npm start (was built using pure react)

      The application will now be running at 'http://localhost:3000'
  
      # Using The Application
      1. After starting the app using npm start, the landing page is the login form of which you must enter in your account details to gain access into the app, if you don't have an account, there is a link at the top of the login page which when clicked will lead you to the signup page, there you will cretae an account in order to be able to gain access into the application.
     
      2. ##To obtain access_token,
        
          Make a HTTP POST Request to http://172.93.51.119:9090/api/v1/auth/login
         
```json
{
"username": "angelgee",
"password": "1234567890"
}
```



**The HTTP POST Response will be**
	
Response body

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBbmdlbEdlZSIsIm9yZ2FuaXphdGlvbklkIjoxLCJpYXQiOjE3NjQ5MjMyNzksImV4cCI6MTc2NTc4NzI3OX0.VHFWqEIBMqINmPKZGTw9JT-BdddebfsDEpeg1rNtdyA",
  "username": "AngelGee",
  "organizationId": 1,
  "roles": [
    "ROLE_ADMIN"
  ]
}
```

	  #####The accessToken from the HTTP post response in the payload will be used to access transactions such as sales, expense, add customer and search customer in the app

## To POST an income

make a HTTP POST request to http://172.93.51.119:9090/api/v1/income

```json
{
  "customerId": 10,
  "noOfKg": 23,
  "grade": "2",
  "pricePerKg": 34,
  "category": "SALES"
}
```

**The HTTP response will be**

```json
{
  "id": 10,
  "createdAt": "2025-12-05T09:02:44.5185",
  "customerName": "Hajarah Abdullahi",
  "kg": 23,
  "pricePerKg": 34,
  "grade": "2",
  "category": "SALES",
  "amount": 782
}
```

## To Post A Customer

Make a HTTP POST request to http://172.93.51.119:9090/api/v1/customers

```json
{
  "name": "Hannah G Anthony",
  "email": "hanny@gmail.com",
  "customerType": "INDIVIDUAL",
  "phoneNumber": "08120465769"
}
```

**The HTTP response will be**

```json
{
  "id": 17,
  "name": "Hannah G Anthony",
  "email": "hanny@gmail.com",
  "customerType": "INDIVIDUAL",
  "phoneNumber": "08120465769"
}
```

## To Post an Expenditure

Send a HTTP POST request to http://172.93.51.119:9090/api/v1/expenditures

```json
{
  "amount": 12,
  "supplierId": 1,
  "employeeId": 1,
  "category": "UTILITIES",
  "quantity": 23,
  "unitPrice": 4,
  "description": "UTILITIES"
}
```

**The HTTP response will be**

```json
{
  "id": 4,
  "quantity": 23,
  "unitPrice": 4,
  "amount": 92,
  "description": "UTILITIES",
  "createdAt": "2025-12-05T09:16:29.050966",
  "supplierName": "Manasseh Elias Anche",
  "category": "UTILITIES"
}
```

## Key Features

      * **Income Management** Record and paginate sales records (e.g., sales per kg).
      * **Expense tracking:** Log operational costs.
      * **Customer CRM:** Search and manage customer contact details.
      * **Modern UI:** Responsive, clean interface utilizing the Tailwind pagination design.

## Screenshots

<img width="1366" height="768" alt="Login" src="https://github.com/user-attachments/assets/0eff63a7-739d-4094-a40a-8a58ab07dba7" />
Login page where you enter password and user name if you have an account

<img width="1366" height="768" alt="Signup page 1" src="https://github.com/user-attachments/assets/f6344f96-851a-4b49-807f-da2f08149303" />

<img width="1366" height="768" alt="Signup page 2" src="https://github.com/user-attachments/assets/2e9c0f7d-4900-4f81-8eab-adce3ed67fe4" />

Two screenshots above are th signup form, incase you don't have an account and you need to create one in order to be able to access the app

<img width="1366" height="768" alt="Dashboard" src="https://github.com/user-attachments/assets/bd0ff938-b3ce-4306-86fe-47d163df547f" />
Dashboard(Landing page)

<img width="1366" height="768" alt="Customer page" src="https://github.com/user-attachments/assets/14f03170-2b53-4161-b7b1-c174e6db6a35" />
Customer management page

<img width="1366" height="768" alt="Customer management page 2" src="https://github.com/user-attachments/assets/6adc1316-621a-439d-b872-02ea843a7a6c" />
Customer page 2

<img width="1366" height="768" alt="Income" src="https://github.com/user-attachments/assets/9a5009f4-3352-4524-a09f-a5164f914e60" />
Sales/Income page

<img width="1366" height="768" alt="Expense page" src="https://github.com/user-attachments/assets/5a6b3ac2-7f6b-42d5-b35b-7d571e759884" />
Expense page

<img width="1366" height="768" alt="Expense upload" src="https://github.com/user-attachments/assets/31231d5e-c8ae-4815-a068-6fa2f048418a" />
Expense file upload

<img width="1366" height="768" alt="Income upload" src="https://github.com/user-attachments/assets/6dfdcf7d-a03d-4932-a64e-63f71e100a65" />
Income file upload





   
