// import * as workers from './workers.js';
import { renderWorkersDisplay } from './display.js'

const buttonsWrapper = document.querySelector('.upgrades__buttons')

class Worker {
    constructor(type, multiply, price, numberOf, cookiesGive) {
        this.type = type
        this.multiply = multiply
        this.price = price
        this.cookiesGive = cookiesGive
        this.numberOf = numberOf
        this.getCookiesGiveTotal = getCookiesGiveTotal(this)
    }
}
let DefaultWorkers = []
const workerTypes = [
    'mouseClick',
    'cursor',
    'grand',
    'fermer',
    'factory'
]
DefaultWorkers.push(
    //          type, multiply, price, numberOf, cookiesGive
    new Worker(workerTypes[0], 1, 100, 1, 1),
    new Worker(workerTypes[1], 1, 100, 1, 2),
    new Worker(workerTypes[2], 1, 200, 1, 3),
    new Worker(workerTypes[3], 1, 300, 1, 4),
    new Worker(workerTypes[4], 1, 400, 1, 5)
)

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('workers') === null) {
        let workers = JSON.stringify(DefaultWorkers)
        localStorage.setItem('workers', workers)
    }
    renderWorkersDisplay()
    checkWorkersAvalible()
});

function getCookiesGiveTotal(worker) {
    return worker.multiply * worker.numberOf * worker.cookiesGive
}

function saveLocalCookies(value) {
    value = Number(value)
    localStorage.setItem('cookie', value)
}

function saveLocalWorkers(workers) {
    workers = JSON.stringify(workers)
    localStorage.setItem('workers', workers)
    console.log('localWorkers saved')

}
let workers = JSON.parse(localStorage.getItem('workers'))

workers.forEach((worker, index) => {
    let newPrice;
    // newPrice = Math.round(worker.price / 100 * 150);


    // if bigCookie
    if (index == 0) {
        bigCookie.addEventListener('click', function () {
            // add and display new cookies instant if mouse click 
            let cookiesTotal = workers[0].cookiesGive * workers[0].multiply
            let nowCookies = Number(localStorage.getItem('cookie'))
            let newCookies = nowCookies + cookiesTotal
            localStorage.setItem('cookie', newCookies)
            document.querySelector('.counter').innerHTML = localStorage.getItem('cookie')
        })
        bigCookie.classList.add('workersBtn')
    }
    // if not bigCookie
    else {
        let btn = document.createElement('button')
        btn.innerHTML = worker.type + ' = ' + JSON.parse(localStorage.getItem('workers'))[index].price
        btn.addEventListener('click', function () {
            checkWorkersAvalible(index)
            let workers = JSON.parse(localStorage.getItem('workers'))
            // console.log('workers = ' + workers)
            let cookies = localStorage.getItem('cookie')
            newPrice = worker.price / 100 * 150
            newPrice = Math.round(newPrice);
            worker.price = newPrice
            if (cookies > newPrice) {
                // enough cookie
                workers[index].numberOf++
                workers[index].price = newPrice
                console.log(workers[index].numberOf)
                let newCookies = cookies - Number(newPrice)
                saveLocalCookies(newCookies)
                saveLocalWorkers(workers)
                btn.innerHTML = worker.type + ' = ' + newPrice
                renderWorkersDisplay()
                checkWorkersAvalible(index)
            } else {
                // not enough cokie
                checkWorkersAvalible(index)
            }
        })

        btn.className = 'workersBtn'

        buttonsWrapper.appendChild(btn)
    }

})


function totalAdsPerSecond() {
    let arr = [];
    let workers = JSON.parse(localStorage.getItem('workers'))
    workers.forEach(worker => arr.push(getCookiesGiveTotal(worker)))
    let sum = arr.reduce((a, b) => a + b, 0)
    return sum
}

function checkWorkersAvalible(index) {
    let cookies = localStorage.getItem('cookie')

    document.querySelectorAll('.workersBtn').forEach((btn, index) => {
        if (index > 0) {
            if (cookies < workers[index].price) {
                btn.disabled = true
            } else {
                btn.disabled = false
            }
        }
    })
}

export { totalAdsPerSecond, getCookiesGiveTotal, checkWorkersAvalible };