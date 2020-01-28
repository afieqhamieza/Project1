var canvas = document.getElementById("webgl"),
    circleCanvas = document.getElementById("circleBig")
    ctx = canvas.getContext('2d'),
    circles = [],
    tolong = circleCanvas.getContext('2d');
  
// document.body.appendChild(canvas); //i am not sure if this is neccessary or not

function drawCircle(radius)
{
    tolong.beginPath();
    tolong.arc(500, 500, radius, 0, 2 * Math.PI);
    tolong.stroke();
}

function Circle(x, y, radius) 
{
  var c = new Path2D();
  c.arc(x, y, radius, 0, Math.PI * 2);
  return c;
}

function init(radius) 
{
  var width = (radius * 2) + 50;
  var height = (radius * 2) + 50;
  var numNodes=10;
  for (var i = 0; i < numNodes; i++) 
  {
    angle = (i / (numNodes / 2)) * Math.PI;
    circles.push(Circle((radius * Math.cos(angle)) + (width / 2)+275, (radius * Math.sin(angle)) + (width / 2)+275, 20));
    ctx.fill(circles[i], "nonzero");
    ctx.stroke(circles[i], "nonzero");
  }
}

function clickHandler(e) //e is where my mouse click at
{
  var r = canvas.getBoundingClientRect(), //getting the position of the element
      x = e.clientX - r.left, //rasa cam x and y ni position where i click kat mana
      y = e.clientY - r.top,
      i;

  for (i = circles.length - 1; i >= 0; --i) 
  {
    console.log(i);

    if (ctx.isPointInPath(circles[i], x, y, 'nonzero'))   //parameeters are(path, x axis, y axis, fillrule(check if it is inside))
      circles.splice(i, 1); //meaning at position i, remove 1 bacteria
    
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); //take sure why i have to put clearRect even after having splice. and im pretty sure this is what makes my circle dissapear as well
  for (i = 0; i < circles.length; i++) 
  {
    ctx.fill(circles[i], "nonzero")
    ctx.stroke(circles[i], "nonzero");
  }
}

var radius = 200;
drawCircle(radius);

//calling the bacteria
init(radius);
canvas.addEventListener('click', clickHandler, false);
