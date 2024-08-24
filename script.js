document.addEventListener('DOMContentLoaded', function () {
    const newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', function () {
        console.log('New Game button clicked!');
    });
});

function createGrid() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '';

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.id = `cell-${row}-${col}`;
            cell.className = 'cell';
            grid.appendChild(cell);
        }
    }
}

document.addEventListener('DOMContentLoaded', createGrid);