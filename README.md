# Rex URL Shortener API

## Introduction

Rex-URL is a simple and efficient URL shortening API built with Node.js and Express. This application allows users to create short links for long URLs, making it easier to share and manage web addresses. Each short URL is unique and can be accessed easily.

## Technologies Used

- NodeJS
- ExpressJS
- MongoDB

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (Optional, You can use MongoDB Atlas for a cloud database)

### Steps

1. **Clone the Repository**

   ```
   git clone https://github.com/IRFANSARI/Rex-URL-Shortener-API.git
   cd Rex-URL-Shortener-API
   ```

2. **Install Dependencies**
   ```
   npm install
   ```
3. **Set Up Environment Variables**

   Create a .env file in the root directory of the project and add your MongoDB connection string:

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority
   BASE_URL=<If using on local machine, use http://127.0.0.1:8080/>
   PORT=8080
   ```

4. **Start the Server**
   ```
   npm start
   ```
   The API will run on `http://127.0.0.1:8080`.

## Usage

### API Endpoints

- **GET `/api/links`** - Returns JSON of all the links available in the database.
- **GET `/api/links?url=<shortURL>`** - Returns a link, that matches shortURL with url parameter.
- **POST `/api/links`** - Creates and returns a link, that is passed in request body.
  
  `Request Body`:
     ```
     { "url": "https://example.com/x1y2z3" }
     ```
- **DELETE `/api/links`** - Deletes a link, that is passed in request body.
  
  `Request Body`:
     ```
     { "url": "https://example.com/x1y2z3" }
     ```

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to submit a pull request.
