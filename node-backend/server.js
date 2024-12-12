const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/analyze', async (req, res) => {
    const { word } = req.body;

    try {
        const response = await axios.post('http://localhost:5000/analyze', { word });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze sentiment' });
    }
});

app.listen(3000, () => console.log('Node.js server running on port 3000'));
