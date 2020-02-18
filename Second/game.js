var canvas
var gl
var fColor


function test() {
    draw_circle(0,0,0.8,[0.05, 0.1, 0.05, 0.5]);

    a = new Circle(0, 0, 0.8, [0.05, 0.1, 0.05, 0.5]);
    a.draw();
}


function main() {
    //Creating a WebGL Context Canvas
    canvas = document.getElementById('gameSurface');
    gl = canvas.getContext('webgl');

    // Creating a 2D Canvas for displaying text
    var textCanvas = document.getElementById('text');
    var ctx = textCanvas.getContext('2d')
    // Creating a 2D Canvas for particles
    var particlesCanvas = document.getElementById('particles');
    var pCtx = particlesCanvas.getContext('2d')

    // Set font for text Canvas
    ctx.font = "20px Verdana";
    ctx.textAlign = "center";

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
    //**


    // Create an empty buffer object
    var vertex_buffer = gl.createBuffer();

    // Set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Bind appropriate array buffer to it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Create vertex and fragment shader objects
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Shaders
    // Attach vertex shader source code and compile
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    // Attach fragment shader source code and compile
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    // Create shader program
    var shaderProgram = gl.createProgram();

    // Attach the vertex and fragment shader
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);

    // Link and use
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Get the attribute and uniform location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    fColor = gl.getUniformLocation(shaderProgram, "fColor");

    // Point an attribute to the currently bound VBO and enable the attribute
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    //*/
}

function draw_circle(x, y, r, color) {

    // For storing the produces vertices
    var vertices = [];

    // Prepare vertices
    for (let i = 1; i <= 360; i++) {
        var y1 = r * Math.sin(i) + y;
        var x1 = r * Math.cos(i) + x;

        var y2 = r * Math.sin(i + 1) + y;
        var x2 = r * Math.cos(i + 1) + x;

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

function collision(bact1, bact2) {
    var xDist = bact2.x - bact1.x;
    var yDist = bact2.y - bact1.y;
    var rad = bact2.r - bact1.r;

    var totalDist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

    if (totalDist - rad < 0) {
        return true;
    }

    return false;
}