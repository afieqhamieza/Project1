class Bacteria {

    constructor(X) {
        this.X = X;
        this.consuming = [];
    }

    spawn() {
        this.getNewRandomTrigData(); //find new x and y data
        this.getCircPoints();
        var attempt = 0;

        for (var i = 0; i < bacArr.length; i++) {//for loop for checking for bacteria
            if(attempt > 500) {//check condition
                console.log("No area left");
                break;
            }

            if (collXing(this.x, this.y, 0.06, bacArr[i].x, bacArr[i].y, bacArr[i].r)) {
                this.getNewRandomTrigData();
                this.getCircPoints();
                attempt++;
                i = -1;
            }
        }

        this.r = 0.06;
        // times by 0.65 to ensure the bacteria isn't as light as the canvas
        this.color = [Math.random() * (0.65), Math.random() * (0.65), Math.random() * (0.65), 0.75];
        this.alive = true;
        this.consuming = [];
        spawnedBac++;
    }

    update() {

        if(this.alive) {
            // If a certain threshold (r=0.3) destroy the bacteria and decrease player's lives
            if(this.r > 0.3) {
                this.destroy(bacArr.indexOf(this));
            } else {
                // Increase the size of each bacteria by 0.0003 each tick
                    this.r += 0.0003;
                //increase alpha as bacteria grows
                this.color[3] += 0.0003;

                for(i in bacArr) {
                    //Skip itself
                    if(this != bacArr[i]){
                        //If either 'this' or bacArr[i] are not in each other's 'consuming' array - continue.
                        if(this.consuming.indexOf(bacArr[i]) == -1 && bacArr[i].consuming.indexOf(this) == -1) {
                            //If 'this' and bacArr[i] are collXing add it to this bacteria with the larger radius' 'consuming' array
                            if(collXing(this.x, this.y, this.r, bacArr[i].x, bacArr[i].y, bacArr[i].r)) {
                                if(this.X < bacArr[i].X){
                                    this.consuming.push(bacArr[i]);
                                }
                            }
                        // Else if bacArr[i] is in this.consuming, have 'this' consume bacArr[i] by moving it insXe of 'this' and shrinking it's radius
                    } else {
                            for(i in this.consuming) {
                                // Easier than typing this.consuming[i].* everytime
                                let consuming = this.consuming[i];
                                // If the consuming bacteria has fully entered the larger bacteria, destroy the consumed
                                if(distance(this.x, this.y, consuming.x, consuming.y) <= (this.r - consuming.r) || consuming.r <= 0.0){
                                    consuming.destroy(bacArr.indexOf(consuming));
                                } else {
                                    // Normalize vector in order to ensure consistent consumption. Specifically to the speed of consumption
                                    var dVec = normalize(this.x, this.y, consuming.x, consuming.y);
                                    
                                    consuming.x -= dVec[0]/(1800*consuming.r);
                                    consuming.y -= dVec[1]/(1800*consuming.r);
                                    consuming.r -= 0.0025;
                                    this.r += 0.01*consuming.r;
                                    //Increase alpha of the bacteria causing it to become darker as it consumes.
                                    this.color[3] += 0.001;
                                }
                            }
                        }
                    }
                }
            }
            // Draw
            draw_circle(this.x, this.y, this.r, this.color);
        }
    }

    destroy(index) {
        // Set radius to zero to open up more potential respawn points
        this.r = 0;
        this.x = 0;
        this.y = 0;
        this.alive = false;
        bacRemaining--;

        // Destroy any other bacteria being consumed
        for(i in this.consuming) {
            this.consuming[i].destroy(bacArr.indexOf(this.consuming[i]));
        }

        // Remove destroyed bacteria from any other Bacteria.consuming arrays
        for(i in bacArr) {
            if(bacArr[i].consuming.indexOf(this) != -1) {
                bacArr[i].consuming.splice(bacArr[i].consuming.indexOf(this), 1);
            }
        }

        // Reset array for this bacteria
        this.consuming = [];

        // Remove destroyed bacteria from the bacteria array in order to spawn new ones
        bacArr.splice(index,1);

        // Spawn new bacteria
        if(bacRemaining >= totBac) {
            bacArr.push(new Bacteria(spawnedBac));
            bacArr[totBac-1].spawn();
        }
    }
    getNewRandomTrigData() {
        this.angle = Math.random();
        this.spawnRadX = randomSign(0.8);
        this.spawnRadY = randomSign(0.8);
        if(Math.random() >= 0.5) {
            this.trig = "sin";
        } else {
            this.trig = "cos";
        }
    }

    getCircPoints() {
        var tempX, tempY;
        if (this.trig == "sin") {
            this.x = this.spawnRadX*Math.sin(this.angle);
            this.y = this.spawnRadY*Math.cos(this.angle);
        } else {
            this.x = this.spawnRadX*Math.cos(this.angle);
            this.y = this.spawnRadY*Math.sin(this.angle);
        }
    }
}