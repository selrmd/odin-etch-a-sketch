// get the grid size from user
document.querySelector('input').addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        e.preventDefault();

        let gridSize = parseInt(e.target.value);

        if(Number.isNaN(gridSize) || gridSize < 10 || gridSize > 100){

            // reset previous grid
            document.getElementById('grid-container').innerHTML = '';
            // warn the user via the placeholder value
            e.target.value = '';
            e.target.placeholder = 'wrong size!';
            // exit the input
            e.target.blur();

        } else {
            // clear the grid container from previous generated divs
            if(document.querySelectorAll('.grid-box').length !== 0){
                document.getElementById('grid-container').innerHTML = '';
            }

            // create the array
            initializeGrid(gridSize);

            // start drawing
            drawPixels(gridSize);

            // clear input
            e.target.value = '';
            e.target.placeholder = '10 to 100';
            e.target.blur();
        }
    }
});

// erase the color but not the divs
document.getElementById('erase-canvas').addEventListener('click', e => {

    let pixels = document.querySelectorAll('.grid-box');

    pixels.forEach(pixel => {pixel.style = "color: white"});
});

// get user input to change color from black to random
document.getElementById('color-choice').addEventListener('click', e => {
    let colorChoice = document.getElementById('color-choice');

    if(colorChoice.innerText === 'Black'){
        colorChoice.innerText = 'Random';
    } else {
        colorChoice.innerText = 'Black';
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

    // determine the size of div based on selected size
    // takes 2 digits after the decimal point
    let pixelSize= Math.round((350 /size ) * 100) / 100;

    // set the new size of each pixel
    pixels.forEach(pixel => {pixel.style = `width: ${pixelSize}px; height: ${pixelSize}px`});

    // listen for mouse hover and change div color
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', e => {
            if(document.getElementById('color-choice').innerText === 'Black'){
                e.target.style.background = 'black';
            } else {
                e.target.style.background = getRandColors();
            }
        });
    });
}

function getRandColors(){

    let r = Math.floor(Math.random()*(255 + 1));
    let g = Math.floor(Math.random()*(255 + 1));
    let b = Math.floor(Math.random()*(255+ 1))

    return `rgb(${r}, ${g}, ${b})`;
}