'use strict'

function onBallClick(elBtn, maxDiameter) {
    var ballSize = +elBtn.innerText
    ballSize += getRandomInt(20, 61)
    if (ballSize >= maxDiameter) ballSize = 100

    elBtn.style.height = `${ballSize}px`
    elBtn.style.width = `${ballSize}px`
    elBtn.innerText = ballSize

}

function onBall3Click() {
    swapBackgroundColor()
    swapBallSize()
}

function swapBackgroundColor() {
    const elBall1 = document.querySelector('.ball1')
    const ballStyle1 = getComputedStyle(elBall1)
    var backgroundColorBall1 = ballStyle1.backgroundColor
    const elBall2 = document.querySelector('.ball2')
    const ballStyle2 = getComputedStyle(elBall2)
    var backgroundColorBall2 = ballStyle2.backgroundColor
    elBall1.style.backgroundColor = backgroundColorBall2
    elBall2.style.backgroundColor = backgroundColorBall1

}

function swapBallSize() {
    const elBall1 = document.querySelector('.ball1')
    const ball1Content = elBall1.innerText

    const elBall2 = document.querySelector('.ball2')
    const ball2Content = elBall2.innerText
    elBall1.style.height = `${ball2Content}px`
    elBall1.style.width = `${ball2Content}px`
    elBall1.innerText = ball2Content

    elBall2.style.height = `${ball1Content}px`
    elBall2.style.width = `${ball1Content}px`
    elBall2.innerText = ball1Content


}