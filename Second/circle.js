// I am still not sure how will the class get access with the gl buffers and shaders

class Circle
{
    constructor(x, y, r, color){
        this.x = x;
        this.y = y;
        this.r = r;
	    
	//for(i = 0, i<4, i++)
		//this.color[i] = color[i];

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

    setRadius(r){
        this.r = r;
    }
}
