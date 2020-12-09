let container = document.querySelector('.container');

function createGrid(size) {
    let gridArea = size * size;

    for (let i = 1; i <= gridArea; i++) {

        let gridItem = document.createElement('div');
        container.insertAdjacentElement('beforeend', gridItem);

    } //END FOR


    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    //Array of all divs in the container
    let gridItems = container.querySelectorAll('div');

    //Adding an event listener to all the divs using a forEach loop
    gridItems.forEach(item => item.addEventListener('mouseover', colorGrid));

    gridItems.forEach(item => item.style.transition = ".4s background-color");

} //END createGrid(size)

//Function: gets the specific element which is being hovered on and colors that grid 
function colorGrid(e) {

    let color = document.getElementById('color');

    e.target.style.backgroundColor = color.value;

} //END colorGrid()



/**Function: This function gets all grid items and resets their event listener 
 * to change their background to white on mouseover
 */
function eraseGrid(event) {

    let gridItems = container.querySelectorAll('div');

    /**Adding an event listener to all grid items when the eraser 
     * is focused and reversing it when it's not
     */
    gridItems.forEach(item => item.addEventListener('mouseover', (e) => {
        if (event.target == document.activeElement) {
            e.target.style.backgroundColor = "white";
        } else {
            resetGridItemsBG();
        }
    }));

} //END eraseGrid()


function resetGridItemsBG() {

    let gridItems = container.querySelectorAll('div');

    gridItems.forEach(item => item.addEventListener('mouseover', colorGrid));
}


function clearGrid() {

    let gridItems = container.querySelectorAll('div');

    gridItems.forEach(item => item.style.backgroundColor = "white");

}

function adjustGridSize(e) {

    clearGrid();

    createGrid(e.target.value);

}

//Getting the eraser button and adding an event listener for when it is focused
let eraser = document.getElementById('eraser');
eraser.addEventListener('focus', eraseGrid);


let clearButton = document.getElementById("clear");
clearButton.addEventListener('click', clearGrid);

let slider = document.getElementById("slider");
slider.addEventListener('mouseup', adjustGridSize);

//Creating an initial grid to start with
createGrid(8);