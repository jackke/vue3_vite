<!--
 * @Author: zk
 * @AuthorEnd: your name
 * @Date: 2022-10-11 10:07:27
 * @LastEditTime: 2023-02-09 14:38:06
 * @FilePath: /vue3_vite/src/views/Home.vue
 * @Description: 
-->

<template>
    <div class="home-box">
        <div id="webgl"></div>
    </div>
</template>
<script>
import * as THREE from 'three'
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
              var scene = new THREE.Scene();
              // 球体
              const geometry = new THREE.SphereGeometry(150, 32, 32)
              // 材质
              const material = new THREE.MeshPhongMaterial({
                  map: new THREE.TextureLoader().load('/src/assets/image/diqiu.jpg')
              }) 
              // 物体
              const earth = new THREE.Mesh(geometry, material)
              earth.position.set(0, 10, 0)
              scene.add(earth)
              // 视窗尺寸
              const width = 800
              const height = 600
              // 创建相机
              const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 800)
              // 相机位置
              camera.position.set(200, 200, 200)
              // 相机朝向
              camera.lookAt(earth.position)
              // 创建点光源
              const light = new THREE.PointLight(0xffffff, 1, 100)
              light.position.set(0, 0, 0)
              scene.add(light)
              // 创建环境光
              const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
              // 设置光源的方向
              directionalLight.position.set(80, 100, 50)
              // 设置光的target
              directionalLight.target = earth
              scene.add(directionalLight)
              // 创建渲染器
              const renderer = new THREE.WebGLRenderer()
              renderer.setSize(width, height)
              // 挂载到id为webgl的div
              document.getElementById('webgl').appendChild(renderer.domElement)
              // 循环调用
              function animation() {
              requestAnimationFrame(animation)
              earth.rotation.y += 0.01
              renderer.render(scene,camera)
              }
              animation()
          }
          nextTick(() => {
            threeFn()
          })
      }
  }
     


</script>


<style lang="scss" scoped>


</style>
