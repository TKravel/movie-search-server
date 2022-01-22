require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const fetch = require('node-fetch');

const utils = require('./utils');

const app = express();

const corsOptions = {
	origin: process.env.CLIENT_URL,
	methods: 'POST',
	allowedHeaders: ['Content-Type'],
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ extended: true }));

const getGenreCode = (genre) => {
	let genreList = '';

	switch (genre) {
		case 'all':
			genreList = '';
			break;
		case 'action':
			genreList = '28';
			break;
		case 'comedy':
			genreList = '35';
			break;
		case 'drama':
			genreList = '18';
			break;
		case 'fantasy':
			genreList = '14';
			break;
		case 'horror':
			genreList = '27';
			break;
		case 'mystery':
			genreList = '9648';
			break;
		case 'romance':
			genreList = '10749';
			break;
		case 'thriller':
			genreList = '53';
			break;
		case 'western':
			genreList = '37';
			break;

		default:
			break;
	}

	return genreList;
};

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.post(`/search`, (req, res) => {
	const provider = req.body.provider;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;
	const genre = getGenreCode(req.body.genre);
	const sort = req.body.sort;
	const page = req.body.page;

	console.log(req.body);
	fetch(
		`https://streaming-availability.p.rapidapi.com/search/pro?country=us&service=${provider}&type=movie&order_by=${sort}&year_min=${startDate}&year_max=${endDate}&genre=${genre}&page=${page}&desc=true&output_language=en&language=en`,
		{
			method: 'GET',
			headers: {
				'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
				'x-rapidapi-key': process.env.API_KEY,
				'content-type': 'application/json',
			},
		}
	)
		.then((response) => response.json())
		.then((data) => {
			let results = utils.genreCodeToString(data.results);

			res.json({ docs: results, count: data.total_pages });
		});
});

app.listen(PORT, () => {
	console.log('App listening on port: ' + PORT);
});
