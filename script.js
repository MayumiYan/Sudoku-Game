document.addEventListener('DOMContentLoaded', function () {
    const newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', function () {
        console.log('New Game button clicked!');
    });
});

function createGrid() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '';

    const startingGrid = [
        [5, 3, null, null, 7, null, null, null, null],
        [6, null, null, 1, 9, 5, null, null, null],
        [null, 9, 8, null, null, null, null, 6, null],
        [8, null, null, null, 6, null, null, null, 3],
        [4, null, null, 8, null, 3, null, null, 1],
        [7, null, null, null, 2, null, null, null, 6],
        [null, 6, null, null, null, null, 2, 8, null],
        [null, null, null, 4, 1, 9, null, null, 5],
        [null, null, null, null, 8, null, null, 7, 9],
    ];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.id = `cell-${row}-${col}`;
            cell.className = 'cell';
            cell.maxLength = 1;


            if (startingGrid[row][col] !== null) {
                cell.value = startingGrid[row][col];
                cell.readOnly = true;
            } else {
                cell.addEventListener('input', function () {
                    const value = cell.value;
                    if (!/^[1-9]$/.test(value)) {
                        cell.value = '';
                    }
                });
            }

            grid.appendChild(cell);
        }
    }
}



document.addEventListener('DOMContentLoaded', createGrid);