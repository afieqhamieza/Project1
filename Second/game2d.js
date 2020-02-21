class Game2D
{

    constructor()
    {
        //this.fColor = []

        //Creating a WebGL Context Canvas
        this.canvas = document.getElementById('gameSurface');
        this.gl = this.canvas.getContext('webgl');
    
        /* 
        //-----------------------------------------------------
        // Implemented Yet
        //-----------------------------------------------------
        // Creating a 2D Canvas for displaying text
        this.textCanvas = document.getElementById('text');
        this.ctx = textCanvas.getContext('2d')

        // Creating a 2D Canvas for particles
        this.particlesCanvas = document.getElementById('particles');
        this.pCtx = particlesCanvas.getContext('2d')
    
        // Set font for text Canvas
        this.ctx.font = "20px Verdana";
        this.ctx.textAlign = "center";
        //*/
    
        // Vertex and fragement shader source
        var vertCode = [
            'attribute vec3 coordinates;',
            '',
            'void main() {',
            '	gl_Position = vec4(coordinates, 1.0);',
            '}'
        ].join('\n');
    
        var fragCode = [
            'precision mediump float;',
            'uniform vec4 fColor;',
            '',
            'void main()',
            '{',
            ' gl_FragColor = fColor;',
            '}'
        ].join('\n');
    
        // Create an empty buffer object
        var vertex_buffer = this.gl.createBuffer();
    
        // Set the view port
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    
        // Bind appropriate array buffer to it
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
    
        // Enable the depth test
        this.gl.enable(this.gl.DEPTH_TEST);
    
        // Create vertex and fragment shader objects
        var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    
        // Shaders
        // Attach vertex shader source code and compile
        this.gl.shaderSource(vertShader, vertCode);
        this.gl.compileShader(vertShader);
    
        // Attach fragment shader source code and compile
        this.gl.shaderSource(fragShader, fragCode);
        this.gl.compileShader(fragShader);
    
        // Create shader program
        var shaderProgram = this.gl.createProgram();
    
        // Attach the vertex and fragment shader
        this.gl.attachShader(shaderProgram, vertShader);
        this.gl.attachShader(shaderProgram, fragShader);
    
        // Link and use
        this.gl.linkProgram(shaderProgram);
        this.gl.useProgram(shaderProgram);
    
        // Get the attribute and uniform location
        var coord = this.gl.getAttribLocation(shaderProgram, "coordinates");
        this.fColor = this.gl.getUniformLocation(shaderProgram, "fColor");
    
        // Point an attribute to the currently bound VBO and enable the attribute
        this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(coord);
        //*/
    
    
    }

    draw_circle(_x, _y, _r, _color) 
    {

        // For storing the produces vertices
        var vertices = [];
    
        // Prepare vertices
        for (let i = 1; i <= 360; i++) {
            var y1 = _r * Math.sin(i) + _y;
            var x1 = _r * Math.cos(i) + _x;
    
            var y2 = _r * Math.sin(i + 1) + _y;
            var x2 = _r * Math.cos(i + 1) + _x;
    
            vertices.push(_x);
            vertices.push(_y);
            vertices.push(0);
    
            vertices.push(x1);
            vertices.push(y1);
            vertices.push(0);
    
            vertices.push(x2);
            vertices.push(y2);
            vertices.push(0);
        }
    
        // Pass the vertex data to the buffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    
        // Pass color data to uniform fColor
        this.gl.uniform4f(this.fColor, _color[0], _color[1], _color[2], _color[3]);
    
        // Drawing triangles
        this.gl.clearColor(0, 1, 0, 0.9);
        // Draw the triangle 360*3, 3 layers of vertices (disk)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 360 * 3);
    }

}