// Vertex shader program 
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = a_PointSize;\n' +
    '}\n';

// Fragment shader program 
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' + // uniform variable
    'void main() {\n' +
    'float dist = distance(gl_PointCoord, vec2(0.5, 0.5));\n' +
    'if(dist < 0.5) {\n' + // Radius is 0.5
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 0.0);\n' +
    '} else { discard; }\n' +
    '}\n';

function main() {

    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL 
    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    //set the position of vertices
    var n = initVertexBuffer(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;

    }

    // Set the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas> 
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw points
    gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffer(gl) {
    var vertices = new Float32Array([0.0, 0.0, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]);    // point positions
    var sizes = new Float32Array([1010.0, 30.0, 30.0, 30.0, 30.0]); // Point sizes

    // The number of vertices
    var n = 5;

    // Create two buffer objects: one for position, one for size
    var vertexBuffer = gl.createBuffer();
    var sizeBuffer = gl.createBuffer();

    if (!vertexBuffer) {
        console.log('Failed to create the buffer object ');
        return -1;
    }

    // bind and Write point positions to the buffer object 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //get storage location of attribute var
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Assign the buffer object to a_Position 
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // bind and Write point sizes to the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

    //assigning buffer object to a_PointSize
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_PointSize);

    return n;
}
