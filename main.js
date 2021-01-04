const counter = document.querySelector('.counter')
const bigCookie = document.querySelector('.big-cookie')

import * as workers from './workers.js';


function updageDisplayCookies() {
    counter.innerHTML = localStorage.getItem('cookie')
}

document.addEventListener("DOMContentLoaded", function () {
    localStorage.getItem('cookie') === null ? localStorage.setItem('cookie', 0) : null
    gameTick()
});

function gameTick() {
    updateCookies()
    updageDisplayCookies()
    workers.checkWorkersAvalible()
}

setInterval(() => {
    gameTick()
}, 1000);

function updateCookies() {
    let nowCookies = Number(localStorage.getItem('cookie'))
    let newCookies = nowCookies + Number(workers.totalAdsPerSecond())
    localStorage.setItem('cookie', newCookies)
}
