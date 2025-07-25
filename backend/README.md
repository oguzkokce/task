# Backend Server

This directory contains the Express API server.

## Requirements

- Node.js (v14 or newer)
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in this directory and provide the following environment variables:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   PORT=5000
   JWT_SECRET=<your-secret-key>
   ```
   - `MONGO_URI` is the MongoDB connection string.
   - `PORT` sets the HTTP port (defaults to `5000` if not specified).
   - `JWT_SECRET` is used for signing JSON Web Tokens.

## Running the Server

- Development mode with automatic reloads:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

The API will be available at `http://localhost:<PORT>` when the server is running.
