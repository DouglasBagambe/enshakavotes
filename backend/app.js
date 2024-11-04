const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');  // Import the database setup
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the voting form
app.get('/vote', (req, res) => {
    const token = req.query.token;
    db.get("SELECT * FROM members WHERE token = ? AND hasVoted = 0", [token], (err, member) => {
        if (member) {
            res.sendFile(path.join(__dirname, 'public', 'vote.html'));
        } else {
            res.send('Invalid or expired voting link.');
        }
    });
});

// Handle form submission
app.post('/submitVote', (req, res) => {
    const { token, choice1, choice2, choice3, choice4, choice5 } = req.body;

    db.run("UPDATE members SET hasVoted = 1 WHERE token = ?", [token], (err) => {
        if (!err) {
            // Save votes for each position in a table
            db.run("INSERT INTO votes (token, choice1, choice2, choice3, choice4, choice5) VALUES (?, ?, ?, ?, ?, ?)",
                   [token, choice1, choice2, choice3, choice4, choice5], (err) => {
                if (!err) {
                    res.send("Thank you for voting!");
                } else {
                    res.send("Error saving vote.");
                }
            });
        } else {
            res.send("Invalid or expired token.");
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
