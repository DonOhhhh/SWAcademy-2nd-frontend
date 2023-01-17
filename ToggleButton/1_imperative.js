const buttons = []
const main = document.querySelector('body');

for(let i = 1 ; i <= 3 ; i++) {
    buttons.push(document.createElement('button'))
    buttons[i-1].textContent = `button${i}`;
    main.appendChild(button);
}

for(const button of buttons) {
    button.addEventListener('click', (e) => {
        e.target.style.textDecoration = e.target.style.textDecoration === 'line-through' ? 'none' : 'line-through'
    })
}