import getRandom from "./helpers/getRandom.js";

const main = document.getElementById('main');
const sections = document.querySelectorAll('.sections');
const instruction = document.querySelector('#character h1');

const arr = [...document.querySelectorAll('.cloud')];
const clouds = getRandom(arr, arr.length);

const standing = document.getElementById('standing');
const running = document.getElementById('running');

let position = {
    x: 0,
    y: 0
}

let movement = ['running'];

window.addEventListener('keydown', function() {
    instruction.style.opacity = 1;
})

window.addEventListener('wheel', function (event) {
    movement = [];

    instruction.style.opacity = 0;

    if (event.deltaX !== 0) {
        instruction.style.opacity = 1;
        movement = ['running'];
        return;
    }

    let xEventValue = -1;
    if (event.deltaY < 0) {
        xEventValue = 1
        instruction.style.opacity = 1;
    }

    // Disable page scrolling, modes[event.deltaMode]=='page'
    if (event.deltaMode > 1) return false;

    if (xEventValue === -1) running.style.transform = 'scaleX(-1)';
    else running.style.transform = 'scaleX(1)';

    position.x = position.x + (xEventValue * 10);

    clouds.forEach((cloud, idx) => {
        cloud.style.setProperty('transform', "translate(" + Math.round(position.x) * (idx % (clouds.length / 10)) + "px," + 0 + "px)")
    });

    sections.forEach((section) => {
        section.style.setProperty('transform', "translate(" + Math.round(position.x) + "px," + 0 + "px)")
    })
})

const render = () => {
    if (movement.length === 1) {
        standing.style.setProperty('opacity', '1')
        running.style.setProperty('opacity', '0')
    } else {
        standing.style.setProperty('opacity', '0')
        running.style.setProperty('opacity', '1')
    }

    movement = ['running'];

    setTimeout(() => {
        render();
    }, 100);
}

render();

