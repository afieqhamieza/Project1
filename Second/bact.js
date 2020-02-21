class Bact extends Circle {
    constructor(disk) {
        var angle = (Math.floor(Math.random() * 5.66) + 0.56);
        var x = disk.r * Math.cos(angle);
        var y = disk.r * Math.sin(angle);
        var color = [Math.random() * (0.65), Math.random() * (0.65), Math.random() * (0.65), 0.75];

        super(x, y, 0.08, color);
    }


    // Moved from circle class
    draw() {
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

        // Pass the vertex data to the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Pass color data to uniform fColor
        gl.uniform4f(fColor, this.color[0], this.color[1], this.color[2], this.color[3]);

        // Drawing triangles
        gl.clearColor(0, 1, 0, 0.9);
        // Draw the triangle 360*3, 3 layers of vertices (disk)
        gl.drawArrays(gl.TRIANGLES, 0, 360 * 3);
    }

    update() {
        if (this.r < 0.5) {
            this.r = this.r + 0.001;
            this.draw();
        }

    }

}