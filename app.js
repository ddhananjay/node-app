const express = require('express');
const app = express();
const port = 3000;

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World! This is a simple Node.js app.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
