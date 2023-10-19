// class 가져오기
const header = document.querySelector(".header");
const search_area = document.querySelector(".search_area");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
const movieCardList = document.querySelector(".movieCardList");
const movieCard = document.querySelector(".movieCard");
const movieImage = document.querySelector(".movieImage");
const searchWord = searchInput.value.toLowerCase();



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




// fetchThen 함수
function fetchThen(data) {
	// HTML 초기세팅
	let _results = data['results'];
	movieCardList.innerHTML = "";

	// 영화 정보 보여주기
	_results.forEach(item => {
		let _id = item["id"];
		let _overview = item["overview"];
		let _title = item["title"];
		let _poster_path = item["poster_path"];
		let _vote_average = item["vote_average"];

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

	// 영화 카드 클릭 시 ID 띄우기
	const movieCards = document.querySelectorAll(".movieCard");
	movieCards.forEach(card => {
		card.addEventListener("click", function () {
			let movieCardId = this.getAttribute("data-id");
			alert(`영화 ID : ${movieCardId}`);
		})
	})

	function search(event) {
		event.preventDefault();
		const searchWord = searchInput.value.toLowerCase();
		searchInput.value = "";

		// tset
		console.log(searchWord);

		// 데이터를 배열로 가져오고 title을 소문자로 변환
		let title_list = _results.map((item) => {
			return item.title.toLowerCase();
		})

		// 인풋값(searchWord)과 소문자로 변환한 값(title_list)을 비교 ,filter
		let find_title = title_list.filter((item) => {
			return item.includes(searchWord);
		})

		// 전체 title에서 title 인덱스번호 찾기
		let find_index = [];

		for (let i in find_title) {
			let idx = title_list.findIndex((item) => {
				return item === find_title[i];
			});
			find_index.push(idx);
		}

		// 값이 없으면 -> alert 
		if (find_index.length === 0) {
			alert("검색 결과가 없습니다.");
			// 값이 있으면 -> 전체 데이터에서 일치한 데이터 뽑아와서 리스트 만들기
		} else {
			const match_movie = [];
			for (let a of find_index) {
				const movies = _results[a];
				match_movie.push(movies);
			}
			movieCardList.innerHTML = "";
			// alert("검색 결과 있음");
			// 채워넣기
			match_movie.forEach((result) => {
				const title = result['title'];
				const overview = result['overview'];
				const posterPath = result['poster_path'];
				const voteAverage = result['vote_average'];
				const id = result['id'];

				const temp_html = `
			<div data-id="${id} "class="movieCard">
				<div class="movieImage">
					<img src="${IMAGE_BASE_URL}${posterPath}"/>
				</div>
				<div class="movieName">
					<h3>${title}</h3>
				</div>
				<div class="movieExplanation">
					<p>${overview}</p>
				</div>
				<div class="movieGrade">
					<p>Rating: ${voteAverage}</p>
				</div>
			</div>`;

				movieCardList.insertAdjacentHTML('beforeend', temp_html);
			});
		};
	};
	// 검색 기능
	search_area.addEventListener("submit", search);
}


// 검색 기능 함수
let search = event => {
	event.preventDefault();
	const searchWord = searchInput.value.toLowerCase();
	searchInput.value = "";

	// tset
	console.log(searchWord);
}



// run
fetch(API_URL, options)
	.then(response => response.json())
	// .then(response => console.log(response))
	.then(data => fetchThen(data))
	.catch(err => console.error(err));



