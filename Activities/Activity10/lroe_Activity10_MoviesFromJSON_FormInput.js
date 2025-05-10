// Logan Roe
// lroe@iastate.edu
// Oct 2, 2024

window.addEventListener("DOMContentLoaded", (event) => {
    const b = document.getElementById("my_form");

    b.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        fetch("./MoviesFromJSON.json")
        .then((response) => { return response.json() })
        .then((myMovies) => { loadMovies(myMovies.movies) })
        .catch((err) => { console.log("error:" + err) });
    });
});

function loadMovies(movies) {
    // input value selected movie
    const m = document.getElementById("selectedMovie");
    const inputMovieName = m.value;
    
    // find the id col for Bootstrap Card
    var CardMovie = document.getElementById("col");
    
    // Clear previous movie data
    CardMovie.innerHTML = ""; // This will clear the previous movie data and image
    // Loop through the movies
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].title === inputMovieName) {
            let title = movies[i].title;
            let year = movies[i].year;
            let url = movies[i].url;
            console.log(title);
            // construct the HTML element
            let AddCardMovie = document.createElement("div");
            AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
            AddCardMovie.innerHTML = `
                <div class="card shadow-sm">
                <img src=${url} class="card-img-top" alt="..."></img>
                <div class="card-body">
                <p class="card-text"> <strong>${title}</strong>, ${year}</p>
                </div>
                </div>
                `;
            CardMovie.appendChild(AddCardMovie);
        } // end of if
    } // end of for
}