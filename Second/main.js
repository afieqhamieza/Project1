let mainGameObj;
function startGame()
{
    // Create Game Object
    mainGameObj = new Game();

    // Start Gamess
    mainGameObj.start();

    window.requestAnimationFrame(g_frameEventHndlr);

    document.getElementById('gameSurface').onmousedown = function(e, canvas){g_clickEventHndlr(e.clientX, e.clientY);};
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
var something = 0;

function g_frameEventHndlr()
{
    //something = something + 1;
    //console.log(something)

    mainGameObj.update();

    window.requestAnimationFrame(g_frameEventHndlr);
}

function g_clickEventHndlr(_x,_y)
{
    //something = something + 1;
    console.log(_x,_y)

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
// Click
//---------------------------------------------------------
/*

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
