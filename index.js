require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const fetch = require('node-fetch');

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

const getGenreCode = (reqGenres) => {
	let genreList = '';

	for (const genre in reqGenres) {
		if (reqGenres[genre]) {
			switch (genre) {
				case 'action':
					genreList += '28,';
					break;
				case 'comedy':
					genreList += '35,';
					break;
				case 'drama':
					genreList += '18,';
					break;
				case 'fantasy':
					genreList += '14,';
					break;
				case 'horror':
					genreList += '27,';
					break;
				case 'mystery':
					genreList += '9648,';
					break;
				case 'romance':
					genreList += '10749,';
					break;
				case 'thriller':
					genreList += '53,';
					break;
				case 'western':
					genreList += '37,';
					break;

				default:
					break;
			}
		}
	}
	if (genreList.length > 1) {
		genreList = genreList.slice(0, -1);
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
	const genres = getGenreCode(req.body.genre);
	const sort = req.body.sort;
	const page = req.body.page;

	console.log(req.body);
	fetch(
		`https://streaming-availability.p.rapidapi.com/search/pro?country=us&service=${provider}&type=movie&order_by=${sort}&year_min=${startDate}&year_max=${endDate}&genre=${genres}&page=${page}&desc=true&output_language=en&language=en`,
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
			res.json({ docs: data.results, count: data.total_pages });
		});
});

app.listen(PORT, () => {
	console.log('App listening on port: ' + PORT);
});
