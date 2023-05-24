const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// Create an instance of Express
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'sqlusername',
  password: 'sqlpassword',
  database: 'dbname',
});

// Example route for login
app.post('/api/login', (req, res) => {
  // Retrieve username and password from the request body
  const { email, password } = req.body;

        if (email === 'johndoe@example.com' && password === 'password') {
            res.json({ message: 'Login successful' });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
});

// Start the server and listen on a specific port
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Enable CORS
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

