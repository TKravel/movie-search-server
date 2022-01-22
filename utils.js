// Code list for genres

// "1":"Biography"
// "2":"Film Noir"
// "3":"Game Show"
// "4":"Musical"
// "5":"Sport"
// "6":"Short"
// "7":"Adult"
// "12":"Adventure"
// "14":"Fantasy"
// "16":"Animation"
// "18":"Drama"
// "27":"Horror"
// "28":"Action"
// "35":"Comedy"
// "36":"History"
// "37":"Western"
// "53":"Thriller"
// "80":"Crime"
// "99":"Documentary"
// "878":"Science Fiction"
// "9648":"Mystery"
// "10402":"Music"
// "10749":"Romance"
// "10751":"Family"
// "10752":"War"
// "10763":"News"
// "10764":"Reality"
// "10767":"Talk Show"

module.exports.genreLangCodeToStrings = (arr) => {
	let movieResults = arr;
	movieResults.forEach((movie) => {
		// update language from code while altering obj
		const languageNames = new Intl.DisplayNames(['en'], {
			type: 'language',
		});
		const language = languageNames.of(movie.originalLanguage);
		movie.originalLanguage = language;
		// update genre property to full string from genre code
		let genreStringsArr = [];

		movie.genres.forEach((genreCode) => {
			switch (genreCode) {
				case 1:
					genreStringsArr.push('Biography');
					break;
				case 2:
					genreStringsArr.push('Film Noir');
					break;
				case 3:
					genreStringsArr.push('Game Show');
					break;
				case 4:
					genreStringsArr.push('Musical');
					break;
				case 5:
					genreStringsArr.push('Sport');
					break;
				case 6:
					genreStringsArr.push('Short');
					break;
				case 7:
					genreStringsArr.push('Adult');
					break;
				case 12:
					genreStringsArr.push('Adventure');
					break;
				case 14:
					genreStringsArr.push('Fantasy');
					break;
				case 16:
					genreStringsArr.push('Animation');
					break;
				case 18:
					genreStringsArr.push('Drama');
					break;
				case 27:
					genreStringsArr.push('Horror');
					break;
				case 28:
					genreStringsArr.push('Action');
					break;
				case 35:
					genreStringsArr.push('Comedy');
					break;
				case 36:
					genreStringsArr.push('History');
					break;
				case 37:
					genreStringsArr.push('Western');
					break;
				case 53:
					genreStringsArr.push('Thriller');
					break;
				case 80:
					genreStringsArr.push('Crime');
					break;
				case 99:
					genreStringsArr.push('Documentary');
					break;
				case 878:
					genreStringsArr.push('Science Fiction');
					break;
				case 9648:
					genreStringsArr.push('Mystery');
					break;
				case 10402:
					genreStringsArr.push('Music');
					break;
				case 10749:
					genreStringsArr.push('Romance');
					break;
				case 10751:
					genreStringsArr.push('Family');
					break;
				case 10752:
					genreStringsArr.push('War');
					break;
				case 10763:
					genreStringsArr.push('News');
					break;
				case 10764:
					genreStringsArr.push('Reality');
					break;
				case 10767:
					genreStringsArr.push('Talk Show');
					break;

				default:
					break;
			}
		});
		movie.genres = genreStringsArr;
	});
	return movieResults;
};

module.exports.getGenreCode = (genre) => {
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
