// import * as workers from './workers.js';

function renderWorkersDisplay() {
    let display = document.querySelector('.display')
    let workersList = JSON.parse(localStorage.getItem('workers'))

    // clean the container
    display.innerHTML = ''
    workersList.forEach((worker, index) => {
        if (index > 0) {
            let item = document.createElement('div')
            item.className = 'd-flex align-items-center m-1 border'
            item.style.overflow = 'hidden'
            item.style.height = '100px'
            item.style.background = "('.img/grand.png')"
            item.style.position = 'relative'
            let name = document.createElement('h2')
            name.style.marginTop = '-50px'
            name.innerHTML = worker.type
            let number = document.createElement('p')
            number.style.marginTop = '-50px'
            number.innerHTML = worker.numberOf
            display.appendChild(item)
            item.appendChild(name)
            item.appendChild(number)

            function renderPngs(pngPath, numberOf) {
                // do not render waste
                numberOf > 20 ? numberOf = 20 : null

                for (let i = 0; i < numberOf; i++) {
                    let img = document.createElement('img')
                    img.src = './img/' + pngPath + '.png'
                    img.style.position = 'absolute'
                    img.style.left = i * 30 + 'px'
                    img.style.bottom = '0'
                    img.style.height = '50px'
                    console.log(worker.numberOf)
                    item.appendChild(img)
                }
            }
            if (worker.type == 'click') {
                renderPngs('cursor', worker.numberOf)
            }
            if (worker.type == 'grandmother') {
                renderPngs('grand', worker.numberOf)
            }
            if (worker.type == 'fermer') {
                renderPngs('fermer', worker.numberOf)
            }
            if (worker.type == 'factory') {
                renderPngs('factory', worker.numberOf)
            }

        }
    });
    console.log('refreshed')
}



export { renderWorkersDisplay };