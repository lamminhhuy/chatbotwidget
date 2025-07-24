Project: Chatbot Widget with RAG.

Main features: A chatbot with RAG using the Google Gemini API and Atlas Vector Search.

Requirements

Before running the project, ensure you have installed:
Nodejs,
Yarn,
Docker,
Docker Compose

Running the frontend
using: yarn dev

Running the backend
1. Add Google Gemini API Key
You need a Google Gemini API Key to use the service. Follow these steps:
Create a .env file in the project's root directory and add the API Key:
GOOGLE_GEMINI_API_KEY=your_api_key_here
2. Build Docker Compose
Run the following command to build the container:
docker compose build
3. Start the Project
After building, run the project using:
docker compose up


License

This project is released under the MIT license.

