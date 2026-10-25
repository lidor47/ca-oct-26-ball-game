'use strict'

function onBallClick(elBtn, maxDiameter) {
    var ballSize = +elBtn.innerText
    ballSize += getRandomInt(20, 61)
    if (ballSize >= maxDiameter) ballSize = 100

    elBtn.style.height = `${ballSize}px`
    elBtn.style.width = `${ballSize}px`
    elBtn.innerText = ballSize

}