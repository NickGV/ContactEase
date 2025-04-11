# ContactEase

ContactEase is a web application for managing your contacts easily with advanced real-time communication and chat features.

## Visit the page here: [Page](https://contactease-nickgv.netlify.app/)

## Key Features

- **Contact Management**

  - Add, edit, and delete contacts
  - Mark contacts as favorites
  - Search contacts by name, email, or phone number
  - Intuitive organization of contact lists

- **Real-Time Chat**

  - Real-time conversations with your contacts
  - New message notifications
  - Persistent chat history
  - Individual chat deletion

- **User System**
  - User registration and authentication
  - Customizable user profiles
  - Security through JWT (JSON Web Tokens)

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces
- **TailwindCSS**: CSS framework for responsive design
- **Sonner**: Library for displaying toast notifications
- **FontAwesome**: Icon library
- **Socket.io-client**: Client for real-time communication

### Backend

- **Node.js**: Server-side JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing information
- **Mongoose**: ODM for MongoDB
- **Socket.io**: Library for real-time communication
- **JWT**: For authentication and authorization

## Getting Started

To start using ContactEase, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. Clone this repository to your local machine.
2. Set up environment variables:

   - Create a `.env` file in the `Server` folder with:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=3000
     ```
   - Create a `.env` file in the `Client` folder with:
     ```
     VITE_API_URL=http://localhost:3000/api
     ```

3. Install dependencies:

   ```
   # For the server
   cd Server
   npm install

   # For the client
   cd Client
   npm install
   ```

4. Start the server:

   ```
   # In the Server folder
   npm start
   ```

5. Start the client:

   ```
   # In the Client folder
   npm run dev
   ```

6. Access the application in your web browser at `http://localhost:5173`.

## Responsive Features

ContactEase is designed to work perfectly on all devices:

- Optimized mobile design for a touch-friendly experience
- Adaptation to tablets and medium-sized devices
- Complete desktop experience with dual view of contacts and chat

## License

This project is licensed under the [MIT License](LICENSE).
