// I am still not sure how will the class get access with the gl buffers and shaders

class Circle{
    constructor(x, y, r, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    setColor(r, g, b, a){
        this.color[0]=r;
        this.color[1]=g;
        this.color[2]=b;
        this.color[3]=a;
    }

    setCoordinate(x, y){
        this.x = x;
        this.y = y;
    }

    setRadius(){
        this.r = r;
    }

    draw(){
        // For storing the produces vertices
		var vertices = [];

		// Prepare vertices
		for (let i = 1; i <= 360; i++) {
			var y1 = r * Math.sin(i)+y;
			var x1 = r * Math.cos(i)+x;

			var y2 = r * Math.sin(i+1)+y;
			var x2 = r * Math.cos(i+1)+x;

			vertices.push(x);
			vertices.push(y);
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
		gl.uniform4f(fColor, color[0], color[1], color[2], color[3]);

		// Drawing triangles
		gl.clearColor(0, 1, 0, 0.9);
		
		// Draw the triangle 360*3, 3 layers of vertices (disk)
		gl.drawArrays(gl.TRIANGLES, 0, 360 * 3);
    }
}