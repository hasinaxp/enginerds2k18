let gridCanvas = document.getElementById('grid');
gridCanvas.width = SCREEN_WIDTH * 3/4;
gridCanvas.height = SCREEN_HEIGHT;
let grid = gridCanvas.getContext('2d');
grid.strokeStyle = 'white';


function drawLine(x1, y1, x2, y2, color, width) {
    grid.beginPath();
    grid.lineWidth = width;
    grid.strokeStyle = color;
    grid.moveTo(x1, y1);
    grid.lineTo(x2, y2);
    grid.stroke();
}

function drawGrid(cx, cy,color, width) {
    
    let countx = cx;
    let county = cy;
    let gapx = SCREEN_WIDTH / countx;
    let gapy = SCREEN_HEIGHT / county;

    for(let i  = 1; i < countx; i++) {
        drawLine(gapx * i, 0, gapx * i, gridCanvas.height , color, width);
    }
    for(let i  = 1; i < county; i++) {
        drawLine(0,gapy *i, gridCanvas.width , gapy * i, color, width);
    }
}

drawGrid(10,7,'#FFFFFF22',0.5);
drawGrid(50,35,'#FFFFFF11',0.2);
let backgroundCanvas = document.getElementById('backgroundCanvas');
let backContext = backgroundCanvas.getContext('2d');
backgroundCanvas.width = SCREEN_WIDTH;
backgroundCanvas.height = SCREEN_HEIGHT;
console.log(backContext);
function backgroundClear(col) {
    backContext.fillStyle = col;
    backContext.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}
function BackgroundPointer(x, y, radius, color, radians,distance) {
    this.x = x;
    this.y = y;
    this.centerX = x;
    this.centerY = y;
    this.radius = radius;
    this.color = color;
    this.radians = radians;
    this.velocity = 0.1;
    this.distance =20 + 4 * distance;
    this.lastMouse = {x: MOUSE_X, y: MOUSE_Y};

    this.draw = () => {
        backContext.beginPath();
        backContext.fillStyle = this.color;
        backContext.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        backContext.fill();
        backContext.closePath();
    }
    this.simulate = () => {
        this.lastMouse.x += (MOUSE_X - this.lastMouse.x) * 0.06;
        this.lastMouse.y += (MOUSE_Y - this.lastMouse.y) * 0.07; 
        this.radians += this.velocity;
        this.x = this.lastMouse.x + Math.cos(this.radians)  * this.distance;
        this.y = this.lastMouse.y +  Math.sin(this.radians) * this.distance ;
        this.draw();
    }
}
function BackgroundParticalSystem() {
    this.pointers = [];
    this.count = 0;
    this.addPartical = () => {
        let p = new BackgroundLetterPartical();
        p.init();
        p.index = this.count;
        this.particals.push(p);
        this.count++;
    };
    this.addPointer = () => {
            for ( let j = 0; j < 3; j++)
            this.pointers.push(new BackgroundPointer(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 2.5, '#00ffC466', j  * Math.PI *2/3, 7));
        }

    this.render = ()=> {
        this.pointers.forEach(p => {
                p.simulate();
        });
    };
}

let bps = new BackgroundParticalSystem();
bps.addPointer();
//------------------------------Get Started-----------------------------------------

//-----------------------renderLoop-------------------------------------------------
let iterPart = 0;
function animate() {
    requestAnimationFrame(animate);
    /* if (iterPart == 0){
        bps.addPartical();
        iterPart++;
    }
    if(iterPart >= 3) {
        iterPart = 0;
    }
    else {
        iterPart++;  
    } */
    backgroundClear('rgba(41, 40, 49,0.35)');
    bps.render();
}
animate();
//----------------background shift------------------
document.addEventListener('mousemove', ()=> {
    let xOffset = (SCREEN_WIDTH/2) - MOUSE_X;
    let yOffset = (SCREEN_HEIGHT/2) - MOUSE_Y;
    console.log(xOffset);
    console.log(yOffset);
    TweenMax.to(_id('grid'), 0.4, {
        css: {
            transform: `translate(${xOffset * 0.2}px, ${yOffset * 0.2}px) translateZ(${Math.abs(xOffset )}px) rotateY(${Math.abs(xOffset * 0.1)}deg)`
        },
    }); 
})