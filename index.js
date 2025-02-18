const apiKey = "8fa799d9ed64f37163d9d60cfa8dbdda";
const baseUrl = "https://api.themoviedb.org/3";
const language = "en-US";
const searchButton = document.getElementById("search-button");
const genreFilter = document.getElementById("genre-filter");
const sortBySelect = document.getElementById("sort-by");
const movieList = document.getElementById("movie-list");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Search Movies
searchButton.addEventListener("click", () => {
  const searchTerm = document.getElementById("search").value;
  const selectedGenre = genreFilter.value;
  const sortBy = sortBySelect.value;

  const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}&with_genres=${selectedGenre}&sort_by=${sortBy}&language=${language}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      movieList.innerHTML = "";
      data.results.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";

        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.alt = movie.title;

        movieImage.addEventListener("click", () => {
          openModal(movie.id);
        });

        movieCard.appendChild(movieImage);
        movieList.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
    });
});

// Open Modal with Movie Details
function openModal(movieId) {
  const modal = document.getElementById("movie-modal");
  const modalContent = document.getElementById("modal-content");

  const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=${language}`;

  fetch(url)
    .then(response => response.json())
    .then(movieData => {
      modalContent.innerHTML = `
        <h2>${movieData.title}</h2>
        <p>${movieData.overview}</p>
        <p>Rating: ${movieData.vote_average}</p>
        <p>Release Date: ${movieData.release_date}</p>
        <button id="close-button-modal">&times;</button>
      `;
      modal.style.display = "block";

      const closeButtonModal = document.getElementById("close-button-modal");
      closeButtonModal.addEventListener("click", () => {
        modal.style.display = "none";
      });
    })
    .catch(error => {
      console.error("Error fetching movie details:", error);
    });
}
