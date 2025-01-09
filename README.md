# Collabrative code editor

A real-time Collabrative code editor application built using **React**, **Socket.io**, **Node.js**, and **Express**, with a focus on seamless communication and user-friendly design.

---

## Features

- **Real-Time Communication**: Send and receive messages instantly using WebSockets.
- **User Authentication**: Secure user authentication and session handling.
- **Message History**: Persistent message storage for chat history.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used

### **Frontend**

- **React**: UI development.
- **React Icons**: For modern icons.
- **Socket.io-Client**: Real-time communication.
- **UUID**: For generating unique message IDs.

### **Backend**

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **Socket.io**: Real-time event-based communication.
- **MongoDB**: Database for storing messages and user data.

---

## Getting Started

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### **2. Install Dependencies**

#### Navigate to the backend directory:

```bash
cd server
npm install
```

#### Navigate to the frontend directory:

```bash
cd client
npm install
```

### **3. Environment Variables**

#### Backend `.env` file:

Create a `.env` file in the `server` directory with the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your-secret-key
```

#### Frontend `.env` file:

Create a `.env` file in the `client` directory with the following:

```env
REACT_APP_SOCKET_URL=http://localhost:5000
```

### **4. Run the Project**

#### Start the backend server:

```bash
cd server
npm start
```

#### Start the frontend server:

```bash
cd client
npm start
```

---

## Folder Structure

### **Backend**

```
server/
├── controllers/
│   ├── authController.js
│   └── chatController.js
├── models/
│   ├── User.js
│   └── Message.js
├── routes/
│   ├── authRoutes.js
│   └── chatRoutes.js
├── server.js
└── .env
```

### **Frontend**

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatInput.js
│   │   └── ChatMessages.js
│   ├── context/
│   │   ├── AppContext.js
│   │   ├── ChatContext.js
│   │   └── SocketContext.js
│   ├── utils/
│   │   └── formatDate.js
│   ├── App.js
│   ├── index.js
│   └── .env
```

---

## APIs

### **Base URL**: `http://localhost:5000/api`

#### \*\*1. GET \*\*\`\`

- Fetch all chat messages.
- **Response**:
  ```json
  [
      {
          "id": "uuid",
          "message": "Hello, world!",
          "username": "JohnDoe",
          "timestamp": "2025-01-09T12:00:00Z"
      }
  ]
  ```

#### \*\*2. POST \*\*\`\`

- Send a new message.

- **Request Body**:

  ```json
  {
      "message": "Hello, world!",
      "username": "JohnDoe"
  }
  ```

- **Response**:

  ```json
  {
      "success": true,
      "message": "Message sent successfully!"
  }
  ```

---

## Scripts

### **Frontend**

- `npm start`: Starts the React development server.
- `npm run build`: Builds the app for production.

### **Backend**

- `npm start`: Starts the Node.js server.
- `npm run dev`: Starts the server in development mode using Nodemon.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m "Added a new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **React Icons** for icons.
- **Socket.io** for real-time communication.
- **MongoDB** for database management.

---

## Author

**Aviraj Bhaliya**\
[GitHub Profile](https://github.com/Aviraj0714)

```
https://github.com/Aviraj0714/CodeQuad.git
```
