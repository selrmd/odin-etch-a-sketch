// FUNCTIONS //
// get the grid density from the user
function getGridDensity(){
    let gridInput = document.getElementById('grid-density');
    let gridSize = Number(gridInput.value);

    // check if user input is actually a number AND in range
    if(Number.isNaN(gridSize) || gridSize < 10 || gridSize > 100){
        // warn the user via the placeholder value
        gridInput.value = '';
        gridInput.placeholder = 'try again!';

        // exit the input
        gridInput.blur();
    } else {
        // clear the grid container from previous generated divs
        if(document.querySelectorAll('.grid-box').length !== 0){
            document.getElementById('grid-container').innerHTML = '';
        }

        // if user input fixed, remove "try again"
        // from hint when input is blurred
        gridInput.placeholder = '20'

        // create the array
        initializeGrid(gridSize);

        // unfocus from input
        gridInput.blur();

        // start drawing
        drawPixels(gridSize);
    }
}

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

// draw each pixel when hovering over a div
// it colors the pixel based on user choice
function drawPixels(size){
    // grab all divs
    let pixels = document.querySelectorAll('.grid-box');

    // determine the size of pixel based on density
    // takes 2 digits after the decimal point
    let pixelSize= Math.round((650 /size ) * 100) / 100;

    // set the new size of each pixel
    pixels.forEach(pixel => pixel.style = `width: ${pixelSize}px; height: ${pixelSize}px`);

    // listen for mouse hover and change div color
    let count = 0;

    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', e => {
            if(document.getElementById('color-choice').innerText.includes('Random')){
                e.target.style.background = 'black';
            } else {
                // keep counting the pixels
                count++;

                //color each 10th pixel in black
                if(count % 10 === 0){
                    e.target.style.background = 'black';
                } else {
                    e.target.style.background = getRandomColors();
                }
            }
        });
    });
}

// generate a random RGB value
function getRandomColors(){
    let r = Math.floor(Math.random()*(255 + 1));
    let g = Math.floor(Math.random()*(255 + 1));
    let b = Math.floor(Math.random()*(255+ 1))

    return `rgb(${r}, ${g}, ${b})`;
}

// EVENT LISTENERS //

// lister for pressing "Enter" key
document.getElementById('grid-density').addEventListener('keypress', e => 
{
    if(e.key === 'Enter'){
        e.preventDefault();

        getGridDensity();
    }
});

// listen for "Click" the OK button
document.getElementById('ok-button').addEventListener('click', () => getGridDensity());

// get user input to change color from black to random
document.getElementById('color-choice').addEventListener('click', () => {
    let colorChoice = document.getElementById('color-choice');

    if(colorChoice.innerText === 'Black'){
        colorChoice.innerText = 'Random Colors!';
    } else {
        colorChoice.innerText = 'Black';
    }
});

// erase the color but don't reinitialize the grid
document.getElementById('erase-canvas').addEventListener('click', () => {

    // reset all divs color to default to "erase" the canvas
    document.querySelectorAll('.grid-box')
        .forEach(pixel => pixel.style = "color: initial");

    // pass the current value of input to
    // get the same previous grid size
    drawPixels(Number(document.getElementById('grid-density').value));
});

// stop drawing and erase canvas when the input is focused
document.getElementById('grid-density').addEventListener('focus', e => {
    // remove old value when entering a new one
    e.target.value = '';

    // reset canvas
    document.getElementById('grid-container').innerHTML = '';
});
