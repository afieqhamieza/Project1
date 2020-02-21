function createExplosionAtBacteria(bac){
    // Convert Bacteria(WebGL) data into canvas data
    let bacX = (bac.x + 2/75 + 1) * 300;
    let bacY = -1 * (bac.y-1) * 300 - 8;
    let r = (((bac.x + bac.r) + 2/75 + 1) * 300) - bacX;
    let num = 0;
    let pColor = bac.color;

    // Loops through the bacteria's x and y and spawn particles there
    for(let x = 0; x < r; x++){
        for(let y = 0; y < r; y++){
            //Helps decrease amount of particles
            if(num % reduceVariable == 0) {

                let ppX = bacX + x;
                let ppY = bacY + y;
                let npX = bacX - x;
                let npY = bacY - y;

                // Create a corresponding particle for each "quandrant" of the bacteria
                let particle = new Particle(ppX, ppY, 5, bac.color);
                particles.push(particle);
                particle = new Particle(npX, npY, 5, bac.color);
                particles.push(particle);
                particle = new Particle(ppX, npY, 5, bac.color);
                particles.push(particle);
                particle = new Particle(npX, ppY, 5, bac.color);
                particles.push(particle);

            }
            num++;
        }
    }
}
// Assign function to mouse Mouseclk
//canvas.onmouseclick = function(e, canvas){console.log(e.clientX,"  ",e.clientY);};

// Function Mouseclk
function Mouseclk( evt,canvas) {
    
    let x = evt.clientX;
    let y = evt.clientY;
    let start = y;
    let hit = false;
//    let ptsInc = 0;
    const rect = evt.target.getBoundingClientRect();
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