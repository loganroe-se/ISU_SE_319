// Logan Roe
// lroe@iastate.edu
// Sep 20, 2024

// Define an object representing a rectangle
const rectangle = {
    type: "rectangle",
    width: 5,
    setWidth: function(val) {
        this.width = val;
    },
    getWidth: function() {
        return this.width;
    },
    height: 10,
    setHeight: function(val) {
        this.height = val;
    },
    getHeight: function() {
        return this.height;
    },
    area: function() {
        return this.width * this.height;
    }
};

// Define an object representing a circle
const circle = {
    type: "circle",
    radius: 7,
    setRadius: function(val) {
        this.radius = val;
    },
    getRadius: function() {
        return this.radius;
    },
    area : function() {
        return Math.PI * Math.pow(this.radius, 2);
    }
};

// ---------- Rectangle ----------
console.log("Input data >")
// prompt width and height (e.g., const w = prompt("Enter width:"))
const w = prompt("Enter width:");
const h = prompt("Enter heighth:");

console.log("Set values >");
// set the values
rectangle.setWidth(w);
rectangle.setHeight(h);

console.log("Get values >");
// get the values
let newWidth = rectangle.getWidth();
let newHeight = rectangle.getHeight();

console.log("Show output >");
// Show the next message in console:
// "The area of square with Width 4 and Height 5 is 20"
console.log(`The area of a ${rectangle.type} with Width ${newWidth} and Height ${newHeight} is ${rectangle.area()}`);

// ---------- Circle ----------
console.log("Input data >")
// prompt radius (e.g., const r = prompt("Enter radius:"))
const r = prompt("Enter radius:");

console.log("Set values >");
// set the value
circle.setRadius(r);

console.log("Get values >");
// get the value
let newRadius = circle.getRadius();

console.log("Show output >");
// Show the next message in console:
// "The area of circle with Radius 4 is 50.27"
console.log(`The area of a ${circle.type} with Raidus ${newRadius} is ${circle.area().toFixed(2)}`);