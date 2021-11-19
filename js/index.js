import block from "./components/block.component.js";

let tl = gsap.timeline();

const sections = document.querySelectorAll('.sections');
const images = document.querySelectorAll('.section_bg');
const clouds = [...document.querySelectorAll('.cloud')];

const instruction = document.querySelector('#character h1');
const standing = document.getElementById('standing');
const running = document.getElementById('running');

const cursor = document.querySelector('.cursor');

const section_2 = sections[1];
const s2_bg = images[1];

const section_3 = sections[2];
const s3_bg = images[2];

const section_4 = sections[3];
const s4_bg = images[4];

// Original position
const instructionOP = '-10rem';
const nearTen = (Math.round(sections[0].offsetWidth / 10) * 10);
const colors = ['#F15946', '#68A691', '#F15946', '#F9C22E', '#68A691']

let position = {
    x: 0,
    y: 0
}

let movement = ['running'];

document.addEventListener('keydown', function() {
    instruction.style.transform = `translateY(${instructionOP})`;
})

document.addEventListener('wheel', function (event) {
    movement = [];

    instruction.style.transform = `translateY(-${nearTen / 2}px)`;

    if (event.deltaX !== 0) {
        instruction.style.transform = `translateY(${instructionOP})`;
        movement = ['running'];
        return;
    }

    let xEventValue = -1;
    if (event.deltaY < 0) {
        xEventValue = 1;
        instruction.style.transform = `translateY(${instructionOP})`;
    }

    // Disable page scrolling, modes[event.deltaMode]=='page'
    if (event.deltaMode > 1) return false;

    if (xEventValue === -1) running.style.transform = 'scaleX(-1)';
    else running.style.transform = 'none';

    position.x = position.x + (xEventValue * 10);

    clouds.forEach((cloud, idx) => {
        cloud.style.setProperty('transform', "translate(" + Math.round(position.x + 5) * (idx % (clouds.length / 10)) + "px," + 0 + "px)")
    });

    sections.forEach((section) => {
        section.style.setProperty('transform', "translate(" + Math.round(position.x + 5) + "px," + 0 + "px)")
    })

    if (Math.abs(position.x) % nearTen === 0) {
        for (let i = 0; i < sections.length; i++) {
            if (Math.abs(position.x) / nearTen === i + 1) {
                instruction.style.color = colors[i];
            }    
        }
    }
})

tl.set(cursor, {
  xPercent: 5,
  yPercent: 5
});

section_2.addEventListener('mousemove', (event) => {
    cursor.innerHTML = "Welcome";
    
    gsap.to(cursor, {
        duration: 0.5,
        ease: "power1.out",
        x: event.clientX,
        y: event.clientY
    })
})

let interval = null;
let shakeNum = 1;
let destruction = ['stopped'];

section_3.addEventListener('mousemove', function (event) {
    destruction = [];
    shakeNum += 1;

    clearTimeout(interval);
    
    const { clientX: x, clientY: y } = event;
    const { offsetWidth: width, offsetHeight: height } = this;

    let zeroX = width / 2;
    let zeroY = height / 2;

    let bsX = (zeroX - x) * 1.25;
    let bsY = (zeroY - y) * 1.25;
    
    let rX = bsX - (bsX * 0.1);
    let rY = bsY - (bsY * 0.1);;

    s3_bg.style.setProperty('transform', `translate(${-1 * bsX}px, ${-1 * bsY}px)`);

    interval = setTimeout(() =>{ 
        s3_bg.style.setProperty('transform', `translate(${-1 * rX}px, ${-1 * rY}px)`);
    }, 250);

    if (shakeNum % 25 === 0) {
        section_3.appendChild(block(section_3));
        setTimeout(() => {
            section_3.removeChild(document.querySelector('.block'));
        }, 5000);
    }
});

const render = () => {
    if (movement.length === 1) {
        standing.style.setProperty('opacity', '1')
        running.style.setProperty('opacity', '0')
    } else {
        standing.style.setProperty('opacity', '0')
        running.style.setProperty('opacity', '1')
    }

    if (destruction.length === 1) {
        destruction.innerHTML = "";
    }

    movement = ['running'];
    destruction = ['stopped'];

    setTimeout(() => {
        render();
    }, 100);
}

render();

