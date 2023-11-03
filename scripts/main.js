var testButton = document.getElementById('testButton');

function createFilmOptions(){
    var resultDiv = document.getElementById("resultDiv");
    var newMovie = document.createElement("div");
    newMovie.className="filmOption";

    resultDiv.appendChild(newMovie);
}

testButton.addEventListener('click', createFilmOptions);

