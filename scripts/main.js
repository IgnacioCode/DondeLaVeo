var testButton = document.getElementById('testButton');

var accessToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTlhMDMwNDZjODc1NjBlNWNlNjFlMWE4ZjU2YzkxMCIsInN1YiI6IjY1NDNmZWFmNDFhNTYxMzM2ZDgzMzBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m-mO8EzxG2yDs8YI7HqkVhUtNylWrgPz1rTT3XF7Fkk"
var imgEndpoint = "https://image.tmdb.org/t/p/w500";
var serviceEndpoint = "https://api.themoviedb.org/3/movie/{movie_id}/watch/providers";
var inputText = document.getElementById("movie-search");
var modal = document.getElementById('filmInfo');

modal.addEventListener("click",function(e){
    if (e.target === modal) {
        modal.style.display = 'none';
    }
})

inputText.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      searchMovie(inputText.value);
    }
});

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTlhMDMwNDZjODc1NjBlNWNlNjFlMWE4ZjU2YzkxMCIsInN1YiI6IjY1NDNmZWFmNDFhNTYxMzM2ZDgzMzBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m-mO8EzxG2yDs8YI7HqkVhUtNylWrgPz1rTT3XF7Fkk'
    }
};
  


function createFilmOptions(){
    var resultDiv = document.getElementById("resultDiv");
    var newMovie = document.createElement("div");
    newMovie.className="filmOption";

    resultDiv.appendChild(newMovie);
}

function searchMovie(movieName){
    movieName = movieName.replace(/ /g, '+');
    console.log(movieName);
    fetch('https://api.themoviedb.org/3/search/movie?query='+movieName+'&language=es-AR', options)
    .then(response => response.json())
    .then(response => listMovies(response.results))
    .catch(err => console.error(err));
}

function listMovies(list){
    var resultDiv = document.getElementById("resultDiv");
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
      }
    list.sort(function(a, b) {
        return b.popularity - a.popularity;
    });
    list.forEach(element => {
        console.log(element.original_title + " " + element.popularity);
        var newDiv = document.createElement("div");

        newDiv.className = "filmOption";
        if(element.poster_path!=null){
            imgUrl = imgEndpoint + element.poster_path;
            newDiv.style.backgroundImage = "url("+imgUrl+")";
        }
        else{
            console.log("ENTRE");
            newDiv.style.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png)";
        }
        
        newDiv.setAttribute("filmID",element.id);
        newDiv.setAttribute("filmTitle",element.original_title);
        newDiv.setAttribute("releaseYear",element.release_date.slice(0,4));

        newDiv.addEventListener('click', function() {
            modal.style.display = 'flex';
            var shownTitle = document.getElementById("filmTitle");
            var shownYear = document.getElementById("filmYear");

            shownTitle.textContent = newDiv.getAttribute("filmTitle");
            shownYear.textContent = newDiv.getAttribute("releaseYear");
        });

        resultDiv.appendChild(newDiv)


    });
}

