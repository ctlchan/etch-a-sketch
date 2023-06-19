const HEIGHT = 780;
const WIDTH = 780;
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

function showConfirmationPopUp() {
    const popUp = document.querySelector(".confirm-download");
    popUp.style.visibility ="visible";

    const cancel = document.querySelector('#cancel');
    cancel.addEventListener('click', () => popUp.style.visibility = "hidden");

    const save = document.querySelector('#save');
    // const form = document.querySelector('.download-form');
    save.addEventListener('click', (e) => {
        e.preventDefault();  

        let fileName = document.querySelector('#file-name').value;
        let fileType = document.querySelector('#file-type').value;

        console.log(fileName + ' ' + fileType);

        if (fileName == '') {
            alert("Invalid input(s). Please try again.")
            console.error("invalid input");
        }
        else {
            downloadURL(fileName, fileType)
        }
    })
}

function downloadURL(fileName, fileType) {

    const toPrint = document.querySelector('.grid');

    html2canvas(toPrint).then((canvas) => {

        const imageURI = canvas.toDataURL(`image/${fileType}`);
        const downloadLink = document.createElement("a");

        downloadLink.download = fileName;
        downloadLink.href = imageURI;
        downloadLink.click();
    })

    return true;
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

const exportBtn = document.querySelector(".export-img");

exportBtn.addEventListener('click', (e) => {
    showConfirmationPopUp();
})



