let grid = [];
let steps = 0;
let size = 5;
let levels = [];

const gridDiv = document.getElementById("grid");
const stepsSpan = document.getElementById("steps");
const levelSelect = document.getElementById("levelSelect");
const startBtn = document.getElementById("startBtn");

// завантаження JSON
fetch("data/levels.json")
    .then(res => res.json())
    .then(data => {
        levels = data.levels;
        loadLevels();
    });

function loadLevels() {
    levels.forEach((lvl, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = lvl.name;
        levelSelect.appendChild(option);
    });
}

// старт гри
startBtn.addEventListener("click", startGame);

function startGame() {
    let selected = levelSelect.value;

let min = levels[selected].minSteps;
document.getElementById("minSteps").textContent = min;

    if (selected === "") {
        alert("Choose level!");
        return;
    }

    steps = 0;
    stepsSpan.textContent = steps;

    grid = JSON.parse(JSON.stringify(levels[selected].grid));

    render();
}

function render() {
    gridDiv.innerHTML = "";

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (grid[i][j] === 1) {
                cell.classList.add("on");
            }

            cell.addEventListener("click", function () {
                toggle(i, j);
                steps++;
                stepsSpan.textContent = steps;

                render();
                checkWin();
            });

            gridDiv.appendChild(cell);
        }
    }
}

// kогіка гри
function toggle(i, j) {
    flip(i, j);
    flip(i - 1, j);
    flip(i + 1, j);
    flip(i, j - 1);
    flip(i, j + 1);
}

function flip(i, j) {
    if (i >= 0 && i < size && j >= 0 && j < size) {
        grid[i][j] = grid[i][j] === 1 ? 0 : 1;
    }
}

// перевірка перемоги
function checkWin() {
    for (let row of grid) {
        for (let cell of row) {
            if (cell === 1) return;
        }
    }

    let selected = levelSelect.value;
    let min = levels[selected].minSteps;

    if (steps === min) {
        alert("Perfect! You solved it in " + steps + " steps!");
    } else if (steps < min) {
        alert("Wow! You beat the minimum?! Steps: " + steps);
    } else {
        alert("You win in " + steps + " steps. Minimum is " + min);
    }
}
