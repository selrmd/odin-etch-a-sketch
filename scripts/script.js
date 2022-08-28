// create the grid using two-dimensional array
// with a fixed 16 div for now
const row = 16, column = 16;

// initialize the array
const gridArray = new Array(row);
for(let i = 0; i < row; i++){
    gridArray[i] = new Array(column);
}

// populate the grid with divs
for(let i = 0; i < row; i++){
    for(let j = 0; j < column; j++){
        gridArray[i][j] = document.getElementById('grid-container')
        .appendChild(document.createElement('div'));
    }

}

// add a class to the array for testing
for(let i = 0; i < row; i++){
    for(let j = 0; j < column; j++){
        gridArray[i][j].classList.add('grid-box');
    }
}

// limit flexbox column to 16
document.getElementById('grid-container').style.width = `${row * 100}px`;

// add hover effect over divs
let pixels = document.querySelectorAll('.grid-box');

pixels.forEach(pixel => {
    pixel.addEventListener('mouseover', e => 
        e.target.style.background = 'black');
    }
);
