class Grid {
    constructor({ element, size }) {
        this.element = element;
        this.size = size;
        this.init();
    }

    init() {
        this.table = document.createElement('table');
        this.lifeGeneration = [];
        for (let i = 0; i < this.size; i++) {
            let tr = document.createElement('tr');
            this.lifeGeneration.push([]);
            for (let j = 0; j < this.size; j++) {
                let cell = new Cell({element: document.createElement('td'), row: i, col: j});
                this.lifeGeneration[i].push(cell);
                tr.appendChild(cell.element);
            }

            this.table.appendChild(tr);
        }

        this.element.appendChild(this.table);
    }

    _removeChildren(elem) {
        while (elem.lastChild) {
            elem.removeChild(elem.lastChild);
        }
    }

    countNeighbors(cell, grid) {
        let x = cell.row;
        let y = cell.col;
        let count = 0;
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                let nX = x + dx;
                let nY = y + dy;
                nX = (nX < 0) ? this.size - 1 : nX;
                nY = (nY < 0) ? this.size - 1 : nY;
                nX = (nX > this.size - 1) ? 0 : nX;
                nY = (nY > this.size - 1) ? 0 : nY;
                count += (grid[nX][nY]['alive']) ? 1 : 0;
            }
        }
        if (grid[x][y]['alive']) count--;
        return count;
    }

    reset() {
        this._removeChildren(this.table);
        this.lifeGeneration = [];
        for (let i = 0; i < this.size; i++) {
            let tr = document.createElement('tr');
            this.lifeGeneration.push([]);
            for (let j = 0; j < this.size; j++) {
                let cell = new Cell({element: document.createElement('td'), row: i, col: j});
                this.lifeGeneration[i].push(cell);
                tr.appendChild(cell.element);
            }

            this.table.appendChild(tr);
        }

        this.element.appendChild(this.table);
    }

    randomize() {
        this._removeChildren(this.table);
        this.lifeGeneration = [];
        for (let i = 0; i < this.size; i++) {
            let tr = document.createElement('tr');
            this.lifeGeneration.push([]);
            for (let j = 0; j < this.size; j++) {
                let cell = new Cell({element: document.createElement('td'), row: i, col: j, alive: Boolean(Math.round(Math.random()))});
                this.lifeGeneration[i].push(cell);
                tr.appendChild(cell.element);
            }

            this.table.appendChild(tr);
        }

        this.element.appendChild(this.table);
    }

    next() {
        let nextGeneration = this.lifeGeneration.slice(0);
        this._removeChildren(this.table);
        this.lifeGeneration = [];
        for (let i = 0; i < this.size; i++) {
            let tr = document.createElement('tr');
            this.lifeGeneration.push([]);
            for (let j = 0; j < this.size; j++) {
                let isAlive = false;
                let numNeighbors = this.countNeighbors(nextGeneration[i][j], nextGeneration)
                if (nextGeneration[i][j]['alive']) {
                    if (numNeighbors < 2) {
                        isAlive = false;
                    } else if (numNeighbors === 2 || numNeighbors === 3) {
                        isAlive = true;
                    } else if (numNeighbors > 3) {
                        isAlive = false;
                    }
                } else {
                    if (numNeighbors === 3) {
                        isAlive = true;
                    }
                }
                let cell = new Cell({element: document.createElement('td'), row: i, col: j, alive: isAlive});
                this.lifeGeneration[i].push(cell);
                tr.appendChild(cell.element);
            }

            this.table.appendChild(tr);
        }

        this.element.appendChild(this.table);

    }
}