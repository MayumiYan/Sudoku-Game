document.addEventListener('DOMContentLoaded', function () {
    const newGameButton = document.getElementById('new-game');
    const checkButton = document.getElementById('check-solutions');
    const resetButton = document.getElementById('reset-game');

    newGameButton.addEventListener('click', function () {
        console.log('New Game button clicked!');
    });

    checkButton.addEventListener('click', function () {
        if (isValid()) {
            alert('No duplicates found! Keep going!');
        } else {
            alert('There are duplicates in your solution.');
        }
    });

    resetButton.addEventListener('click', function () {
        resetGame();
    });


    createGrid();
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

function isValid() {
    let gridValues = [];
    for (let row = 0; row < 9; row++) {
        gridValues[row] = [];
        for (let col = 0; col < 9; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);
            const value = parseInt(cell.value) || null;
            gridValues[row][col] = value;
        }
    }

    for (let i = 0; i < 9; i++) {
        const rowSet = new Set();
        const colSet = new Set();
        for (let j = 0; j < 9; j++) {


            if (gridValues[i][j]) {
                if (rowSet.has(gridValues[i][j])) {
                    return false;
                }
                rowSet.add(gridValues[i][j]);
            }


            if (gridValues[j][i]) {
                if (colSet.has(gridValues[j][i])) {
                    return false;
                }
                colSet.add(gridValues[j][i]);
            }
        }
    }


    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const boxSet = new Set();
            for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                    if (gridValues[i][j]) {
                        if (boxSet.has(gridValues[i][j])) {
                            return false;
                        }
                        boxSet.add(gridValues[i][j]);
                    }
                }
            }
        }
    }

    return true;
}

function resetGame() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);
            if (!cell.readOnly) {
                cell.value = '';
            }
        }
    }
}
