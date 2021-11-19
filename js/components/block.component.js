function block() {
    const img = document.createElement('img');
    img.setAttribute('src', './assets/block.webp');
    img.classList.add('block');

    img.style.top = `-${Math.floor((Math.random() + 0.3) * 100)}%`;
    img.style.left = `${Math.floor(Math.random() * 100)}%`;
    img.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;

    setTimeout(() => {
        img.style.top = `120%`;
    }, Math.ceil((Math.random() + 0.1) * 2) * 1000);

    return img;
}

export default block;