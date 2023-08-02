const colorMode = document.querySelector("#colorMode");
const rainbowBtn = document.querySelector("#rainbowBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");
const toggleGridBtn = document.querySelector("#toggleGridBtn");
const colorSelecter = document.querySelector("#colorSelecter");

const sizeSlider = document.querySelector('#sizeSlider');
const sliderValue = document.querySelector('#sliderValue');

const sketchBoard = document.querySelector("#sketchContainer");

// Default Information
let boardSize = 16;
let penColor = 'black'; //This tracks what color will be used to draw
let selectedColor = 'black'; //This tracks which color is selected by the colorPicker at all times
let colorSetting = 'colorMode' //This tracks which color setting is activated, (colorMode, rainbow, or eraser)
let mouseIsDown = false;

//Create the board
function createBoard(boardSize){
    const totalPixels = boardSize*boardSize;

    // Clear any existing cells
    sketchBoard.innerHTML = '';

    sketchBoard.style.gridTemplateColumns = (`repeat(${boardSize}, 1fr)`);
    sketchBoard.style.gridTemplateRows = (`repeat(${boardSize}, 1fr)`);

    for (let i = 0; i < totalPixels; i++) {
        const cell = document.createElement('div');
        cell.classList.add('gridCell');
        cell.addEventListener('mouseover', handleCellHover);
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('mousedown', handleCellClick);
        sketchBoard.appendChild(cell);
    }
}

/*------------------------------Coloring In Functions (Start)-------------------*/
function handleCellHover(event) {
    if (mouseIsDown) {
        paintCell(event);
    }
}
function handleCellClick(event){
    paintCell(event);
}

document.addEventListener('mousedown', () => {
    mouseIsDown = true;
});

document.addEventListener('mouseup', () => {
    mouseIsDown = false;
});

function getRandomColor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
}

function paintCell(cell){
    if(colorSetting === 'rainbow'){
        cell.target.style.backgroundColor = getRandomColor();
    }else{
        cell.target.style.backgroundColor = penColor;
    }
}

/*------------------------------Coloring In Functions (End)-------------------*/


/*------------------------------Button Event Listeners (Start)-------------------*/
colorSelecter.addEventListener('input', function() {
    selectedColor = colorSelecter.value;
    if(colorSetting === 'colorMode'){
        penColor = selectedColor;
    }
});
colorMode.addEventListener('click', ()=>{
    penColor = selectedColor;
    colorSetting = 'colorMode';
    colorMode.style.backgroundColor = 'rgb(169, 169, 169)';
    rainbowBtn.style.backgroundColor = 'rgb(255, 255, 255)';
    eraserBtn.style.backgroundColor = 'rgb(255, 255, 255)';
});

rainbowBtn.addEventListener('click', ()=>{
    penColor = 'rainbow';
    colorSetting = 'rainbow';
    colorMode.style.backgroundColor = 'rgb(255, 255, 255)';
    rainbowBtn.style.backgroundColor = 'rgb(169, 169, 169)';
    eraserBtn.style.backgroundColor = 'rgb(255, 255, 255)';
});

eraserBtn.addEventListener('click', ()=>{
    penColor = 'white';
    colorSetting = 'eraser';
    colorMode.style.backgroundColor = 'rgb(255, 255, 255)';
    rainbowBtn.style.backgroundColor = 'rgb(255, 255, 255)';
    eraserBtn.style.backgroundColor = 'rgb(169, 169, 169)';
});

clearBtn.addEventListener('click', ()=>{
    const pixels = document.querySelectorAll(".gridCell");

    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white';
    });});

toggleGridBtn.addEventListener('click', () =>{
    const pixels = document.querySelectorAll(".gridCell");

    pixels.forEach(pixel => {
        pixel.classList.toggle('hideGridLines');
    });
});  

sizeSlider.addEventListener('input', () => {
    boardSize = sizeSlider.value;
    sliderValue.textContent = `${boardSize}x${boardSize}`;
    createBoard(boardSize);
}); 
/*------------------------------Button Event Listeners (End)-------------------*/

document.addEventListener('DOMContentLoaded', () => {
    //When Page Loads create board
    createBoard(boardSize);
    //And black is default pen color selected
    colorMode.style.backgroundColor = 'rgb(169, 169, 169)';
});