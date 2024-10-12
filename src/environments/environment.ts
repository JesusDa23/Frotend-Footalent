export const environment = {
    production: false,
    apiUrl: process.env["NODE_ENV"] == 'production' ? 'https://backend-footalent.onrender.com/api/v1' : 'http://localhost:3000/api/v1', // Adjust the API URL as needed
    // Add other development environment variables here
};
