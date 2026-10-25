'use strict'

var gBallsInterval
var gBallTimeOut

function onBallClick(elBtn, maxDiameter) {
    var ballSize = +elBtn.innerText
    ballSize += getRandomInt(20, 61)
    if (ballSize >= maxDiameter) ballSize = 100

    elBtn.style.height = `${ballSize}px`
    elBtn.style.width = `${ballSize}px`
    elBtn.innerText = ballSize
    elBtn.style.backgroundColor = getRandomColor()

}

function getBallElements() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    return { elBall1, elBall2 }
}

function onBall3Click() {
    const getBall = getBallElements()
    swapBackgroundColor(getBall.elBall1, getBall.elBall2)
    swapBallSize(getBall.elBall1, getBall.elBall2)
}

function swapBackgroundColor(elBall1, elBall2) {
    const ballStyle1 = getComputedStyle(elBall1)
    var backgroundColorBall1 = ballStyle1.backgroundColor
    const ballStyle2 = getComputedStyle(elBall2)
    var backgroundColorBall2 = ballStyle2.backgroundColor
    elBall1.style.backgroundColor = backgroundColorBall2
    elBall2.style.backgroundColor = backgroundColorBall1
}

function swapBallSize(elBall1, elBall2) {
    const ball1Content = elBall1.innerText
    const ball2Content = elBall2.innerText

    elBall1.style.height = `${ball2Content}px`
    elBall1.style.width = `${ball2Content}px`
    elBall1.innerText = ball2Content

    elBall2.style.height = `${ball1Content}px`
    elBall2.style.width = `${ball1Content}px`
    elBall2.innerText = ball1Content
}

function onBall4Click() {
    const getBall = getBallElements()
    reduceDiameter(getBall.elBall1, getBall.elBall2)
}

function reduceDiameter(elBall1, elBall2) {
    const balls = [elBall1, elBall2]
    balls.forEach(elBall => {
        var size = +elBall.innerText - getRandomInt(20, 61)
        if (size < 100) size = 100
        elBall.style.height = `${size}px`
        elBall.style.width = `${size}px`
        elBall.innerText = size
    })
}

function onBall5Click() {
    document.body.style.backgroundColor = getRandomColor()
}

function onBall6Click() {
    const getBall = getBallElements()
    const elBalls = [getBall.elBall1, getBall.elBall2]
    elBalls.forEach(ball => {
        ball.style.height = ''
        ball.style.width = ''
        ball.style.backgroundColor = ''
        ball.innerText = 100
    })
    document.body.style.backgroundColor = ''
}

function onMouseEnter() {
    var counter = 0
    gBallTimeOut = setTimeout(() => {
        gBallsInterval = setInterval(() => {
            const getBall = getBallElements()
            onBallClick(getBall.elBall1, 400)
            onBallClick(getBall.elBall2, 300)
            onBall3Click()
            onBall4Click()
            counter++
            if (counter >= 10) {
                clearInterval(gBallsInterval)
                gBallsInterval = null
            }
        }, 2000)
        gBallTimeOut = null
    }, 2000)
}

function onMouseLeave() {
    if (gBallTimeOut) {
        clearTimeout(gBallTimeOut)
        gBallTimeOut = null
    }
    if (gBallsInterval) {
        clearInterval(gBallsInterval)
        gBallsInterval = null
    }
}