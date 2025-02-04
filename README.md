Chatbot Widget with RAG.

This project uses the Google Gemini API and Docker Compose for easy setup and execution.

Requirements

Before running the project, ensure you have installed:

Docker

Docker Compose

Running the Project

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


If you want to contribute to the project, please create a Pull Request or open an Issue on GitHub.

License

This project is released under the MIT license.

