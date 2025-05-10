// Logan Roe
// lroe@iastate.edu
// Nov 11, 2024

window.addEventListener("DOMContentLoaded", (event) => {
    const b = document.getElementById("my_form");

    b.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        // Read the DB with movies :
        fetch("http://localhost:8081/listMovies")
            .then(response => response.json())
            .then(myMovies => {
                console.log(myMovies);
                loadMovies(myMovies)})
            .catch(err => console.log("error:" + err));
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

// Replace image and text per every one in HTML
function showOneMovie() {
    // Value from the input field
    let id = document.getElementById("movieId").value;

    // Fetch the value from the input field
    fetch(`http://localhost:8081/${id}`)
        .then(response => response.json())
        .then(myFavoriteMovie => {loadOneMovie(myFavoriteMovie)});

    // Replace image and text per every one in HTML
    function loadOneMovie(myFavoriteMovie) {
        // find the id col for Bootstrap Card
        var CardMovie = document.getElementById("col2");
        
        // Clear previous movie data
        CardMovie.innerHTML = ""; // This will clear the previous movie data and image

        let title = myFavoriteMovie.title;
        let year = myFavoriteMovie.year;
        let url = myFavoriteMovie.url;
        
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
    } // end of function
} // end of function