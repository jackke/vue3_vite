<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:07:27
 * @LastEditTime: 2023-02-09 14:38:06
 * @FilePath: /vue3_vite/src/views/Home.vue
 * @Description: 
-->

<template>
    <div class="three3-box">
        <div id="surface_0" class="surface">
            <img class="bg" src="/src/assets/threeImg/negz.jpg" alt="">
        </div>
        <div id="surface_1" class="surface">
            <img class="bg" src="/src/assets/threeImg/negx.jpg" alt="">
        </div>
        <div id="surface_2" class="surface">
            <img class="bg" src="/src/assets/threeImg/posy.jpg" alt="">
        </div>
        <div id="surface_3" class="surface">
            <img class="bg" src="/src/assets/threeImg/negy.jpg" alt="">
        </div>
        <div id="surface_4" class="surface">
            <img class="bg" src="/src/assets/threeImg/posz.jpg" alt="">
        </div>
        <div id="surface_5" class="surface">
            <img class="bg" src="/src/assets/threeImg/negz.jpg" alt="">
        </div>
    </div>
</template>

<script>
import * as THREE from "three";
import {CSS3DObject,CSS3DRenderer, CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer"
// import * as THREE from "./three.min.js"
import { onMounted, ref, nextTick, } from 'vue'; 
export default {
    components: {},
    setup() {  
        onMounted(async () => {  
            //   count.value++;  
            await nextTick(); // 等待下一个DOM更新循环结束  
            //   console.log('DOM updated'); // 在DOM更新后执行的代码  
        });
        function threeFn(){
            var camera, scene, renderer;
            var geometry, material, mesh;
            var target = new THREE.Vector3();
            var lon = 90, lat = 0;
            var phi = 0, theta = 0;
            var touchX, touchY;
            init();
            animate();
            function init() {
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
                scene = new THREE.Scene();
                var sides = [
                    {
                        position: [ -512, 0, 0 ],//位置
                        rotation: [ 0, Math.PI / 2, 0 ]//角度
                    },
                    {
                        position: [ 512, 0, 0 ],
                        rotation: [ 0, -Math.PI / 2, 0 ]
                    },
                    {
                        position: [ 0,  512, 0 ],
                        rotation: [ Math.PI / 2, 0, Math.PI ]
                    },
                    {
                        position: [ 0, -512, 0 ],
                        rotation: [ - Math.PI / 2, 0, Math.PI ]
                    },
                    {
                        position: [ 0, 0,  512 ],
                        rotation: [ 0, Math.PI, 0 ]
                    },
                    {
                        position: [ 0, 0, -512 ],
                        rotation: [ 0, 0, 0 ]
                    }
                ];

                /**
                 * 根据六个面的信息，new出六个对象放入场景中
                 */
                for ( var i = 0; i < sides.length; i ++ ) {

                    var side = sides[ i ];

                    var element = document.getElementById("surface_"+i);
                    element.width = 1026; // 2 pixels extra to close the gap.多余的2像素用于闭合正方体

                    var object = new CSS3DObject( element );
                    object.position.fromArray( side.position );
                    object.rotation.fromArray( side.rotation );
                    scene.add( object );

                }

                renderer = new CSS3DRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                document.body.appendChild( renderer.domElement );

                document.addEventListener( 'mousedown', onDocumentMouseDown, false );
                document.addEventListener( 'wheel', onDocumentMouseWheel, false );

                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function animate() {

                // requestAnimationFrame( animate );

                // lat +=  0.1;
                lat = Math.max( - 85, Math.min( 85, lat ) );
                phi = THREE.Math.degToRad( 90 - lat );
                theta = THREE.Math.degToRad( lon );

                target.x = Math.sin( phi ) * Math.cos( theta );
                target.y = Math.cos( phi );
                target.z = Math.sin( phi ) * Math.sin( theta );

                camera.lookAt( target );
                /**
                 * 通过传入的scene和camera
                 * 获取其中object在创建时候传入的element信息
                 * 以及后面定义的包括位置，角度等信息
                 * 根据场景中的obj创建dom元素
                 * 插入render本身自己创建的场景div中
                 * 达到渲染场景的效果
                 */
                renderer.render( scene, camera );

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function onDocumentMouseDown( event ) {

                event.preventDefault();

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'mouseup', onDocumentMouseUp, false );

            }

            function onDocumentMouseMove( event ) {

                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

                lon -= movementX * 0.1;
                lat += movementY * 0.1;

            }

            function onDocumentMouseUp( event ) {

                document.removeEventListener( 'mousemove', onDocumentMouseMove );
                document.removeEventListener( 'mouseup', onDocumentMouseUp );

            }

            function onDocumentMouseWheel( event ) {

                camera.fov += event.deltaY * 0.05;
                camera.updateProjectionMatrix();

            }

            function onDocumentTouchStart( event ) {

                event.preventDefault();

                var touch = event.touches[ 0 ];

                touchX = touch.screenX;
                touchY = touch.screenY;

            }

            function onDocumentTouchMove( event ) {

                event.preventDefault();

                var touch = event.touches[ 0 ];

                lon -= ( touch.screenX - touchX ) * 0.1;
                lat += ( touch.screenY - touchY ) * 0.1;

                touchX = touch.screenX;
                touchY = touch.screenY;

            }

        }
        function threefn2(){
            /**
             * Created by xia on 2017/2/22.
             */
            /**
             * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
             * @author mrdoob / http://mrdoob.com/
             */
            let CSS3DObjectFn = new CSS3DObject(function (element) {
                THREE.Object3D.call(this);
                this.element = element;
                this.element.style.position = 'absolute';
                this.addEventListener('removed', function (event) {
                    if (this.element.parentNode !== null) {
                        this.element.parentNode.removeChild(this.element);
                        for (var i = 0, l = this.children.length; i < l; i++) {
                            this.children[i].dispatchEvent(event)
                        }
                    }
                })
            })
            THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);
            let CSS3DSpriteFn = new CSS3DSprite(function (element) {
                THREE.CSS3DObject.call(this, element)
            })
            THREE.CSS3DSprite = 
            THREE.CSS3DSprite.prototype = Object.create(THREE.CSS3DObject.prototype);//
            let CSS3DRendererFn = new CSS3DRenderer(function () {
                console.log('THREE.CSS3DRenderer', THREE.REVISION);
                var _width, _height;
                var _widthHalf, _heightHalf;
                var matrix = new THREE.Matrix4();
                var domElement = document.createElement('div');
                domElement.style.overflow = 'hidden';
                domElement.style.WebkitTransformStyle = 'preserve-3d';
                domElement.style.MozTransformStyle = 'preserve-3d';
                domElement.style.oTransformStyle = 'preserve-3d';
                domElement.style.transformStyle = 'preserve-3d';
                this.domElement = domElement;
                var cameraElement = document.createElement('div');
                cameraElement.style.WebkitTransformStyle = 'preserve-3d';
                cameraElement.style.MozTransformStyle = 'preserve-3d';
                cameraElement.style.oTransformStyle = 'preserve-3d';
                cameraElement.style.transformStyle = 'preserve-3d';
                domElement.appendChild(cameraElement);
                this.setClearColor = function () {
                }
                ;
                this.setSize = function (width, height) {
                    _width = width;
                    _height = height;
                    _widthHalf = _width / 2;
                    _heightHalf = _height / 2;
                    domElement.style.width = width + 'px';
                    domElement.style.height = height + 'px';
                    cameraElement.style.width = width + 'px';
                    cameraElement.style.height = height + 'px'
                }
                ;
                var epsilon = function (value) {
                        return Math.abs(value) < 0.000001 ? 0 : value
                    }
                    ;
                var getCameraCSSMatrix = function (matrix) {
                        var elements = matrix.elements;
                        return 'matrix3d(' +
                            epsilon(elements[0]) + ',' +
                            epsilon(-elements[1]) + ',' +
                            epsilon(elements[2]) + ',' +
                            epsilon(elements[3]) + ',' +
                            epsilon(elements[4]) + ',' +
                            epsilon(-elements[5]) + ',' +
                            epsilon(elements[6]) + ',' +
                            epsilon(elements[7]) + ',' +
                            epsilon(elements[8]) + ',' +
                            epsilon(-elements[9]) + ',' +
                            epsilon(elements[10]) + ',' +
                            epsilon(elements[11]) + ',' +
                            epsilon(elements[12]) + ',' +
                            epsilon(-elements[13]) + ',' +
                            epsilon(elements[14]) + ',' +
                            epsilon(elements[15]) +
                            ')'
                    }
                    ;
                var getObjectCSSMatrix = function (matrix) {
                        var elements = matrix.elements;
                        return 'translate3d(-50%,-50%,0) matrix3d(' +
                            epsilon(elements[0]) + ',' +
                            epsilon(elements[1]) + ',' +
                            epsilon(elements[2]) + ',' +
                            epsilon(elements[3]) + ',' +
                            epsilon(-elements[4]) + ',' +
                            epsilon(-elements[5]) + ',' +
                            epsilon(-elements[6]) + ',' +
                            epsilon(-elements[7]) + ',' +
                            epsilon(elements[8]) + ',' +
                            epsilon(elements[9]) + ',' +
                            epsilon(elements[10]) + ',' +
                            epsilon(elements[11]) + ',' +
                            epsilon(elements[12]) + ',' +
                            epsilon(elements[13]) + ',' +
                            epsilon(elements[14]) + ',' +
                            epsilon(elements[15]) +
                            ')'
                    }
                    ;
                var renderObject = function (object, camera) {
                    if (object instanceof CSS3DObjectFn) {
                        var style;
                        if (object instanceof CSS3DSpriteFn) {// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

                            matrix.copy(camera.matrixWorldInverse);
                            matrix.transpose();
                            matrix.copyPosition(object.matrixWorld);
                            matrix.scale(object.scale);
                            matrix.elements[3] = 0;
                            matrix.elements[7] = 0;
                            matrix.elements[11] = 0;
                            matrix.elements[15] = 1;
                            style = getObjectCSSMatrix(matrix)
                        }
                        else {
                            style = getObjectCSSMatrix(object.matrixWorld)
                        }
                        var element = object.element;
                        element.style.WebkitTransform = style;
                        element.style.MozTransform = style;
                        element.style.oTransform = style;
                        element.style.transform = style;
                        if (element.parentNode !== cameraElement) {
                            cameraElement.appendChild(element)
                        }
                    }
                    for (var i = 0, l = object.children.length; i < l; i++) {
                        renderObject(object.children[i], camera)
                    }
                };
                this.render = function (scene, camera) {
                    var fov = 0.5 / Math.tan(THREE.Math.degToRad(camera.fov * 0.5)) * _height;
                    domElement.style.WebkitPerspective = fov + "px";
                    domElement.style.MozPerspective = fov + "px";
                    domElement.style.oPerspective = fov + "px";
                    domElement.style.perspective = fov + "px";
                    scene.updateMatrixWorld();
                    if (camera.parent === undefined) camera.updateMatrixWorld();
                    camera.matrixWorldInverse.getInverse(camera.matrixWorld);
                    var style = "translate3d(0,0," + fov + "px)" + getCameraCSSMatrix(camera.matrixWorldInverse) +
                        " translate3d(" + _widthHalf + "px," + _heightHalf + "px,0)";
                    cameraElement.style.WebkitTransform = style;
                    cameraElement.style.MozTransform = style;
                    cameraElement.style.oTransform = style;
                    cameraElement.style.transform = style;
                    renderObject(scene, camera)
                }
            })
            
        }

        nextTick(() => {
            threeFn()
            threefn2()

        })
    }
}



</script>


<style lang="scss">
.three3-box{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: left;
}

</style>
