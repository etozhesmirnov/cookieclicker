const bigCookie = document.querySelector('.big-cookie')
const waves = document.querySelector('.waves')
const wavesParalax = document.querySelectorAll('.waveParallax')
rotated = false;

setInterval(() => {
    rotated = !rotated
    bigCookie.style.transition = '2s'
    bigCookie.style.transform = 'rotate(' + Number(rotated) * 5 + 'deg)'
}, 1000);

waves.style.height = '10vh'

function fillOfWave(index, color) {
    // fill="rgba(255, 255, 255,0.1)"
    wavesParalax[index].setAttribute('fill', fill = color)
}

fillOfWave(0, "rgba(255, 255, 255,0.1)")
fillOfWave(1, "rgba(155, 155, 155,0.3)")
fillOfWave(2, "rgba(222, 222, 222,0.6)")
fillOfWave(3, "rgba(111, 111, 111,0.6)")