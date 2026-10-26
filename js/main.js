'use strict'

var gBallsInterval
var gBallTimeOut
var gGameStates = []
var gIsAutoPlaying = false
var gCurrIdx

function onInit() {
    gCurrIdx = 0
    saveGameState()
}



function onBallClick(elBtn, maxDiameter) {
    var ballSize = +elBtn.innerText
    ballSize += getRandomInt(20, 61)
    if (ballSize >= maxDiameter) ballSize = 100

    elBtn.style.height = `${ballSize}px`
    elBtn.style.width = `${ballSize}px`
    elBtn.innerText = ballSize
    elBtn.style.backgroundColor = getRandomColor()

    if (!gIsAutoPlaying) saveGameState()
}

function getBallElementsAndStyle() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    const styleBall1 = getComputedStyle(elBall1)
    const styleBall2 = getComputedStyle(elBall2)
    const body = document.body
    const styleBody = getComputedStyle(body)
    return { elBall1, elBall2, styleBall1, styleBall2, body, styleBody }
}

function onBall3Click() {
    const getBall = getBallElementsAndStyle()
    swapBackgroundColor(getBall.elBall1, getBall.elBall2)
    swapBallSize(getBall.elBall1, getBall.elBall2)

    if (!gIsAutoPlaying) saveGameState()
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
    const getBall = getBallElementsAndStyle()
    reduceDiameter(getBall.elBall1, getBall.elBall2)

    if (!gIsAutoPlaying) saveGameState()
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

    saveGameState()
}

function onBall6Click() {
    const getBall = getBallElementsAndStyle()
    const elBalls = [getBall.elBall1, getBall.elBall2]
    elBalls.forEach(ball => {
        ball.style.height = ''
        ball.style.width = ''
        ball.style.backgroundColor = ''
        ball.innerText = 100
    })
    document.body.style.backgroundColor = ''

    saveGameState()
}

function onMouseEnter() {
    var counter = 0
    gBallTimeOut = setTimeout(() => {
        gBallsInterval = setInterval(() => {
            gIsAutoPlaying = true
            const getBall = getBallElementsAndStyle()
            onBallClick(getBall.elBall1, 400)
            onBallClick(getBall.elBall2, 300)
            onBall3Click()
            onBall4Click()
            counter++
            if (counter >= 10) {
                clearInterval(gBallsInterval)
                gBallsInterval = null
            }
            gIsAutoPlaying = false
            saveGameState()
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



function saveGameState() {

    const getBall = getBallElementsAndStyle()
    const gameState = {
        'backgroundColorBall1': getBall.styleBall1.backgroundColor,
        'backgroundColorBall2': getBall.styleBall2.backgroundColor,
        'ballSizeBall1': { 'height': getBall.styleBall1.height, 'width': getBall.styleBall1.width },
        'ballSizeBall2': { 'height': getBall.styleBall2.height, 'width': getBall.styleBall2.width },
        'ball1Content': getBall.elBall1.innerText, 'ball2Content': getBall.elBall2.innerText,
        'bodyBackgroundColor': getBall.styleBody.backgroundColor
    }
    gGameStates.splice(gCurrIdx + 1)
    gGameStates.push(gameState)
    gCurrIdx = gGameStates.length - 1
    updateUndoRedoButtons()
}

function restoreGameState(idx) {
    const getBall = getBallElementsAndStyle()
    const currGameState = gGameStates[idx]

    getBall.elBall1.style.backgroundColor = currGameState.backgroundColorBall1
    getBall.elBall1.style.height = currGameState.ballSizeBall1.height
    getBall.elBall1.style.width = currGameState.ballSizeBall1.width
    getBall.elBall1.innerText = currGameState.ball1Content

    getBall.elBall2.style.backgroundColor = currGameState.backgroundColorBall2
    getBall.elBall2.style.height = currGameState.ballSizeBall2.height
    getBall.elBall2.style.width = currGameState.ballSizeBall2.width
    getBall.elBall2.innerText = currGameState.ball2Content

    getBall.body.style.backgroundColor = currGameState.bodyBackgroundColor
}
function onUndo() {
    if (gCurrIdx <= 0) return
    restoreGameState(--gCurrIdx)
    updateUndoRedoButtons()
}

function onRedo() {
    if (gCurrIdx >= gGameStates.length - 1) return
    restoreGameState(++gCurrIdx)
    updateUndoRedoButtons()
}

function updateUndoRedoButtons() {
    const elUndoBtn = document.querySelector('.undo-btn')
    const elRedoBtn = document.querySelector('.redo-btn')

    elUndoBtn.disabled = gCurrIdx <= 0
    elRedoBtn.disabled = gCurrIdx >= gGameStates.length - 1
}