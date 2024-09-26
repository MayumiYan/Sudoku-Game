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

                    clearErrorHighlighting();
                    checkForDuplicates();
                });
            }

            grid.appendChild(cell);
        }
    }
}

function clearErrorHighlighting() {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);
            cell.style.backgroundColor = '';
        }
    }
}

function checkForDuplicates() {
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

    let duplicateCells = new Set();

    for (let i = 0; i < 9; i++) {
        const rowSet = new Map();
        for (let j = 0; j < 9; j++) {
            if (gridValues[i][j]) {
                if (rowSet.has(gridValues[i][j])) {
                    duplicateCells.add(`cell-${i}-${j}`);
                    duplicateCells.add(`cell-${i}-${rowSet.get(gridValues[i][j])}`);
                } else {
                    rowSet.set(gridValues[i][j], j);
                }
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        const colSet = new Map();
        for (let j = 0; j < 9; j++) {
            if (gridValues[j][i]) {
                if (colSet.has(gridValues[j][i])) {
                    duplicateCells.add(`cell-${j}-${i}`);
                    duplicateCells.add(`cell-${colSet.get(gridValues[j][i])}-${i}`);
                } else {
                    colSet.set(gridValues[j][i], j);
                }
            }
        }
    }

    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const boxSet = new Map();
            for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                    if (gridValues[i][j]) {
                        if (boxSet.has(gridValues[i][j])) {
                            duplicateCells.add(`cell-${i}-${j}`);
                            duplicateCells.add(`cell-${boxSet.get(gridValues[i][j])[0]}-${boxSet.get(gridValues[i][j])[1]}`);
                        } else {
                            boxSet.set(gridValues[i][j], [i, j]);
                        }
                    }
                }
            }
        }
    }

    duplicateCells.forEach(cellId => {
        const cell = document.getElementById(cellId);
        cell.style.backgroundColor = 'red';
    });
}


function isValid() {
    let gridValues = [];
    let duplicateFound = false;

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
                    const cell = document.getElementById(`cell-${i}-${j}`);
                    cell.style.backgroundColor = "red";
                    duplicateFound = true;
                } else {
                    rowSet.add(gridValues[i][j]);
                }
            }


            if (gridValues[j][i]) {
                if (colSet.has(gridValues[j][i])) {
                    const cell = document.getElementById(`cell-${j}-${i}`);
                    cell.style.backgroundColor = "red";
                    duplicateFound = true;
                } else {
                    colSet.add(gridValues[j][i]);
                }
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
                            const cell = document.getElementById(`cell-${i}-${j}`);
                            cell.style.backgroundColor = "red";
                            duplicateFound = true;
                        } else {
                            boxSet.add(gridValues[i][j]);
                        }
                    }
                }
            }
        }
    }

    return !duplicateFound;
}

function resetGame() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if (!cell.readOnly) {
                cell.value = '';
                cell.style.backgroundColor = '';
            }
        }
    }
    clearErrorHighlighting();
}

document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.getElementById('reset-game');

    resetButton.addEventListener('click', function () {
        resetGame();
    });

    createGrid();
})
