var canvas
var gl
var fColor
//var vertices;

var bactArr = []

function test() {
    // Define disk position and colour
    // disk = new Disk(1, 0, 0.8, [1, 0.1, 0.05, 0.5]);

    // Use default disk position and colour
    disk = new Disk();

    var bactArr = [];
    var count = 1;

    bactArr.push(new Bact(disk));

    // Creating bact array
    for (let i = 0; i < 5; ) {
        var collFlag = false;
        tempBact = new Bact(disk);

        // check if coll
        for (let j = 0; j <= i; j++) {
            if (collision(tempBact, bactArr[j])) {
                collFlag = true;
                break;
            }
        }

        if (collFlag == false) {
            bactArr.push(tempBact);
            i++;
        }
    }

    for (let i = 0; i < bactArr.length; i++) {
        bactArr[i].draw();
    }
    


    disk.draw();
    
    //*/
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

    // For storing the produces vertices
    vertices = [];
    canvas.onmousedown = function(e, canvas){console.log(e.clientX,"  ",e.clientY);};

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
/*
function updateEventListener()
{
    if (g_updateEventListenerEnabled) requestAnimationFrame(updateEventHndlr);
}
//*/

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

    bactArr.forEach(element => {
        element.update()
    });

    if (g_updateEventListenerEnabled) requestAnimationFrame(updateEventHndlr);

    //updateEventListener();
}