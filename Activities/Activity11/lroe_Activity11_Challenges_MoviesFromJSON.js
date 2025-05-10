// Logan Roe
// lroe@iastate.edu
// Oct 4, 2024

function loadMovies(movies, n) {
    // ---------------------
    // make array of objects
    // ---------------------
    const arrayMovies = movies.movies;

    let sortedMovies = [];
    if (n === 1) {
        // Low to high
        sortedMovies = arrayMovies.sort((p1,p2) => (p1.price>p2.price) ? 1 : (p1.price<p2.price) ? -1 : 0);
    } else if (n === 2) {
        // High to low
        sortedMovies = arrayMovies.sort((p1, p2) => { return (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0 });
    } else if (n === 3) {
        // input description
        const inputDescription = document.getElementById("descriptionInput").value;
        // select movies only containing input description
        for (let movie of arrayMovies){
            if (movie.description.includes(inputDescription)){
                sortedMovies.push(movie);
            }
        }
    }

    // ---------------------
    // Construct the CARD
    // ---------------------
    var CardMovie = document.getElementById("col");
    // Clear previous movie data
    CardMovie.innerHTML = ""; // This will clear the previous movie data and image

    // Loop through the movies
    for (let i = 0; i < sortedMovies.length; i++) {
        let title = sortedMovies[i].title;
        let year = sortedMovies[i].year;
        let url = sortedMovies[i].url;
        let price = sortedMovies[i].price;
        console.log(title);
        // construct the HTML element
        let AddCardMovie = document.createElement("div");
        AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
        AddCardMovie.innerHTML = `
            <div class="card shadow-sm">
            <img src=${url} class="card-img-top" alt="..."></img>
            <div class="card-body">
            <p class="card-text"> <strong>${title}</strong>, ${year}, $${price}</p>
            </div>
            </div>
            `;
        // Add a lsitener for changing the background color
        AddCardMovie.addEventListener("click", (e) => {
            e.currentTarget.style.backgroundColor = 'blue';
        });
        CardMovie.appendChild(AddCardMovie);
    } // end of for
}

function showCardsSortedByPriceLowHigh() {
    fetch("./MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies, 1))
    .catch(err => console.log("Error :"+err));
}

function showCardsSortedByPriceHighLow() {
    fetch("./MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies, 2))
    .catch(err => console.log("Error :"+err));
}

function showCardsContainingDescriptionA() {
    const inputField = document.getElementById('inputField');
    inputField.style.display = 'block'; // Show the input field
}

function showCardsContainingDescriptionB() {
    fetch("./MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies, 3))
    .catch(err => console.log("Error :"+err));
    // Hide the input field after submission
    document.getElementById('inputField').style.display = 'none';
}