const HEIGHT = 960;
const WIDTH = 960;
const grid = document.querySelector('.grid');

// Draw a num x num grid of divs
function buildGrid(num) {

    const size = HEIGHT / num;

    // Nested for-loop to create num x num grid of divs
    for (let i = 0; i < num; i++) {
        const newRow = document.createElement('div');
        newRow.classList.add('row');
        
        for (let j = 0; j < num; j++) {
            const cell = document.createElement('div');

            cell.style.width = size + 'px';
            cell.style.height = size +'px';
            cell.classList.add('cell');
            newRow.appendChild(cell);
        }
        grid.appendChild(newRow);
    }

}

// Callback function on 'mouseover' event of "cell" divs
function paintCell(e) {
    this.classList.add('paint');
}

// Modify event listeners on each cell
function modifyPaintListener(add = true) {
    const rows = grid.querySelectorAll('.row');

    rows.forEach( (row) => {
        const cells = row.querySelectorAll('.cell');
        cells.forEach( cell => {
            if (add)
                cell.addEventListener('mouseover', paintCell);
            else
                cell.removeEventListener('mouseover', paintCell);
        })
    })
}

// Check for mouse click and add 'mouseover' event listener until 'mouseup'
function checkDrag() {
    window.addEventListener('mousedown', (e) => {

        if (e.target.className == 'cell') {
            // Add 'mouseover' event listeners on click
            modifyPaintListener(true);
            console.log(e);
        }
        

        // Add event listener for 'mouseup' to remove 'mouseover' event listeners
        window.addEventListener('mouseup', (e) => {
            modifyPaintListener(false);
        })
    })
}

// "main" script

// initialize
buildGrid(16);
checkDrag();

const adjustGrid = document.querySelector(".adjust-grid");
adjustGrid.addEventListener('click', () => {
    let newSize = prompt("Number of squares per side (max: 100): ");

    // Check to see that they entered something
    if(newSize != null) {
        
        if (newSize <= 100) {

            grid.replaceChildren();
            buildGrid(newSize);
        }
        else {
            alert("Exceeded maximum input!");
        }
    }
})
