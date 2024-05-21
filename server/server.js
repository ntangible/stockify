const API_KEY = 'QQEZZ46FVTG79LH6';

const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('ExpressJS Server Response: OK');
})

// pull demo data for testing
app.get('/api/daily/demo', async (req, res) => {
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo';

    try {
        const response = await axios.get(url);
        const data = response.data['Time Series (Daily)'];
        const metaData = response.data['Meta Data'];
        const formattedData = Object.keys(data).map(date => {
            const entry = data[date];
            return [
                new Date(date).getTime(),
                parseFloat(entry['1. open']),
                parseFloat(entry['2. high']),
                parseFloat(entry['3. low']),
                parseFloat(entry['4. close']),
                parseInt(entry['5. volume'], 10)
            ];
        }).reverse();

        const result = {
            metaData: metaData,
            stockData: formattedData
        };

        res.json(result);
    }
    catch (error) {
        res.status(500).json({error: 'Error fetching stock data'});
    }
})

app.get('/api/daily/:symbol/', async (req, res) => {
    const symbol = req.params.symbol;

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=${symbol}&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data['Time Series (Daily)'];
        const metaData = response.data['Meta Data'];
        const formattedData = Object.keys(data).map(date => {
            const entry = data[date];
            return [
                new Date(date).getTime(),
                parseFloat(entry['1. open']),
                parseFloat(entry['2. high']),
                parseFloat(entry['3. low']),
                parseFloat(entry['4. close']),
                parseInt(entry['5. volume'], 10)
            ];
        }).reverse();

        const result = {
            metaData: metaData,
            stockData: formattedData
        };

        res.json(result);
    }
    catch (error) {
        res.status(500).json({error: 'Error fetching stock data'});
    }
})

// pull demo data for testing
app.get('/api/search/demo', async (req, res) => {
    const url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo';

    try {
        const response = await axios.get(url);
        const data = response.data['bestMatches'];

        res.json(data);
    }
    catch (error) {
        res.status(500).json({error: 'Error searching'});
    }
})

app.get('/api/search/:name', async (req, res) => {
    const name = req.params.name;

    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data['bestMatches'];

        res.json(data);
    }
    catch (error) {
        res.status(500).json({error: 'Error searching'});
    }
})


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})