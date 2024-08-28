const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8181;


// Middleware
app.use(express.json());
// app.use(cors());

// My additions ->
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','email'],
    credentials: true
}));

// Handle OPTIONS requests globally for all routes
app.options('*', cors());
// <- end of additions

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

  // Start the server
app.listen(PORT, () => {
console.log(`Server is running on port http://localhost:${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const connectToMongo = require('./db');
// const app = express();
// const path = require('path');
// const PORT = process.env.PORT || 8181;

// // Set view engine
// app.set('view engine', 'ejs');

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// // Middleware
// app.use(express.json());

// // CORS Configuration
// app.use(cors({
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization','email'],
//     credentials: true
// }));

// // Handle OPTIONS requests globally for all routes
// app.options('*', cors());

// // Connect to MongoDB
// connectToMongo();

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// // Default route
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port http://localhost:${PORT}`);
// });