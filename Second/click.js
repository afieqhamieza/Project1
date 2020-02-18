// Assign function to mouse Mouseclk
canvas.onmousedown = function(e, canvas){Mouseclk(e, gameSurface);};

// Function Mouseclk
function Mouseclk(e, canvas) {
    let x = e.clientX;
    let y = e.clientY;
    let start = y;
    let hit = false;
//    let ptsInc = 0;
    const rect = e.target.getBoundingClientRect();
    //Convert default canvas coords to webgl vector coords
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    // Loop through all bacteria and check if you Mouseclked within the radius of any
    // Increase score and destroy the bacteria
    for(let i in Barray) {
        if(colliding(x, y, 0, Barray[i].x, Barray[i].y, Barray[i].r)){
            ptsInc = Math.round(1/Barray[i].r);
            createExplosionAtBacteria(Barray[i]);
      //        score += ptsInc;
            Barray[i].destroy(i);
              hit = true;
          /*
              MouseclkedPoints.push({
                pts: "+" + ptsInc,
                x: e.clientX,
                y: e.clientY,
                dY: 0,
                color: "rgba(0,200,0,"
            });
            */
             // Break ensures you can't Mouseclk multiple bacteria at once
             break;
         }
    }
}