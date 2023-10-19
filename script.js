// id 가져오기
const header = document.querySelector(".header");
const search_area = document.querySelector(".search_area");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn")



// test
header.innerHTML = "영화 검색 사이트 만들기";



// TMDB API
const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTU2NGFmZjVjMmQ2NTg5NjIzYmYwNTU3OWZkYTg3NCIsInN1YiI6IjY1MmYyOTYwZWE4NGM3MDEwYzFkYzYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tllRINCGQK3ug_vl1CgEERHfUuoXmbgBZ8X-3hswvEE'
	}
};
const API_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

fetch(API_URL, options)
	.then(response => response.json())
	// .then(response => console.log(response))
	.then(data => {
		let _results = data['results'];
		const movieCardList = document.querySelector(".movieCardList")
		movieCardList.innerHTML = "";

		_results.forEach((i) => {
			let _id = i["id"];
			let _overview = i["overview"];
			let _title = i["title"];
			let _poster_path = i["poster_path"];
			let _vote_average = i["vote_average"];

			let temp_html = `
            <div data-id="${_id} "class="movieCard">
				<div class="movieImage">
                	<img src="${IMAGE_BASE_URL}${_poster_path}"/>
				</div>
				<div class="movieName">
                	<h3>${_title}</h3>
				</div>
				<div class="movieExplanation">
					<p>${_overview}</p>
				</div>
				<div class="movieGrade">
                	<p>Rating: ${_vote_average}</p>
				</div>
            </div>`;
			
			movieCardList.insertAdjacentHTML("beforeend", temp_html);
		})
	})
	.catch(err => console.error(err));



