Array.from([1,2,3])
    .map(i => {
        const button = document.createElement('button');
        button.textContent = `button${i}`;
        button.addEventListener('click',(e) => 
            e.target.style.textDecoration = e.target.style.textDecoration === 'line-through' ? 'none' : 'line-through'
        )
        document.querySelector('body').appendChild(button);
    })