// Logan Roe
// lroe@iastate.edu
// Sep 20, 2024

/*
*
* ---------- Exercise 1 ----------
*
*/

console.log("Exercise 1");
console.log("----------------------");

function maxOfTwo(n1, n2) {
    let max = n1;
    if (n2 > max) {
        max = n2;
    }
    return max;
}

let n1 = 11;
let n2 = 10;
console.log(`The max between ${n1} and ${n2} is :`, maxOfTwo(n1, n2));

/*
*
* ---------- Exercise 2 ----------
*
*/

console.log("Exercise 2");
console.log("----------------------");

const maxOfArray = function(array) {
    let max = array[0];
    for (let value of array) {
        if (value > max) {
            max = value;
        }
    }
    return max;
}

let array = [10, 11, 1024, 125, 9, 201];
console.log(`The maximum number is : ${maxOfArray(array)}`);

/*
*
* ---------- Exercise 3 ----------
*
*/

console.log("Exercise 3");
console.log("----------------------");

// Object :
const movie = {
    title : 'Some movie',
    releaseYear: 2018,
    rating: 4.5,
    director: 'Steven Spielberg'
};

function showProperties(movie) {
    console.log("Here is the list of Keys:");
    for (let myKey in movie) {
        console.log(myKey);
    }
    console.log("Here is the list of Values:");
    for (let myKey in movie) {
        console.log(movie[myKey]);
    }
}

showProperties(movie);

/*
*
* ---------- Exercise 4 ----------
*
*/

console.log("Exercise 4");
console.log("----------------------");

const circle = {
    radius: 2, 
    area: function() {
        return Math.PI * this.radius * this.radius;
    }
};

console.log(`The area of the circle is : ${circle.area().toFixed(2)}`);

/*
*
* ---------- Exercise 5 ----------
*
*/

console.log("Exercise 5");
console.log("----------------------");

const circle2 = {
    radius: 2, 
    area: function() {
        return Math.PI * this.radius * this.radius;
    },
    get radiusValue() {
        return this.radius;
    },
    set radiusValue(val) {
        this.radius = val;
    }
};

console.log(`Area with ${circle2.radiusValue} :`,circle2.area());
circle2.radiusValue = 3;
console.log(`Area with ${circle2.radiusValue} :`,circle2.area());

/*
*
* ---------- Exercise 6 ----------
*
*/

console.log("Exercise 6");
console.log("----------------------");

const circle3 = {
    radius: 2, 
    area: function() {
        return Math.PI * this.radius * this.radius;
    },
    getRadiusValue: function() {
        return this.radius;
    },
    setRadiusValue: function(val) {
        this.radius = val;
    }
};

console.log(`Area with ${circle3.getRadiusValue()} :`,circle3.area());
circle3.setRadiusValue(3);
console.log(`Area with ${circle3.getRadiusValue()} :`,circle3.area());


/*
*
* ---------- Exercise 7 ----------
*
*/

console.log("Exercise 7");
console.log("----------------------");

const grades = {
    math: 85,
    science: 90,
    history: 75,
    literature: 88
};

function calculateAverageGrade(grades) {
    let count = 0;
    let total = 0;
    for (let subjects in grades) {
        total += grades[subjects];
        count++;
    }
    return total / count;
}

console.log(calculateAverageGrade(grades));


/*
*
* ---------- Exercise 8 ----------
*
*/

console.log("Exercise 8");
console.log("----------------------");

const students = [
    {
        Fer: {
            math: 85,
            science: 90,
            history: 75,
            literature: 88
        }
    },
    {
        Alex: {
            math: 99,
            science: 97,
            history: 94,
            literature: 90
        }
    },
    {
        Mary: {
            math: 79,
            science: 72,
            history: 81,
            literature: 79
        }
    }
];

function calculateAverageGradePerStudent(students) {
    const studentAverages = [];
    for (let student of students) {
        // console.log(student.key);
        const keys = Object.keys(student);
        const values = Object.values(student);
        // Calculate the average using exercise 7's function
        // Then assign it to the new array
        studentAverages[keys[0]] = calculateAverageGrade(values[0]);
    }
    return studentAverages;
}
    
console.log(calculateAverageGradePerStudent(students));