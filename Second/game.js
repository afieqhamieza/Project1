class Game {
    //-----------------------------------------------------
    // Method: constructor() 
    // Descritption: Init the game enviromend 
    //-----------------------------------------------------
    constructor(_canvas, _gl) {
        this.bactArr = [];
        this.lives = 3;

        //Creating a WebGL Context Canvas
        this.canvas = _canvas;
        this.gl = _gl;

        //this.canvas = document.getElementById('gameSurface');
        //this.gl = this.canvas.getContext('webgl');

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

        // Start Click Listenter
        //this.canvas.onmousedown = function(e, canvas){console.log(e.clientX, e.clientY);};

        //this.canvas.onmousedown = function(e, canvas){this.someFuntion};
        //document.getElementById("gameSurface").addEventListener("mousedown", mouseDown);

        /*
        function mouseDown() {
            console.log('someFuntion');
        }

        this.something = 0;
        */
    


    }
    getBactArr(){
        return this.bactArr;
    }

    //-----------------------------------------------------
    // Method: start() 
    // Descritption: Start the game
    //-----------------------------------------------------
    start() {

        // Use default disk position and colour
        this.disk = new Disk();

        this.bactArr.push(new Bact(this.disk));

        // Creating bact array
        for (let i = 0; i < 9;) {
            var collFlag = false;
            var tempBact = new Bact(this.disk);

            // check if coll
            for (let j = 0; j <= i; j++) {
                if (collision(tempBact, this.bactArr[j])) {
                    collFlag = true;
                    break;
                }
            }

            if (collFlag == false) {
                this.bactArr.push(tempBact);
                i++;
            }
        }

        for (let i = 0; i < this.bactArr.length; i++) {
            this.bactArr[i].draw(this.gl, this.fColor);
        }

        this.disk.draw(this.gl, this.fColor);

    } 

    //-----------------------------------------------------
    // Method: update() 
    // Descritption: Update each of the bacteria
    //-----------------------------------------------------
    update() {
        this.bactArr.forEach(tempBact => {
            tempBact.update()
        });

        this.disk.draw(this.gl, this.fColor);

        // --------------------checking for collision and collide
        for (let i = 0; i < this.bactArr.length; i++) {
            if (this.bactArr[i].alive) {

                //check threshold, destroy bacteria
                if (this.bactArr[i].getRadius() > 0.3) {
                    if (!this.lose()) {
                        this.lives--;
                        this.destroy(i);

                        switch (this.lives) {
                            case 3:
                                document.getElementById("live").innerHTML = "Lives left: 3";
                                break;

                            case 2:
                                document.getElementById("live").innerHTML = "Lives left: 2";
                                break;

                            case 1:
                                document.getElementById("live").innerHTML = "Lives left: 1";
                                break;

                            default:
                                document.getElementById("live").innerHTML = "Lives left: 0";
                                break;
                        }
                    }
                }
                else {
                    //check collision
                    for (let j = 0; j < i; j++) {
                        if (this.bactArr[i] != this.bactArr[j]) {
                            if (collision(this.bactArr[i], this.bactArr[j])) {
                                //if there is collision, larger one consume it
                                if (this.bactArr[i].getRadius() >= this.bactArr[j].getRadius()) {
                                    this.bactArr[i].setRadius(this.bactArr[i].getRadius() + 0.05);
                                    this.destroy(j);
                                    break;
                                }
                                else {
                                    this.bactArr[j].setRadius(this.bactArr[j].getRadius() + 0.05);
                                    this.destroy(i);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //-----------------------------------------------------
    // Method: destroy() 
    // Descritption: Destroy the bacteria by its index
    //-----------------------------------------------------
    destroy(index) {
        this.r = 0;
        this.x = 0;
        this.y = 0;
        this.alive = false;

        // Remove destroyed bacteria from the bacteria array
        this.bactArr.splice(index, 1);
    }

    //-----------------------------------------------------
    // Method: win() 
    // Descritption: Checking if the user win the game
    //-----------------------------------------------------
    win() {
        if (this.bactArr.length == 0 && this.lives > 0) {
            // debugger;
            alert("YOU WIN!");
            return true;
        }
        return false;
    }

    //-----------------------------------------------------
    // Method: lose() 
    // Descritption: Checking if the user lose the game
    //-----------------------------------------------------
    lose() {
        if (this.lives == 0) {
            for (let i = 0; i < this.bactArr.length; i++) {
                this.destroy(i);
            }

            alert("YOU LOSE!");
            return true;
        }
        return false;
    }
}