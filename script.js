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

function getSelected() {
    let selected;
    let i = 0;
    while (i < colours.length && colours[i].classList.length < 3) 
        i++;
    

    selected = colours[i].classList[1];

    return selected;
}

// Callback function on 'mouseover' event of "cell" divs
function paintCell(e) {
    const colour = getSelected();
    e.target.style.backgroundColor = colour;
}

// Modify event listeners on each cell
function modifyPaintListener(add = true, ...colour) {
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

            let selected = getSelected();

            // paint AT LEAST the target cell
            e.target.style.backgroundColor = selected;

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

function alterGrid() {
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
}

function colourSelect(e) {

    colours.forEach ((colour) => {
        colour.classList.remove('selected-colour');
    })

    e.target.classList.add('selected-colour');
    const rules = document.styleSheets[0].cssRules;
    rules[5].style.backgroundColor = e.target.classList[1];

}

// "main" script

// initialize
buildGrid(16);
checkDrag();

const adjustGrid = document.querySelector(".adjust-grid");
adjustGrid.addEventListener('click', alterGrid);

const colours = document.querySelectorAll(".colour");
colours.forEach( (btn) => {
    btn.style.backgroundColor = btn.classList[1];

    btn.addEventListener('click', colourSelect);
})


