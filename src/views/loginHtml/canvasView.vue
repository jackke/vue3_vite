<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:07:27
 * @LastEditTime: 2023-02-09 14:38:06
 * @FilePath: /vue3_vite/src/views/Home.vue
 * @Description: 
-->

<template>
    <div class="canvas-box">
        <div class="title">canvas1</div>
        <div class="canvas1" data-aos="fade-up">
            <!-- partial:index.partial.html -->
            <canvas id="canvas1"></canvas>
            <div id="interface">
                <h1>Text particle</h1>
                <p>feel free to change the value of the variable "message" </p>
                Message:
                <input id="message" type="text" value="codepen" onchange="change()">
                Gravity:
                <input onchange="changeV()" type="range" id="2" value="0" max="1" min="-1" step="0.1">

                Duration:
                <input onchange="changeV()" type="range" id="3" value=".4" max="0.99" min="0.1" step="0.01">
                
                Speed:
                <input onchange="changeV()" type="range" id="5" value=".1" max="5" min="0" step="0.01">
                    Radius:
                <input onchange="changeV()" type="range" id="6" value="2" max="20" min="1.8" step="0.1">
                Resolution:
                <input type="range" id="4" value="5" max="20" min="3" step="1" onchange="change()">
            </div>
        </div>
        <div class="title">canvas2</div>
        <div class="canvas2">
            <canvas id="canvas2"></canvas>
        </div>
        <div class="title">canvas3</div>
        <div class="canvas3">
            <canvas id="canvas3"></canvas>
            <div class="fps"><span id="fps">36.5</span> FPS</div>
            <input type="file" id="image-upload" />
        </div>
    </div>
</template>

