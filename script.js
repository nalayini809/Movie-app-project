
window.onload = function () {
  setTimeout(() => {
    document.getElementById('splashScreen').style.display = 'none'; 
    document.getElementById('mainContent').style.display = 'block'; 
  }, 3000); 
};

const OMDB_API_KEY = '56fe9508'; 

function searchMovie() {
  const query = document.getElementById('movieSearch').value;
  const movieResults = document.getElementById('movieResults');
  
  movieResults.innerHTML = ''; 

  fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        data.Search.forEach(movie => {
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movieItem');
          movieDiv.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" width="100">
            <h3>${movie.Title}</h3>
            <button onclick="showMovieDetails('${movie.imdbID}')">View Details</button>
          `;
          movieResults.appendChild(movieDiv);
        });
      } else {
        movieResults.innerHTML = '<p>No movies found</p>';
      }
    })
    .catch(error => {
      movieResults.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    });
}

function showMovieDetails(imdbID) {
  const movieInfo = document.getElementById('movieInfo');
  const moviePlayer = document.getElementById('moviePlayer');
  const movieSource = document.getElementById('movieSource');
  
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`)
    .then(response => response.json())
    .then(movie => {
      movieInfo.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" width="150">
        <h2>${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Rating:</strong> ${movie.imdbRating}</p>`;

      movieSource.src = 'Aaragan_2024_Tamil_Full_Movie_480p_HQ_PreDVD_(isaimini.eu).mp4'; 
      moviePlayer.style.display = 'block';
      
      document.getElementById('movieDetails').style.display = 'block';
    })
    .catch(error => {
      movieInfo.innerHTML = '<p>Error fetching movie details. Please try again later.</p>';
    });
}

function playMovie() {
  const moviePlayer = document.getElementById('moviePlayer');
  moviePlayer.play();
}
