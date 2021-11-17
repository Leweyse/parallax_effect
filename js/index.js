
const main = document.getElementById('main');
const sections = document.querySelectorAll('.sections');
const arr = [...document.getElementsByClassName('cloud')];

const clouds = getRandom(arr, arr.length);

let position = {
    x: 0,
    y: 0
}

window.addEventListener('wheel', function (event) {
    let deltabs = 1;
    if (event.deltaY < 0) deltabs = -1;

    // Disable page scrolling, modes[event.deltaMode]=='page'
    if (event.deltaMode > 1) return false;

    position.y = position.y + (deltabs * 10);

    clouds.forEach((cloud, idx) => {
        cloud.style.setProperty('transform', "translate(" + Math.round(position.y) * ((idx % (clouds.length / 2)) + 1) + "px," + position.x + "px)")
    });

    sections.forEach((section) => {
        section.style.setProperty('transform', "translate(" + Math.round(position.y) + "px," + position.x + "px)")
    })

    return false;
})
