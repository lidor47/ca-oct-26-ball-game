'use strict'
var gBallSize = 100

function onBallClick(elBtn) {
    gBallSize += 50
    elBtn.style.height = `${gBallSize}px`
    elBtn.style.width = `${gBallSize}px`

    elBtn.innerText = gBallSize
}