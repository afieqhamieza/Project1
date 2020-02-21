class Bact extends Circle {
    constructor(_disk) {
        var angle = Math.random() * Math.PI * 2;
        var x = _disk.r * Math.cos(angle);
        var y = _disk.r * Math.sin(angle);

        var color = [Math.random() * (0.65), Math.random() * (0.65), Math.random() * (0.65), 0.75];

        super(x, y, 0.1, color);

    }

    // Moved from circle class
    draw(_gl, _fColor) {
        this.gl = _gl;
        this.fColor = _fColor;

        //
        // For storing the produces vertices
        var vertices = [];

        // Prepare vertices
        for (let i = 1; i <= 360; i++) {
            var y1 = this.r * Math.sin(i) + this.y;
            var x1 = this.r * Math.cos(i) + this.x;

            var y2 = this.r * Math.sin(i + 1) + this.y;
            var x2 = this.r * Math.cos(i + 1) + this.x;

            vertices.push(this.x);
            vertices.push(this.y);
            vertices.push(0);

            vertices.push(x1);
            vertices.push(y1);
            vertices.push(0);

            vertices.push(x2);
            vertices.push(y2);
            vertices.push(0);
        }

        this.alive = true;
        this.consuming = [];

        // Pass the vertex data to the buffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        // Pass color data to uniform fColor
        this.gl.uniform4f(this.fColor, this.color[0], this.color[1], this.color[2], this.color[3]);

        // Drawing triangles
        this.gl.clearColor(0, 1, 0, 0.9);
        // Draw the triangle 360*3, 3 layers of vertices (disk)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 360 * 3);
    }

    update() {
        // console.log("Hello")

        // if (this.r < 0.5) {
        //     this.r = this.r + 0.001;
        //     this.draw(this.gl, this.fColor);
        // }

        if (this.alive) {

            //check threshold, destroy bacteria, decrease live
            if (this.r > 0.3) {
                lives--;
                this.destroy(bacArr.indexOf(this));
            }
            else {
                //grow the bacteria
                this.r += 0.0003;

                //check collision
                //if there is collision, larger one consume it

            }





        }


    }

    //pass index because splice will need to use index
    destroy(index) {

        this.r = 0;
        this.x = 0;
        this.y = 0;
        this.alive = false;

        // Destroy any other bacteria being consumed
        for (i in this.consuming) {
            this.consuming[i].destroy(bacArr.indexOf(this.consuming[i]));
        }

        // Remove destroyed bacteria from any other Bacteria.consuming arrays
        for (i in bacArr) {
            if (bacArr[i].consuming.indexOf(this) != -1) {
                bacArr[i].consuming.splice(bacArr[i].consuming.indexOf(this), 1);
            }
        }

        // Reset array for this bacteria
        this.consuming = [];

        // Remove destroyed bacteria from the bacteria array
        bacArr.splice(index, 1);
    }

}