class Game {
    constructor({ element, grid }) {
        this.element = element;
        this.grid = grid;
        this.isPlaying = false;
        this.speed = 0;
        this.init();
    }

    init() {
        this.playButton = document.querySelector('#play-button');
        this.playButton.addEventListener('click', this.handlePlayButtonClick.bind(this));
        this.resetButton = document.querySelector('#reset-button');
        this.resetButton.addEventListener('click', this.handleResetButtonClick.bind(this));
        this.randomButton = document.querySelector('#randomize-button');
        this.randomButton.addEventListener('click', this.handleRandomizeButtonClick.bind(this));
        this.speedSlider = document.querySelector('#speed-slider');
        this.speedSlider.addEventListener('input', this.handleSpeedSliderChange.bind(this));
    }

    play() {
        this.isPlaying = true;
        this.playButton.textContent = 'pause';
        this.grid.next();
    }

    pause() {
        this.isPlaying = false;
        this.playButton.textContent = 'play_arrow';
        clearInterval(this.interval);
    }

    reset() {
        this.isPlaying = false;
        this.playButton.textContent = 'play_arrow';
        this.grid.reset();
        this.speedSlider.value = 0;
        this.speed = 0;
        clearInterval(this.interval);
    }

    randomize(event) {
        if (this.isPlaying) {
            event.preventDefault();
        } else {
            this.reset();
            this.grid.randomize();
        }
    }

    handlePlayButtonClick(event) {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
            this.interval = setInterval(this.play.bind(this), 1000 - this.speed);
        }
    }

    handleResetButtonClick(event) {
        this.reset();
    }

    handleRandomizeButtonClick(event) {
        this.randomize(event);
    }

    handleSpeedSliderChange(event) {
        let sliderVal = event.target.value;
        this.speed = sliderVal;
        clearInterval(this.interval);
        this.interval = setInterval(this.play.bind(this), 1000 - this.speed);
    }
}