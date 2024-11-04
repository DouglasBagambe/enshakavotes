const express = require('express');
const router = express.Router();
const { saveVote } = require('../database'); // Import the saveVote function

router.post('/', async (req, res) => {
    try {
        // Extract vote data from the request body
        const voteData = {
            choice1: req.body.choice1,
            choice2: req.body.choice2,
            choice3: req.body.choice3,
            choice4: req.body.choice4,
            choice5: req.body.choice5,
        };

        // Save the vote data to the database
        await saveVote(voteData);

        // Send success response
        res.status(200).send('Vote submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while submitting your vote.');
    }
});

module.exports = router;
