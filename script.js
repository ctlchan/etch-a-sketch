const HEIGHT = 960;
const WIDTH = 960;
const grid = document.querySelector('.grid');

buildGrid(16);
applyPaintListener('mouseover');

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

    // TODO: implement click-and-drag painting

    this.classList.add('paint');
}

// Reapply listeners - called again when redrawing grid
function applyPaintListener(eventType) {
    const rows = grid.querySelectorAll('.row');
    console.log(rows);

    rows.forEach( (row) => {
        const cells = row.querySelectorAll('.cell');
        cells.forEach( cell => {
            cell.addEventListener(eventType, paintCell);
        })
    })
}