<!-- <script src="./js/twgl.min.js"></script> -->
<script>
import { onMounted, ref, nextTick } from 'vue'; 
import {Pane} from 'https://cdn.skypack.dev/tweakpane';
export default {  
  setup() {  

    onMounted(async () => {  
    //   count.value++;  
      await nextTick(); // 等待下一个DOM更新循环结束  
    //   console.log('DOM updated'); // 在DOM更新后执行的代码  
    });
    function canvas1Fn(){
        var utils = {
            norm: function( value,
                            min,
                            max ) {
                return ( value - min ) / ( max - min );
            },

            lerp: function( norm, min, max ) {
                return ( max - min ) * norm + min;
            },
            map: function( value, sourceMin, sourceMax, destMin, destMax ) {
                return utils.lerp(
                    utils.norm( value, sourceMin, sourceMax ),
                    destMin,
                    destMax
                );
            },
            clamp: function( value, min, max ) {
                return Math.min( Math.max( value, Math.min( min, max ) ), Math.max( min, max ) );
            },
            distance: function( p0, p1 ) {
                var dx = p1.x - p0.x,
                    dy = p1.y - p0.y;
                return Math.sqrt( dx * dx + dy * dy );
            },
            distanceXY: function( x0, y0, x1, y1 ) {
                var dx = x1 - x0,
                    dy = y1 - y0;
                return Math.sqrt( dx * dx + dy * dy );
            },
            circleCollision: function( c0, c1 ) {
                return utils.distance( c0, c1 ) <= c0.radius + c1.radius;
            },
            circlePointCollision: function( x, y, circle ) {
                return utils.distanceXY( x, y, circle.x, circle.y ) < circle.radius;
            },
            pointInRect: function( x, y, rect ) {
                return (
                    utils.inRange( x, rect.x, rect.x + rect.radius ) &&
                    utils.inRange( y, rect.y, rect.y + rect.radius )
                );
            },
            inRange: function( value, min, max ) {
                return value >= Math.min( min, max ) && value <= Math.max( min, max );
            },
            rangeIntersect: function( min0, max0, min1, max1 ) {
                return (
                    Math.max( min0, max0 ) >= Math.min( min1, max1 ) &&
                    Math.min( min0, max0 ) <= Math.max( min1, max1 )
                );
            },
            rectIntersect: function( r0, r1 ) {
                return (
                    utils.rangeIntersect( r0.x, r0.x + r0.width, r1.x, r1.x + r1.width ) &&
                    utils.rangeIntersect( r0.y, r0.y + r0.height, r1.y, r1.y + r1.height )
                );
            },
            degreesToRads: function( degrees ) {
                return degrees / 180 * Math.PI;
            },
            radsToDegrees: function( radians ) {
                return radians * 180 / Math.PI;
            },
            randomRange: function( min, max ) {
                return min + Math.random() * ( max - min );
            },
            randomInt: function( min, max ) {
                return min + Math.random() * ( max - min + 1 );
            },
            getmiddle: function( p0, p1 ) {
                var x = p0.x,
                    x2 = p1.x;
                middlex = ( x + x2 ) / 2;
                var y = p0.y,
                    y2 = p1.y;
                middley = ( y + y2 ) / 2;
                pos = [middlex, middley];

                return pos;
            },
            getAngle: function( p0, p1 ) {
                var deltaX = p1.x - p0.x;
                var deltaY = p1.y - p0.y;
                var rad = Math.atan2( deltaY, deltaX );
                return rad;
            },
            inpercentW: function( size ) {
                return size * W / 100;
            },
            inpercentH: function( size ) {
                return size * H / 100;
            }
        };

        // basic setup  :)

        let canvas = document.getElementById( 'canvas1' );
        let ctx = canvas.getContext( '2d' );
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        let gridX = 5;
        let gridY = 5;

        function shape ( x, y, texte ) {
            this.x = x;
            this.y = y;
            this.size = 120;

            this.text = texte;
            this.placement = [];
            this.vectors = [];
        }

        shape.prototype.getValue = function() {
        // Draw the shape :^)
            ctx.textAlign = 'center';
            ctx.font = 'bold ' + this.size + 'px arial';
            ctx.fillText( this.text, this.x, this.y );
            var idata = ctx.getImageData( 0, 0, W, H );
            var buffer32 = new Uint32Array( idata.data.buffer );
        // Check for black pixels
            for ( var y = 0; y < H; y += gridY ) {
                for ( var x = 0; x < W; x += gridX ) {
                    if ( buffer32[ y * W + x ] ) {
                        this.placement.push( new particle( x, y ) );
                    }
                }
            }
            ctx.clearRect( 0, 0, W, H );
        };

        function particle ( x, y, type ) {
            this.radius = 1.1;
            this.futurRadius = utils.randomInt( radius, radius + 3 );

            this.rebond = utils.randomInt( 1, 5 );
            this.x = x;
            this.y = y;

            this.dying = false;

            this.base = [x, y];

            this.vx = 0;
            this.vy = 0;
            this.type = type;
            this.friction = 0.99;
            this.gravity = gravity;
            this.color = 'rgba(255, 147, 41, 1)';
            this.shadowBlur = Math.floor(Math.random() * (25 - 10 + 1) + 10);
            this.shadowColor = 'rgba(255, 147, 41, 1)';

            this.getSpeed = function() {
                return Math.sqrt( this.vx * this.vx + this.vy * this.vy );
            };

            this.setSpeed = function( speed ) {
                var heading = this.getHeading();
                this.vx = Math.cos( heading ) * speed;
                this.vy = Math.sin( heading ) * speed;
            };

            this.getHeading = function() {
                return Math.atan2( this.vy, this.vx );
            };

            this.setHeading = function( heading ) {
                var speed = this.getSpeed();
                this.vx = Math.cos( heading ) * speed;
                this.vy = Math.sin( heading ) * speed;
            };

            this.angleTo = function( p2 ) {
                return Math.atan2( p2.y - this.y, p2.x - this.x );
            };

            this.update = function( heading ) {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += gravity;

                this.vx *= this.friction;
                this.vy *= this.friction;

                if ( this.radius < this.futurRadius && this.dying === false ) {
                    this.radius += duration;
                } else {
                    this.dying = true;
                }

                if ( this.dying === true ) {
                    this.radius -= duration;
                }

                ctx.beginPath();

                ctx.fillStyle = this.color;
                ctx.shadowBlur = this.shadowBlur;
                ctx.shadowColor = this.shadowColor;

                ctx.arc( this.x, this.y, this.radius, Math.PI * 2, false );
                ctx.fill();
                ctx.closePath();

                if ( this.y < 0 || this.radius < 1 ) {
                    this.x = this.base[ 0 ];
                    this.dying = false;
                    this.y = this.base[ 1 ];
                    this.radius = 1.1;
                    this.setSpeed( speed );
                    this.futurRadius = utils.randomInt( radius, radius + 3 );
                    this.setHeading(
                        utils.randomInt( utils.degreesToRads( 0 ), utils.degreesToRads( 360 ) )
                    );
                }
            };

            this.setSpeed( utils.randomInt( 0.1, 0.5 ) );
            this.setHeading(
                utils.randomInt( utils.degreesToRads( 0 ), utils.degreesToRads( 360 ) )
            );
        }

        let element2 = document.getElementById( '2' );
        let element3 = document.getElementById( '3' );
        let element4 = document.getElementById( '4' );
        let element5 = document.getElementById( '5' );
        let element6 = document.getElementById( '6' );

        let fieldvalue = document.getElementById( 'message' );
        let gravity = parseFloat( element2.value );
        let duration = parseFloat( element3.value );
        let resolution = parseFloat( element4.value );
        let speed = parseFloat( element5.value );
        let radius = parseFloat( element5.value );

        var message = new shape( W / 2, H / 2 + 50, fieldvalue.value );

        message.getValue();

        update();

        function change () {
            ctx.clearRect( 0, 0, W, H );

            gridX = parseFloat( element4.value );
            gridY = parseFloat( element4.value );
            message.placement = [];
            message.text = fieldvalue.value;
            message.getValue();
        }

        function changeV () {
            gravity = parseFloat( element2.value );
            duration = parseFloat( element3.value );
            speed = parseFloat( element5.value );
            radius = parseFloat( element6.value );
        }

        function update () {
            ctx.clearRect( 0, 0, W, H );

            for ( var i = 0; i < message.placement.length; i++ ) {
                message.placement[ i ].update();
            }
            requestAnimationFrame( update );
        }
    }
    function canvas2Fn(){
        console.clear();
        let ctx = canvas2.getContext("2d");

        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "https://cywarr.github.io/small-shop/rose.jpg";
        img.onload = () => {
        console.log(img);
        
        // prepare image data
        let imgSize = {x: img.width, y: img.height};
        
        ctx.canvas.width = imgSize.x;
        ctx.canvas.height = imgSize.y;
        ctx.drawImage(img, 0, 0);
        
        let imgData = ctx.getImageData(0, 0, img.width, img.height);
        let imgBytes = imgData.data;
        //
        

        let canvasRatio = imgSize.x / imgSize.y;
        
        let uY = val => ctx.canvas.height * 0.01 * val;
        let uX = val => ctx.canvas.width * 0.01 * val;
        
        function resize(){
            ctx.canvas.height = innerHeight * 0.95;
            ctx.canvas.width = ctx.canvas.height * canvasRatio;
            ctx.canvas.style.border = `${uY(1)}px solid #401`;
            ctx.canvas.style.borderRadius = `${uY(10)}px`;
            ctx.fillStyle = "black";
            //ctx.fillRect(0, 0, uX(100), uY(100));
        }
        
        resize();
        window.addEventListener("resize", event => {resize();});
        
        class Point {
            constructor(x, y){
            this.x = x;
            this.y = y;
            this.speed;
            this.speedRatio;
            this.color;
            this.radius = 0.3;
            this.init();
            }
            init(){
            this.x = Math.random() * 100;
            this.y = 0; //Math.random() * 100;
            this.speed = Math.random() * 0.3 + 0.2;
            }
            getData(){
            let x = Math.floor(this.x * 0.01 * imgSize.x);
            let y = Math.floor(this.y * 0.01 * imgSize.y);
            
            let idx = y * (imgSize.x * 4) + (x * 4);
            let r = imgBytes[idx + 0];
            let g = imgBytes[idx + 1];
            let b = imgBytes[idx + 2];
            this.color = `rgb(${r}, ${g}, ${b})`;
            let gray = ((r + g + b) / 3) / 255;
            
            this.speedRatio = 1 - gray * 0.9;
            }
            update(){
            this.y += this.speed * this.speedRatio;
            if (this.y >= 100){
                this.init();
                this.getData();
            }
            }
            draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(uX(this.x), uY(this.y), uY(this.radius), 0, Math.PI * 2);
            ctx.fill();
            }
        }
        
        class Points{
            constructor(amount){
            this.amount = amount;
            this.points;
            this.init();
            }
            init(){
            this.points = Array.from({length: this.amount}, () => {return new Point();})
            }
            update(){
            this.points.forEach(p => {
                p.getData();
                p.update();
                p.draw();
            })
            }
        }
        
        let points = new Points(15000);
        
        draw();
        
        function draw(){
            requestAnimationFrame(draw);
            ctx.fillStyle = `rgba(32, 32, 32, 0.1)`;
            ctx.fillRect(0, 0, uX(100), uY(100));
            points.update();
        }
        }
    }
    function canvas3Fn(){
        const defaultBase64 = `data:image/png;base64,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`;

            let base64 = defaultBase64;


            const CONFIG = {
            size: 3,
            gap: 3,
            radius: 250,
            mouseDownRadius: 2000,
            spread: 1,
            friction: 1,
            easing: 1,
            background: '#ffffff',
            };



            const CTRL = new Pane({title: 'Config', expanded: false})

            class Particle {
            constructor({effect, x, y, color}) {
                this.effect = effect;
                this.startingX = x;
                this.startingY = y;
                this.x = Math.random() * this.effect.canvasWidth;
                this.y = Math.random() * this.effect.canvasHeight;
                this.color = color;

                // distance between mouse and partcle
                this.dx = 0;
                this.dy = 0;

                // speed & physics
                this.vx = 0;
                this.vy = 0;
                this.force = 0;
                this.angle = 0;
                this.distance = 0;
                this.friction = (Math.random() * 0.6 + 0.15) * CONFIG.friction;
                this.easing = (Math.random() * 0.3 + 0.005) * CONFIG.easing;
            }

            /**
             * Draw the particle on the canvas
             */
            draw() {
                const context = this.effect.context;

                if (context.fillStyle !== this.color) {
                context.fillStyle = this.color;
                }

                context.fillRect(this.x, this.y, CONFIG.size, CONFIG.size);
            }

            /**
             * Update the particle's position and velocity with the starting position
             * and the mouse position taken into account (along with physics like force and friction)
             */
            update() {
                this.dx = this.effect.mouse.x - this.x;
                this.dy = this.effect.mouse.y - this.y;

                // pythagoras theorem t find hypotenuse
                this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy) * CONFIG.spread;
                this.force = -this.effect.mouse.radius / this.distance;

                // close to mouse cursor
                if (this.distance < this.effect.mouse.radius) {
                // get the angle to push the article away at
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
                }

                // always try to return to original position
                this.x +=
                (this.vx *= this.friction) + (this.startingX - this.x) * this.easing;
                this.y +=
                (this.vy *= this.friction) + (this.startingY - this.y) * this.easing;
            }
            }

            class Effect {
                constructor({
                    context,
                    canvasWidth,
                    canvasHeight,
                }) {
                    this.context = context;
                    this.canvasWidth = canvasWidth;
                    this.canvasHeight = canvasHeight;
                    this.particles = [];

                    // width and height of each pixel square
                    this.mouse = {
                        radius: CONFIG.radius,
                        x: 0,
                        y: 0,
                    };

                    // set up listeners
                    window.addEventListener('mousemove', (event) => {
                        this.mouse.x = event.x;
                        this.mouse.y = event.y;
                    });

                    window.addEventListener(
                        'touchmove',
                        (event) => {
                            this.mouse.x = event.touches[0].clientX;
                            this.mouse.y = event.touches[0].clientY;
                        },
                        {passive: true},
                    );

                    window.addEventListener('mousedown', () => {
                        this.mouse.radius = CONFIG.mouseDownRadius;
                    });

                    window.addEventListener('mouseup', () => {
                        this.mouse.radius = CONFIG.radius;
                    });
                }


                drawImage() {
                    const {context, canvasWidth, canvasHeight} = this;

                    const img = new Image();
                    img.onload = () => {
                    // Calculate dimensions to keep the aspect ratio of image
                    let imgWidth = img.width;
                    let imgHeight = img.height;
                    const ratio = imgWidth / imgHeight;

                    const vmin = Math.min(canvasWidth, canvasHeight);
                    imgWidth = vmin / 2;
                    imgHeight = imgWidth / ratio;

                    // Calculate position to center the image
                    const x = (canvasWidth - imgWidth) / 2;
                    const y = (canvasHeight - imgHeight) / 2;

                    // Clear the canvas before drawing the new image
                    context.clearRect(0, 0, canvasWidth, canvasHeight);

                    // Draw the image
                    context.drawImage(img, x, y, imgWidth, imgHeight);

                    // Convert the image to particles after it's drawn on the canvas
                    this.convertToParticles();
                    };

                    // Set the source of the image to your base64 string
                    img.src = base64;
                }


                /**
                 * Gets the data from the image and clears it from the canvas. Then it creates particles from the
                 * data (e.g. [255,255,255,255] = white and fully opaque)
                 */
                convertToParticles() {
                    this.particles = [];
                    const {context, canvasWidth, canvasHeight} = this;

                    const pixels = context.getImageData(0, 0, canvasWidth, canvasHeight).data;
                    context.clearRect(0, 0, canvasWidth, canvasHeight);

                    // rows
                    for (let y = 0; y < canvasHeight; y += CONFIG.gap) {
                    // columns
                        for (let x = 0; x < canvasWidth; x += CONFIG.gap) {
                            const index = (y * canvasWidth + x) * 4;
                            const alpha = pixels[index + 3];

                            // only draw if pixel is not transparent
                            if (alpha <= 0) continue;

                            const red = pixels[index];
                            const green = pixels[index + 1];
                            const blue = pixels[index + 2];
                            const color = `rgb(${red}, ${green}, ${blue})`;

                            const particle = new Particle({
                            effect: this,
                            x,
                            y,
                            color,
                            });

                            this.particles.push(particle);
                        }
                    }
                }

                /**
                 * Draw on the canvas and update the values of the particles
                 */
                render() {
                    this.particles.forEach((particle) => {
                    particle.update();
                    particle.draw();
                    });
                }

                /**
                 * Ensures the canvas is always the size of the window to display properly
                 */
                resize(newWidth, newHeight) {
                    this.canvasWidth = newWidth;
                    this.canvasHeight = newHeight;

                    this.drawImage();
                }
            }

            function init() {
                const canvas = document.getElementById('canvas3');
                const ctx = canvas.getContext('2d');

                const particleFolder = CTRL.addFolder({title: 'Particles'});

                particleFolder.addBinding(CONFIG, 'size', {min: 1, max: 20, step: 1}).on('change', (ev) => {
                    CONFIG.size = ev.value;
                    effect.drawImage();
                });

                particleFolder.addBinding(CONFIG, 'gap', {min: 1, max: 20, step: 1}).on('change', (ev) => {
                    CONFIG.gap = ev.value;
                    effect.drawImage();
                });

                    const mouseFolder = CTRL.addFolder({title: 'Mouse'});

                mouseFolder.addBinding(CONFIG, 'radius', {min: 25, max: 2500, step: 1}).on('change', (ev) => {
                    CONFIG.radius = ev.value;
                    effect.drawImage();
                });

                mouseFolder.addBinding(CONFIG, 'mouseDownRadius', {label: 'click radius', min: 250, max: 5000, step: 1}).on('change', (ev) => {
                    CONFIG.mouseDownRadius = ev.value;
                    effect.drawImage();
                });

                CTRL.addBinding(CONFIG, 'spread', {min: -1, max: 3, step: 0.01}).on('change', (ev) => {
                    CONFIG.spread = ev.value;
                    effect.drawImage();
                });

                particleFolder.addBinding(CONFIG, 'friction', {min: 0.2, max: 3, step: 0.01}).on('change', (ev) => {
                    CONFIG.friction = ev.value;
                    effect.drawImage();
                });

                particleFolder.addBinding(CONFIG, 'easing', {min: 0.2, max: 3, step: 0.01}).on('change', (ev) => {
                    CONFIG.easing = ev.value;
                    effect.drawImage();
                });

                const miscFolder = CTRL.addFolder({
                    title: 'Misc',
                })


                miscFolder.addBinding(CONFIG, 'background').on('change', (ev) => {
                document.body.style.backgroundColor = ev.value;
                });

                CTRL.addBlade({
                    view: 'separator',
                });

                CTRL.addButton({
                    title: 'Upload Image',
                }).on('click', () => {
                    document.getElementById('image-upload').click();
                });
                CTRL.addBlade({
                    view: 'separator',
                });

                CTRL.addButton({
                    title: 'Reset',
                }).on('click', () => {
                    CONFIG.size = 3;
                    CONFIG.gap = 3;
                    CONFIG.radius = 250;
                    CONFIG.mouseDownRadius = 2000;
                    CONFIG.spread = 1;
                    CONFIG.friction = 1;
                    CONFIG.easing = 1;
                    CONFIG.background = '#ffffff';

                    const fileInput = document.getElementById('image-upload');

                    fileInput.value = ''
                    base64 = defaultBase64;

                    document.body.style.backgroundColor = CONFIG.background;
                    miscFolder.refresh();
                    particleFolder.refresh();
                    mouseFolder.refresh();
                    CTRL.refresh();
                    effect.drawImage();
                });





                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const userPrefersReducedMotion = window.matchMedia(
                    '(prefers-reduced-motion: reduce)',
                ).matches;

                const effect = new Effect({
                    context: ctx,
                    canvasWidth: canvas.width,
                    canvasHeight: canvas.height,
                });

                effect.drawImage();
                effect.render();

                let animationFrame;

                const animate = () => {
                    if (!ctx) return;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    effect.render();
                    animationFrame = requestAnimationFrame(animate);
                };

                animate();

                // const handleResize = () => {
                //     const width = window.innerWidth;
                //     const height = window.innerHeight;

                //     canvas.width = width;
                //     canvas.height = height;

                //     effect.resize(width, height);
                // };
                // window.addEventListener('resize', handleResize);



                // document.getElementById('image-upload').addEventListener('change', function (event) {
                //     if (!event.target.value) {
                //     return;
                //     }

                //     const file = event.target.files[0];
                //     const reader = new FileReader();

                //     reader.onloadend = function () {
                //     // The result attribute contains the data URL (base64 representation of the file)
                //     const base64String = reader.result;

                //     // Now you can use the base64String in your canvas
                //     // For example, if your Effect instance is called `effect`, you could do:
                //     base64 = base64String;
                //     effect.drawImage();
                //     }

                //     if (file) {
                //     reader.readAsDataURL(file);
                //     }
                // });

            }


            init();


            const fps = document.getElementById("fps");
            let startTime = Date.now();
            let frame = 0;

            function tick() {
                let time = Date.now();
                frame++;
                if (time - startTime > 1000) {
                    fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
                    startTime = time;
                    frame = 0;
                }
                window.requestAnimationFrame(tick);
            }
            // tick();
    }
    nextTick(() => {
        canvas1Fn() //基于最新的DOM状态执行update方法
        canvas2Fn()
        canvas3Fn()
  	})
  }
}



