const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const voteRoutes = require('./routes/vote');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/submitVote', voteRoutes);

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('Voting API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
