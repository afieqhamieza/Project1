let mainGameObj;
function startGame() {
    var canvas = document.getElementById('gameSurface');
    var gl = canvas.getContext('webgl');

    // Create Game Object
    mainGameObj = new Game(canvas, gl);

    // Start Gamess
    mainGameObj.start();

    window.requestAnimationFrame(g_frameEventHndlr);

    canvas.onmousedown = function(e, _canvas)
    {  

        scaledY = scaleInRange(e.clientY,0,canvas.height,-1,1);
        scaledX = scaleInRange((canvas.width-e.clientX),0,canvas.width,-1,1)

        g_clickEventHndlr(scaledX,scaledY);
    };
}

f

function scaleInRange(_x,_minIn,_maxIn,_minOut,_maxOut)
{
   return Math.round((((_maxIn - _minIn)/(_maxOut - _minOut)) - _x)*(_maxOut - _minOut) / (_maxIn - _minIn)*100)/100
}

function collision(bact1, bact2) {
    var xDist = bact2.getX() - bact1.getX();
    var yDist = bact2.getY() - bact1.getY();
    var rad = bact1.getRadius() + bact2.getRadius();

    var totalDist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    if ((totalDist - rad) < 0) {
        return true;
    }

    return false;
}

//---------------------------------------------------------
// Frame
//---------------------------------------------------------

function g_frameEventHndlr() {
    mainGameObj.update();


    window.requestAnimationFrame(g_frameEventHndlr);
}

<<<<<<< HEAD
//---------------------------------------------------------
=======
function g_clickEventHndlr(_x, _y) {
    if (!mainGameObj.win()) {
        //something = something + 1;
        console.log(_x, _y)

        mainGameObj.destroy(0);

        /*
    for (let i= 0; i < 5; i++) 
    {
        if(mainGameObj.bactArr[i].clicked(_x,_y) == true)
        {
            console.log(i, "was clicked");
        }
        else
        {
            console.log(i, "was not clicked");
        }
        
        //const element = array[index];  
    }
    //*/

        //mainGameObj.update();

        //window.requestAnimationFrame(g_frameEventHndlr);

    }
}
/*
document.getElementById("gameSurface").addEventListener("mousedown", mouseDown);
document.getElementById("gameSurface").addEventListener("mouseup", mouseUp);

function mouseDown() {
  document.getElementById("demo").innerHTML = "The mouse button is held down.";
}

function mouseUp() {
  document.getElementById("demo").innerHTML = "You released the mouse button.";
}
//*/
// -------------------------------------------------------
>>>>>>> fe0210e0521184e3dcf5a1bf6dcfad2facbcbbc9
// Click
//---------------------------------------------------------

<<<<<<< HEAD
function g_clickEventHndlr(_x,_y)
{
    var tempArr = mainGameObj.getBactArr()
    for (let i= 0; i < tempArr.length; i++) 
    { 
        if(tempArr[i].clicked(_x,_y) == true)
        {
            mainGameObj.destroy(i)
        }
       
    }
}
=======
g_clickEventHndlr(_x,_y)
{
    console.log(_x,_y);
}
//*/


// -------------------------------------------------------
// Grow
//----------------------------------------------------------

/*

var g_updateCallbackarray = []
var g_frameCount = 0;
var g_updateEventListenerEnabled = false

function toggleUpdateEventListener()
{
    if (g_updateEventListenerEnabled)
    {
        g_updateEventListenerEnabled = false;
    }
    else
    {
        g_updateEventListenerEnabled = true;
        requestAnimationFrame(updateEventHndlr);
    }

    //console.log("updateEventListener " , g_updateEventListenerEnabled)
}
function updateEventListener()
{
    if (g_updateEventListenerEnabled) requestAnimationFrame(updateEventHndlr);
}

function addUpdateCallback(_callback)
{
    g_updateCallbackarray.push(_callback);
}

function removeUpdateCallback(_callback)
{

}

function updateEventHndlr()
{
    // Increament Frame Count
    //g_frameCount++;

    //console.log(g_frameCount);
    for (let index = 0; index < bactArr.length; index++) {
        bactArr[index].update()

    }


    bactArr.forEach(element => {
        element.update()
    });

    if (g_updateEventListenerEnabled) requestAnimationFrame(updateEventHndlr);

    //updateEventListener();
}

//*/
>>>>>>> fe0210e0521184e3dcf5a1bf6dcfad2facbcbbc9