</script>


<style lang="scss">
.canvas-box{
    position: relative;
    width: 100%;
    height: auto;
    background-color: #000;
    .title{
        padding: 10px;
        text-align: center;
        font-size: 18px;
        background-color: #fff;
        color: #000;
    }
    // canvas{
    //     width: 100%;
    //     height: 100%;
    // }
    .canvas1{
        position: relative;
        width: 100%;
        #canvas1{
            width: 800px;
            height: 800px;
            background-color: #000;
            // margin-left: 20%;
        }
        p{margin:15px 0px;}
        #interface{
            width:250px;
            height: 600px;
            position:absolute;
            inset: 0;
            border:0px solid black;
            padding:40px; 
            box-sizing: border-box;
            color:#222;
            overflow-y:scroll;
            background-color: rgba(255, 255, 255, 0.8);
            box-shadow: 1px 0px 10px #999;

        }

        input[type="range"] {
            width:100%;
        }
        input[type=range] {
            -webkit-appearance: none;
            background-color: silver;
            height:10px;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            background-color: #666;
            width: 10px;
            height: 26px;
        }
        input[type="button"] {
            padding:5px;
            margin-bottom:5px;
            margin-top:5px;
                background-color:#FF2948;
            border:0px;
            width:100%;
            color:white;
            font-weight:bold;
            font-size:14px;
        }

        input{
            border:0px;
            background-color:transparent;
            margin-top:20px;
            margin-bottom:20px;
        }
        h1{
            padding:0px;
            margin-top:0px;
        }
        select{
            padding:5px;
            margin-bottom:5px;
            margin-top:5px;
                
            width:100%;
        }
        a {
            color:#FF2948;
            font-weight:700;
        }
        
        input[type="text"] {
            width: 100%;
            font-family: sans-serif;
            font-size: 30px;
            appearance: none;
            box-shadow: none;
            border-radius: none;
            border:0px;
            border-bottom:2px solid #FF2948;
            text-align:center;
        }
        ::-webkit-scrollbar {
            width: 14px;
            height: 14px;
        }

        ::-webkit-scrollbar-thumb {
            height: 6px;
            border: 4px solid rgba(0, 0, 0, 0);
            background-clip: padding-box;
            -webkit-border-radius: 7px;
            background-color: rgba(0, 0, 0, .5);
            -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
        }

        ::-webkit-scrollbar-button {
            width: 0;
            height: 0;
            display: none;
        }

        ::-webkit-scrollbar-corner {
            background-color: transparent;
        }
    }
    .canvas2{
        width: 100%;
        padding: 20px;
        background-color: #000;
        position: relative;
        #canvas2{
            background-color: #000;
            // position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
            background-color: #204;
            // margin-left: 20%;
        }
    }
    .canvas3{
        width: 100%;
        height: 800px;
        padding: 20px;
        background-color: #000;
        position: relative;
        .fps {
            background-color:black;
            color:white;
            position:absolute;
            top:0;
            left:0;
            font-family: monospace;
            z-index: 20;
            padding: 4px;
            ponter-events: none;
        }

        #image-upload {
            visibility: hidden;
        }

        #canvas3 {
            height: 100%;
            width: 100%; 
            transition: opacity 0.5s;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
}

</style>
