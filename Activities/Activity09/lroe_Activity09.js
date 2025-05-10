// Logan Roe
// lroe@iastate.edu
// Sep 25, 2024

function appendData(person) {
    let mainContainer = document.getElementById("myData1");
    let div = document.createElement("div");
    // Using Bootstrap Card component
    div.classList.add("col-sm-6", "col-md-4", "col-lg-3");
    div.innerHTML = `
        <div class="card mb-4" style="width: 100%;">
        <img src=${person.logo} class="card-img-top" alt="superhero" width="100" />
        <div class="card-body">
        <h5 class="card-title">${person.firstName} ${person.lastName}</h5>
        <p class="card-text">
        <strong>Job:</strong> ${person.job} <br>
        <strong>Roll:</strong> ${person.roll}
        </p>
        </div>
        </div>
        `;
    mainContainer.appendChild(div);
}

function myFetch() {
    console.log("Begin fetch");
    fetch('./persons.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        appendData(data[0]);
        appendData(data[1]);
        appendData(data[2]);
    })
    .catch(function (err) {
        console.log('error:' + err);
    });
}

myFetch();