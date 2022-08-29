// listen for click even on button
// ask the user for grid size
document.getElementById('grid-size').addEventListener('click', () => {
    let gridSize = parseInt(prompt("Enter Grid Size Between 10 & 100", '16'));

    if(Number.isNaN(gridSize) || gridSize < 10 || gridSize > 100){

        alert("Wrong size, Try Again!");

    } else {
        // clear the grid container from previous generated divs
        if(document.querySelectorAll('.grid-box').length !== 0){
            document.getElementById('grid-container').innerHTML = '';
        }

        // create the array
        initializeGrid(gridSize);

        // start drawing
        drawPixels(gridSize);
    }
});

// initialize the grid
function initializeGrid(size){
    // create the grid
    const gridArray = new Array(size);

    for(let i = 0; i < size; i++){
        gridArray[i] = new Array(size);
    }

    // populate the grid with divs
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            gridArray[i][j] = document.getElementById('grid-container')
            .appendChild(document.createElement('div'));
        }
    }

    // add a class to the array
    for(let i = 0; i < size; i++){

        for(let j = 0; j < size; j++){
            gridArray[i][j].className = 'grid-box';
        }
    }
}

function drawPixels(size){
    // grab all divs
    let pixels = document.querySelectorAll('.grid-box');

    console.log(pixels.length);

    // determine the size of div based on selected size
    // takes 2 digits after the decimal point
    let pixelSize= Math.round((350 /size ) * 100) / 100;

    // set the new size of each pixel
    pixels.forEach(pixel => {pixel.style = `width: ${pixelSize}px; height: ${pixelSize}px`});

    // listen for mouse hover and change div color
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', e => 
            e.target.style.background = 'black');
        }
    );
}