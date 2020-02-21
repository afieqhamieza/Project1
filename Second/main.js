let mainGameObj;
function startGame()
{
    // Create Game Object
    mainGameObj = new Game();

    // Start Gamess
    mainGameObj.start();
}

function collision(bact1, bact2) {
    var xDist = bact2.getX() - bact1.getX();
    var yDist = bact2.getY() - bact1.getY();
    // var rad = bact1.getRadius() + bact2.getRadius();    //the problem is here. 

    var totalDist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    if ((totalDist - 0.16) < 0) {
        return true;
    }

    return false;
}

function colliding(x1, y1, r1, x2, y2, r2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;
    var totDist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    if (totDist - (r1 + r2) < 0) {
        return true;
    }

    return false;
}

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