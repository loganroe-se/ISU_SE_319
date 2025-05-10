// Logan Roe
// lroe@iastate.edu
// Nov 13, 2024

window.addEventListener("DOMContentLoaded", (event) => {
    listAllRobots();
});

function listAllRobots() {
    // Read the DB with robots :
    fetch("http://localhost:8081/robot")
    .then(response => response.json())
    .then(myRobots => {
        loadRobots(myRobots)})
    .catch(err => console.log("error:" + err));
}

function loadRobots(robots) {   
    // find the id col for Bootstrap Card
    var CardRobot = document.getElementById("col");
    
    // Clear previous robot data
    CardRobot.innerHTML = ""; // This will clear the previous robot data and image
    // Loop through the robots
    for (let i = 0; i < robots.length; i++) {
        let id = robots[i].id;
        let name = robots[i].name;
        let price = robots[i].price;
        let description = robots[i].description;
        let url = robots[i].imageUrl;
        // construct the HTML element
        let AddCardRobot = document.createElement("div");
        AddCardRobot.classList.add("col"); // Add Bootstrap class to the column
        AddCardRobot.innerHTML = `
            <div class="card shadow-sm">
                <img src=${url} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <p class="card-text">ID: ${id}</p>
                    <p class="card-text">${description}</p>
                    <p class="card-text"> <strong>${name}</strong>, $${price}</p>
                </div>
            </div>
            `;
        CardRobot.appendChild(AddCardRobot);
    } // end of for
}

// Replace image and text per every one in HTML
function showOneRobot() {
    // Value from the input field
    let id = document.getElementById("robotId").value;

    // Fetch the value from the input field
    fetch(`http://localhost:8081/robot/${id}`)
        .then(response => response.json())
        .then(myFavoriteRobot => {loadOneRobot(myFavoriteRobot)});

    // Replace image and text per every one in HTML
    function loadOneRobot(myFavoriteRobot) {
        // find the id col for Bootstrap Card
        var CardRobot = document.getElementById("col2");
        
        // Clear previous robot data
        CardRobot.innerHTML = ""; // This will clear the previous robot data and image

        let id = myFavoriteRobot.id;
        let name = myFavoriteRobot.name;
        let price = myFavoriteRobot.price;
        let description = myFavoriteRobot.description;
        let url = myFavoriteRobot.imageUrl;
        
        // construct the HTML element
        let AddCardRobot = document.createElement("div");
        AddCardRobot.classList.add("col"); // Add Bootstrap class to the column
        AddCardRobot.innerHTML = `
            <div class="card shadow-sm">
                <img src=${url} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <p class="card-text">ID: ${id}</p>
                    <p class="card-text">${description}</p>
                    <p class="card-text"> <strong>${name}</strong>, $${price}</p>
                </div>
            </div>
            `;
        CardRobot.appendChild(AddCardRobot);
    } // end of function
} // end of function

// Add a new robot
function addRobot() {
    // Get all the values
    let robotID = Number(document.getElementById("robot_id").value);
    let robotName = document.getElementById("robot_name").value;
    let robotPrice = document.getElementById("robot_price").value;
    let robotDescription = document.getElementById("robot_description").value;
    let robotImageURL = document.getElementById("robot_image_url").value;

    // Ensure all values exist
    if (!robotID || !robotName || !robotPrice || !robotDescription || !robotImageURL) {
        alert("All fields are required.");
        return
    }

    fetch('http://localhost:8081/robot', {
        method: "POST",
        headers: {"Content-Type":"application/JSON"},
        body: JSON.stringify({
            id: robotID,
            name: robotName,
            price: robotPrice,
            description: robotDescription,
            imageUrl: robotImageURL
        }),
    })
    .then((response) => {
        if (response.status != 200) {
            return response.json().then((errData) => {
                throw new Error(`POST response was not ok:\nStatus: ${response.status}\nMessage: ${errData.error}`);
            });
        }
    })
    .then(data => alert("The robot was added successfully."))
    .catch(err => alert(`An error occurred: ${err.message}`));

    // Call listAllRobots to update the listing
    listAllRobots();
}

function deleteOneRobot() {
    // Fetch the value from the input field
    let id = document.getElementById("deleteId").value;

    // First, show the robot that is about to be deleted and wait for a confirm
    fetch(`http://localhost:8081/robot/${id}`)
        .then(response => response.json())
        .then(robotToDelete => {displayCRUDRobot(robotToDelete, "col4", "About to Delete")})

    let deleteBtn = document.getElementById("deleteButton");
    deleteBtn.innerHTML = "Click again to confirm deletion of: ";
    deleteBtn.addEventListener("click", () => {
        fetch(`http://localhost:8081/robot/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(
                {"id":id}
            )
        })
        .then(async (response) => {
            if (response.status != 200) {
                const errData = await response.json();
                throw new Error(`DELETE response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
            }
            return response.json();
        })
        .then(deleteThisRobot => {displayCRUDRobot(deleteThisRobot, "col4" ,"Robot Deleted");})
        .catch((error) => {
            // Display alert if there's an error
            alert("Error deleting robot: " + error.message);
        });

        // Reset the list and button value
        document.getElementById("deleteButton").innerHTML = "Delete Robot:";
        listAllRobots();
    });
}

function updateOneRobot(event) {
    event.preventDefault();

    // Fetch the value from the input field
    let id = document.getElementById("updateId").value;

    // Get all the values
    let robotName = document.getElementById("update_robot_name").value;
    let robotPrice = document.getElementById("update_robot_price").value;
    let robotDescription = document.getElementById("update_robot_description").value;
    let robotImageURL = document.getElementById("update_robot_image_url").value;

    let body = {};
    if (robotName !== "") body.name = robotName;
    if (robotPrice !== "") body.price = robotPrice;
    if (robotDescription !== "") body.description = robotDescription;
    if (robotImageURL !== "") body.imageUrl = robotImageURL;
    
    // Check if there's at least one value to update
    if (Object.keys(body).length === 0) {
        alert("At least one value must be updated");
        return;
    }

    fetch(`http://localhost:8081/robot/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then((response) => {
        if (response.status != 200) {
            return response.json().then((errData) => {
                throw new Error(`UPDATE response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`);
            });
        }
        return response.json();
    })
    .then(updateThisRobot => {displayCRUDRobot(updateThisRobot, "col5", "Robot Updated");})
    .catch((error) => {
        // Display alert if there's an error
        alert("Error UPDATING robot:" + error.message);
    });  

    // Clear all text fields
    document.getElementById("update_robot_name").value = "";
    document.getElementById("update_robot_price").value = "";
    document.getElementById("update_robot_description").value = "";
    document.getElementById("update_robot_image_url").value = "";
}

function displayCRUDRobot(robot, divID, action) {
    // Find the ID col
    var CardRobot = document.getElementById(divID);

    // Clear previous data
    CardRobot.innerHTML = "";

    // Get all of the values
    let id = robot.id;
    let name = robot.name;
    let price = robot.price;
    let description = robot.description;
    let url = robot.imageUrl;

    // Construct the HTML element
    let AddCardRobot = document.createElement("div");
    AddCardRobot.classList.add("col");
    AddCardRobot.innerHTML = `
        <div class="card shadow-sm">
            <p style="text-align: center"><strong>Action: ${action}</strong></p>
            <img src=${url} class="card-img-top" alt="..."></img>
            <div class="card-body">
                <p class="card-text">ID: ${id}</p>
                <p class="card-text">${description}</p>
                <p class="card-text"><strong>${name}</strong>, $${price}</p>
            </div>
        </div>
        `;
    CardRobot.appendChild(AddCardRobot);
}