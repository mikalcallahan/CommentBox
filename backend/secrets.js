// secrets.js

// Get environment variables
require('dotenv').config();

// Define secrets
const secrets = {
  dbUri: process.env.DB_URI,
};

// Export secrets
export const getSecret = key => console.log('secrets:' + secrets['dbUri']);
