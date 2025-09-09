# Fin_chatbot
Financial Chatbot
Project Overview
This is a full-stack financial chatbot application. The project is divided into a frontend built with React and Vite and a backend powered by a Node.js Express server. The backend is designed to handle API calls, including interactions with Google's Gemini API, to provide insightful and conversational responses related to financial queries.

Features
Interactive Chat Interface: A user-friendly interface for chatting with the AI.

Real-time Responses: The backend processes user queries and sends back responses in real-time.

Financial Insights: The chatbot leverages a large language model to provide information and analysis on financial topics.

Markdown Support: Chat messages and responses can include rich text formatting via Markdown.

Technologies Used
Frontend

- React: A JavaScript library for building user interfaces.

- Vite: A modern build tool that provides a fast development server and optimized builds.

- Tailwind CSS: A utility-first CSS framework for styling the user interface.

- React Markdown: A component for rendering Markdown content.

Backend

- Node.js & Express: A powerful and flexible framework for building the server.

- @google/genai & Langchain: Libraries for integrating with Google's Gemini API and building AI applications.

- CORS: Middleware to enable cross-origin requests from the frontend.

- Nodemon: A tool that automatically restarts the server during development.

Setup & Installation
Prerequisites

1. Node.js (v18 or higher)

1. npm

** Backend Setup **

Navigate to the backend directory.
```bash
cd backend
```
Install the dependencies.
```bash
npm install
```
Start the development server.
```bash
npm run start
```
** Frontend Setup **

Navigate to the fin_chatbot directory.
```bash
cd fin_chatbot
```
Install the dependencies.
```bash
npm install
```
Start the development server.
```bash
npm run dev
```
** Roadmap **

- [ ] Integrate a vector store to implement Retrieval-Augmented Generation (RAG) for grounding financial product information.
- [ ] Store chat history in a database for persistent conversations.
- [ ] Integrate conversation history to provide contextual and coherent responses.

** Usage **
Once both the frontend and backend servers are running, open your web browser and navigate to http://localhost:5173 to access the chat application.
