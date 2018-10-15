// secrets.js

// Get environment variables
import keys from './config';

// Define secrets
const secrets = {
  dbUri: keys.DB_URI,
};

// Export secrets
export const getSecret = key => secrets[key];
