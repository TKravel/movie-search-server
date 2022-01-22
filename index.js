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

app.get('/', (req, res) => {
	res.send('Hello world');
});

//  node-fetch error handling
function checkStatus(res) {
	if (res.ok) {
		// res.status >= 200 && res.status < 300
		return res;
	} else {
		throw Error(res.statusText);
	}
}

app.post(`/search`, (req, res) => {
	const provider = req.body.provider;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;
	const genre = utils.getGenreCode(req.body.genre);
	const sort = req.body.sort;
	const page = req.body.page;

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
		.then(checkStatus)
		.then((response) => response.json())
		.then((data) => {
			if (data.statusText) {
				console.log(data.statusText);
			}
			let results = utils.genreLangCodeToStrings(data.results);

			res.json({ docs: results, count: data.total_pages });
		})
		.catch((err) => {
			console.log(err.message);
			res.json({ err: err.message });
		});
});

app.listen(PORT, () => {
	console.log('App listening on port: ' + PORT);
});
