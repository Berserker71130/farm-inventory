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
3. Swagger API for making calls, POSTS, GET, PATCH and DELETE

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
         
         {
  "username": "angelgee",
  "password": "1234567890"
}

**The HTTP POST Response will be**
	
Response body

{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBbmdlbEdlZSIsIm9yZ2FuaXphdGlvbklkIjoxLCJpYXQiOjE3NjQ5MjMyNzksImV4cCI6MTc2NTc4NzI3OX0.VHFWqEIBMqINmPKZGTw9JT-BdddebfsDEpeg1rNtdyA",
  "username": "AngelGee",
  "organizationId": 1,
  "roles": [
    "ROLE_ADMIN"
  ]
}

	  #####The accessToken from the HTTP post response in the payload will be used to access transactions such as sales, expense, add customer and search customer in the app

## To POST an income

make a HTTP POST request to http://172.93.51.119:9090/api/v1/income

{
  "customerId": 10,
  "noOfKg": 23,
  "grade": "2",
  "pricePerKg": 34,
  "category": "SALES"
}

**The HTTP response will be**
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

## To Post A Customer

Make a HTTP POST request to http://172.93.51.119:9090/api/v1/customers

{
  "name": "Hannah G Anthony",
  "email": "hanny@gmail.com",
  "customerType": "INDIVIDUAL",
  "phoneNumber": "08120465769"
}

**The HTTP response will be**

{
  "id": 17,
  "name": "Hannah G Anthony",
  "email": "hanny@gmail.com",
  "customerType": "INDIVIDUAL",
  "phoneNumber": "08120465769"
}

      ## Key Features
      * **Income Management:** Record and paginate sales records (e.g., sales per kg).
      * **Expense tracking:** Log operational costs.
      * **Customer CRM:** Search and manage customer contact details.
      * **Modern UI:** Responsive, clean interface utilizing the Tailwind pagination design.
   
