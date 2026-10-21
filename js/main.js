'use strict'
var gBallSize = 100

function onBallClick(elBtn) {
    gBallSize += 50
    if (gBallSize > 400) gBallSize = 100

    elBtn.style.height = `${gBallSize}px`
    elBtn.style.width = `${gBallSize}px`
    elBtn.innerText = gBallSize

}