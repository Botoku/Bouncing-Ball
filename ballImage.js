'use strict'


let boxX = 20
let boxY = 30 // x and y location of upper corner of box

const boxWidth = 350
const boxHeight = 250 //width and height of canvas box element we will be animating in

const ballRad = 20 // radius of ball

const boxBoundX = boxWidth + boxX - ballRad //right boundary
const boxBoundY = boxHeight + boxY - ballRad // bottom boundary
const inBoxBoundX = boxX + ballRad //left boundary
const inBoxBoundY = boxY + ballRad //top boundary


/* For the animation to occur and bounce off the walls and to know where the walls are
an inner box is created just inside the canvas element original box
boxBoundX is the right border line far from the origin at the top left
its easier to picture by drawing a rectangle that goes clockwise starting at the top
with inBoxBoundY..... then boxBoundX at the right... then boxBoundY athe thebottom...
and inBoxBoundX at the left completing.

there is now the original canvas element which all the animation will be done with just outside of this 
smaller box 

so the position of the center of the ball is calculated in relation to this inner box and when the ball reaches the wall its displacement value is changed
*/

let ballX = 50
let ballY = 60 // initial x and y position of the ball

let ctx

let ballVx = 4
let ballVy = 8 //vertical and horizontal displacement of the ball

let alienImg = new Image()
alienImg.src = 'Alien 06.jpg'


function init(){
    ctx = document.getElementById('canvas').getContext('2d')
    ctx.linewidth = ballRad
    ctx.fillStyle = 'rgb(200,0,50)'
    moveBall()
    setInterval(moveBall, 300)
}

function moveBall(){
    ctx.clearRect(boxX, boxY, boxWidth, boxHeight)
    moveAndCheck()
    ctx.drawImage(alienImg, ballX-ballRad, ballY-ballRad, 2*ballRad, 2*ballRad)
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight)
}



function moveAndCheck(){
    let nBallX = ballX + ballVx
    let nBallY = ballY + ballVy //this would be the next pos for the center of the circle if no wall is encountered

    if (nBallX > boxBoundX) // if the value is past the value for the right wall i.e outside the inner checking box 
    {
        ballVx = -ballVx //change the horizontal displacement to the opposite direction
        nBallX = boxBoundX // set the center of the next ball animated to be exactly on the wall bound and not beyond
    }
    if(nBallX < inBoxBoundX) // if the next center of the ball is beyond the left checking box boundary
    {
        ballVx = -ballVx 
        nBallX = inBoxBoundX 
    }
    if (nBallY > boxBoundY) // if the value is past the value for the bottom wall i.e outside the inner checking box 
    {
        ballVy = -ballVy 
        nBallY = boxBoundY 
    }
    if(nBallY < inBoxBoundY) // if the next center of the ball is beyond the top checking box boundary
    {
        ballVy = -ballVy 
        nBallY = inBoxBoundY 
    }

    ballX = nBallX
    ballY = nBallY

}

function change(){
    ballVx = Number(document.f.hv.value)
    ballVy = Number(document.f.vv.value)
    return false
}