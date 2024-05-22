# STOCKIFY
A basic website that shows daily market values for various stocks. Users can search for stocks, view daily OHLCV[^1] data, and add them to a list to follow.

[^1]: OHLCV stands for Open, High, Low, Close, and Volume

## Notes
Due to the limited nature of the Free API key from Alpha Vantage, API requests are limited to 25 per day. It is strongly suggested to sign up for a new free API key due API request limits at the link [here](https://www.alphavantage.co/support/#api-key) and replace the key located on the first line of [server.js](server/server.js). Signup requires an email (fake or real) and something to fill the origanization field.
- API limits appear to also be tied to IP addresses as well

## Features
- Look up various stocks
- Add stocks to a list for easy tracking and following
- View historical daily OHLCV data for stocks that are updated daily

## Setup
- Clone the Github repository or download the repo through the website
- Have `node` and `npm` installed and setup
- Run `npm i`  inside the root project folder to initialize and install all node modules
- Run `npm start` inside the root project folder to start the application
- The web app should be accessible from `http://localhost:3000` in a browser
    - The backend can be tested by accessing `http://localhost:5000` in a browser

## Technical Overview
The frontend is built on ReactJS with primarily
- [Material UI](https://mui.com/material-ui/) library for the theme and styling
    - Page was built using the [Dashboard](https://github.com/mui/material-ui/tree/v5.15.18/docs/data/material/getting-started/templates/dashboard) template from MUI
- [Highcharts](https://www.highcharts.com/) library for generating and displaying interactive charts
    - Charts were generated using example code found [here](https://codesandbox.io/p/sandbox/moxp4310l8)

The backend is built on ExpressJS with primarily
- [Alpha Vantage](https://www.alphavantage.co/) API integration for obtaining realtime and historical stock market data

User data (such as the following list) is stored in the form of cookies in the browser for data persistency.
