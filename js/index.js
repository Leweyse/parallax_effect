let tl = gsap.timeline();

const sections = document.querySelectorAll('.sections');
const clouds = [...document.querySelectorAll('.cloud')];

const instruction = document.querySelector('#character h1');
const standing = document.getElementById('standing');
const running = document.getElementById('running');

const cursor = document.querySelector('.cursor');

const nearTen = (Math.round(sections[0].offsetWidth / 10) * 10);
const colors = ['#F15946', '#694F5D', '#F15946', '#F9C22E', '#68A691']

let position = {
    x: 0,
    y: 0
}

let movement = ['running'];

document.addEventListener('keydown', function() {
    instruction.style.opacity = 1;
})

document.addEventListener('wheel', function (event) {
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
    else running.style.transform = 'none';

    position.x = position.x + (xEventValue * 10);

    clouds.forEach((cloud, idx) => {
        cloud.style.setProperty('transform', "translate(" + Math.round(position.x) * (idx % (clouds.length / 10)) + "px," + 0 + "px)")
    });

    sections.forEach((section) => {
        section.style.setProperty('transform', "translate(" + Math.round(position.x) + "px," + 0 + "px)")
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

sections[1].addEventListener('mousemove', (event) => {
    cursor.innerHTML = "Welcome";
    
    gsap.to(cursor, {
        duration: 0.5,
        ease: "power1.out",
        x: event.clientX,
        y: event.clientY
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

