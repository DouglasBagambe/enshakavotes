const { Pool } = require('pg');

// Create a new pool instance for connecting to the Neon database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Your Neon database connection string
    ssl: {
        rejectUnauthorized: false, // Change this based on your security needs
    },
});

// Function to save vote data to the database
const saveVote = async (voteData) => {
    const { choice1, choice2, choice3, choice4, choice5 } = voteData;

    const query = `
        INSERT INTO votes (choice1, choice2, choice3, choice4, choice5) 
        VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [choice1, choice2, choice3, choice4, choice5];

    await pool.query(query, values);
};

module.exports = { saveVote };
