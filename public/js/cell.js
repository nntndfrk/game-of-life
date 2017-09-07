class Cell {
    constructor({ element, row, col, alive = false }) {
        this.element = document.createElement('td');
        this.row = row;
        this.col = col;
        this._alive = alive;
        this.init();
    }

    get alive() {
        return this._alive;
    }

    set alive(value) {
        this._alive = value
        if (this._alive) {
            this.element.classList.add('alive');
        } else {
            this.element.classList.remove('alive');
        }
    }

    init() {
        this.element.className = 'cell';
        if (this.alive) this.element.classList.add('alive');
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        this.alive = !this.alive;
    }
}