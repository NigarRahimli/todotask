# Todo App

This is a full-stack Todo application built using React for the frontend and a Node.js server with Sequelize for the backend.

## Prerequisites

- Docker (for running the server)
- Node.js and npm (for running the frontend)

## Getting Started

### Server

1. **Navigate to the server directory:**
    ```sh
    cd todo-server
    ```

2. **Build the server using Docker Compose:**
    ```sh
    docker compose build
    ```

3. **Run the server using Docker Compose:**
    ```sh
    docker compose up
    ```

### Client (Frontend)

1. **Navigate to the client directory:**
    ```sh
    cd todo-client
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the frontend server:**
    ```sh
    npm start
    ```

    - If prompted to change the port because the server is already running on port 3000, type `yes`.

## Usage

Once both the server and client are running, you can access the application in your web browser at `http://localhost:3000` (or the port you set).

You are all set and ready to use the Todo App!

## Contributing

If you wish to contribute, please fork the repository and make pull requests.

