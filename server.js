const express = require('express');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new Discord client
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordClient.once('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}`);
});

discordClient.login('YOUR_DISCORD_BOT_TOKEN_HERE'); // Insert your bot token here

// Route for the /apply form page
app.get('/apply', (req, res) => {
    // Sending a simple form for the application
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Apply</title></head>
    <body>
    <h1>Application Form</h1>
    <form action="/submit-application" method="POST">
        <input type="text" name="username" placeholder="Your Discord username" required />
        <button type="submit">Submit</button>
    </form>
    </body>
    </html>`);
});

// Route for submitting application
app.post('/submit-application', (req, res) => {
    const { username } = req.body;

    // Create an embed message
    const embed = { /* Embed details here */};

    // Send embed message to Discord channel
    discordClient.channels.cache.get('YOUR_CHANNEL_ID_HERE').send({ embeds: [embed] })
        .then(() => {
            res.send('Application submitted successfully!');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Failed to send application. Please try again later.');
        });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
