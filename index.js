require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = 3001;

const app = express();

const corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json({ extended: true }));

const getGenreCode = (reqGenres) => {
	let genreList = '';
	console.log('test');
	console.log(reqGenres);

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
	if (genreList.length > 0) {
		genreList = genreList.slice(0, -1);
	}
	return genreList;
};

app.post('/', (req, res) => {
	console.log(req.body);
	const provider = req.body.provider;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;
	// const rating = req.body.rating;
	const genres = getGenreCode(req.body.genre);
});

app.listen(PORT, () => {
	console.log('App listening on port: ' + PORT);
});
