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
    'click',
    'grandmother',
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

let workers = JSON.parse(JSON.stringify(DefaultWorkers))
console.log(workers)

function getCookiesGiveTotal(worker) {
    return worker.multiply * worker.numberOf * worker.cookiesGive
}

workers.forEach((worker, index) => {

    // bigCookie
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
    // not bigCookie
    else {

        let btn = document.createElement('button')
        btn.addEventListener('click', function () {
            checkWorkersAvalible()

            let workers = JSON.parse(localStorage.getItem('workers'))
            let cookies = localStorage.getItem('cookie')
            let newPrice = worker.price / 100 * 150
            newPrice = Math.round(newPrice);

            if (cookies > newPrice) {
                worker.numberOf++
                let newCookies = cookies - Number(newPrice)
                localStorage.setItem('cookie', newCookies)
                workers[index].price = newPrice
                workers = JSON.stringify(workers)
                localStorage.setItem('workers', workers)
                renderWorkersDisplay()
            } else {
                console.log('not enough cokie')
                checkWorkersAvalible()
            }
        })
        btn.className = 'workersBtn'
        btn.innerHTML = worker.type
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

function checkWorkersAvalible() {
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



export { workers, totalAdsPerSecond, getCookiesGiveTotal, checkWorkersAvalible };