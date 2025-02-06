const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // MySQL host
  user: 'root', // MySQL username
  password: '', // MySQL password
  database: 'organic', // Your database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// User Registration API
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const query = 'INSERT INTO users (name, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send('Error saving user to database');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send('Internal server error');
  }
});

// Update a record in the `checkout` table
app.put('/api/checkout/:Product', (req, res) => {
  const { Product } = req.params;
  const { Price, Quantity, Discount, Total } = req.body;

  const sql = `
      UPDATE checkout 
      SET Price = ?, Quantity = ?, Discount = ?, Total = ?
      WHERE Product = ?
  `;
  const values = [Price, Quantity, Discount, Total, Product];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error updating data:', err);
          return res.status(500).send('Failed to update record.');
      }
      if (result.affectedRows === 0) {
          return res.status(404).send('Record not found.');
      }
      res.status(200).send('Record updated successfully.');
  });
});

// Delete a record from the `checkout` table
app.delete('/api/checkout/:Product', (req, res) => {
  const { Product } = req.params;

  const sql = 'DELETE FROM checkout WHERE Product = ?';

  db.query(sql, [Product], (err, result) => {
      if (err) {
          console.error('Error deleting data:', err);
          return res.status(500).send('Failed to delete record.');
      }
      if (result.affectedRows === 0) {
          return res.status(404).send('Record not found.');
      }
      res.status(200).send('Record deleted successfully.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
