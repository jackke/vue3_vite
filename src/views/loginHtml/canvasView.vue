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
        <div class="canvas1">
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
    </div>
</template>

<!-- <script src="./js/twgl.min.js"></script> -->
<script>
import { onMounted, ref, nextTick } from 'vue'; 
export default {  
  setup() {  

    onMounted(async () => {  
    //   count.value++;  
      await nextTick(); // 等待下一个DOM更新循环结束  
    //   console.log('DOM updated'); // 在DOM更新后执行的代码  
    });
    function canvas1(){
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
    nextTick(() => {
        canvas1() //基于最新的DOM状态执行update方法
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
    // canvas{
    //     width: 100%;
    //     height: 100%;
    // }
    .canvas1{
        position:absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        #canvas1{
            width: 800px;
            height: 600px;
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
}

</style>
