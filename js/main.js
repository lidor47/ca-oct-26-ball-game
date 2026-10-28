'use strict'

var gBallsInterval
var gBallTimeOut
var gGameStates = []
var gIsAutoPlaying = false
var gCurrIdx
var gTimerInterval = null
var gStartTime = null

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
    onMouseLeave()
    const getBall = getBallElementsAndStyle()
    const elBalls = [getBall.elBall1, getBall.elBall2]
    elBalls.forEach(ball => {
        ball.style.height = ''
        ball.style.width = ''
        ball.style.backgroundColor = ''
        ball.innerText = 100
    })
    document.body.style.backgroundColor = ''

    gGameStates = []
    gCurrIdx = 0

    saveGameState()
    resetTimer()

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
    const ball1Size = +getBall.elBall1.innerText
    const ball2Size = +getBall.elBall2.innerText
    const gameState = {
        'backgroundColorBall1': getBall.styleBall1.backgroundColor,
        'backgroundColorBall2': getBall.styleBall2.backgroundColor,
        'ballSizeBall1': { 'height': `${ball1Size}px`, 'width': `${ball1Size}px` },
        'ballSizeBall2': { 'height': `${ball2Size}px`, 'width': `${ball2Size}px` },
        'ball1Content': getBall.elBall1.innerText, 'ball2Content': getBall.elBall2.innerText,
        'bodyBackgroundColor': getBall.styleBody.backgroundColor
    }
    const prevGameState = gGameStates[gCurrIdx]

    if (prevGameState && isSameGameState(prevGameState, gameState)) return

    if (prevGameState) startTimer()

    gGameStates.splice(gCurrIdx + 1)
    gGameStates.push(gameState)
    gCurrIdx = gGameStates.length - 1
    updateUndoRedoButtons()
    updateMovesCount()
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
    updateMovesCount()
}

function onRedo() {
    if (gCurrIdx >= gGameStates.length - 1) return
    restoreGameState(++gCurrIdx)
    updateUndoRedoButtons()
    updateMovesCount()
}

function updateUndoRedoButtons() {
    const elUndoBtn = document.querySelector('.undo-btn')
    const elRedoBtn = document.querySelector('.redo-btn')

    elUndoBtn.disabled = gCurrIdx <= 0
    elRedoBtn.disabled = gCurrIdx >= gGameStates.length - 1
}

function updateMovesCount() {
    const elCounter = document.querySelector('.counter')
    elCounter.innerText = gCurrIdx
}

function startTimer() {
    if (gTimerInterval !== null) return

    const elTimer = document.querySelector('.game-timer')
    if (!elTimer) return

    gStartTime = Date.now()
    updateTimer()

    gTimerInterval = setInterval(updateTimer, 1000)
}

function updateTimer() {
    if (gStartTime === null) return

    const elTimer = document.querySelector('.game-timer')
    if (!elTimer) return

    const elapsedTime = Date.now() - gStartTime
    const totalSeconds = Math.floor(elapsedTime / 1000)

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    const displayMinutes = minutes < 10 ? '0' + minutes : minutes
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds

    elTimer.innerText = `${displayMinutes}:${displaySeconds}`
}

function stopTimer() {
    if (gTimerInterval === null) return

    clearInterval(gTimerInterval)
    gTimerInterval = null
}

function resetTimer() {
    stopTimer()
    gStartTime = null

    const elTimer = document.querySelector('.game-timer')
    if (elTimer) elTimer.innerText = '00:00'
}

function isSameGameState(state1, state2) {
    return (
        state1.backgroundColorBall1 === state2.backgroundColorBall1 &&
        state1.backgroundColorBall2 === state2.backgroundColorBall2 &&
        state1.ballSizeBall1.height === state2.ballSizeBall1.height &&
        state1.ballSizeBall1.width === state2.ballSizeBall1.width &&
        state1.ballSizeBall2.height === state2.ballSizeBall2.height &&
        state1.ballSizeBall2.width === state2.ballSizeBall2.width &&
        state1.ball1Content === state2.ball1Content &&
        state1.ball2Content === state2.ball2Content &&
        state1.bodyBackgroundColor === state2.bodyBackgroundColor
    )
}