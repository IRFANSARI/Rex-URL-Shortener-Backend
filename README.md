# Rex-URL Shortener API

## Introduction

Rex-URL is a simple and efficient URL shortening API built with Node.js and Express. This application allows users to create short links for long URLs, making it easier to share and manage web addresses. Each short URL is unique and can be accessed easily.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas for database hosting

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
   
4. **Set Up Environment Variables**

   Create a .env file in the root directory of the project and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority
   BASE_URL=<If using on local machine, use http://127.0.0.1:8080/>
   PORT=8080
   ```
   
6. **Start the Server**
   ```
   npm start
   ```
   The API will run on `http://127.0.0.1:8080`.

## Usage

### API Endpoints

- **Get All Links**
  
  **GET** `/links`
  
- **Create a Short URL**
  
  **POST** `/links`
  
  Request Body:
  ```
  {
      "url": "https://example.com/your-long-url"
  }
  ```

- **Get Link by Short URL or Long URL**
  
  **GET** `/links/:url`
  
  Replace `:url` with the short or long URL.

- **Delete a Link**
  
  **DELETE** `/links`
  
  Request Body:
  ```
  {
      "url": "https://short.url/abc123"
  }
  ```

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to submit a pull request.
