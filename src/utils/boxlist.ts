const path = '/src/views/pageView'
const img = '/src/image/html.jpg'

const options = [
    {name:'css滑块滑动无缝切换 平滑切换动画', type: 'string', path: `${path}/css滑块滑动无缝切换_平滑切换动画/index.html`, img: img, imgUrl: ''},
    {name:'六边形彩色动画', type: 'string', path: `${path}/六边形彩色动画/index.html`, img: img, imgUrl: ''},
    {name:'3D百叶窗广告牌轮播特效', type: 'string', path: `${path}/3D百叶窗广告牌轮播特效/index.html`, img: img, imgUrl: ''},
    {name:'亮/暗风格的圆形和方块动画特效', type: 'string', path: `${path}/亮暗风格的圆形和方块动画特效/index.html`, img: img, imgUrl: ''},
    {name:'太空404', type: 'string', path: `${path}/太空404/index.html`, img: img, imgUrl: ''},
    {name:'动态显示媒体文件播放时间', type: 'string', path: `${path}/动态显示媒体文件播放时间/index.html`, img: img, imgUrl: ''},
    {name:'放大镜商城图片', type: 'string', path: `${path}/放大镜商城图片/index.html`, img: img, imgUrl: ''},
    {name:'象棋_files', type: 'string', path: `${path}/象棋_files/index.html`, img: img, imgUrl: ''},
    {name:'从亮到暗', type: 'string', path: `${path}/从亮到暗/index.html`, img: img, imgUrl: ''},
    {name:'光离子倒计时', type: 'string', path: `${path}/光离子倒计时/index.html`, img: img, imgUrl: ''},
    {name:'网状线条背景导航索引特效', type: 'string', path: `${path}/网状线条背景导航索引特效/index.html`, img: img, imgUrl: ''},
    {name:'jQuery迅雷首页全屏图片切换代码', type: 'string', path: `${path}/jQuery迅雷首页全屏图片切换代码/index.html`, img: img, imgUrl: ''},
    {name:'简易的中性时钟特效', type: 'string', path: `${path}/简易的中性时钟特效/index.html`, img: img, imgUrl: ''},
    {name:'响应式的社交平台用户界面ui布局', type: 'string', path: `${path}/响应式的社交平台用户界面ui布局/index.html`, img: img, imgUrl: ''},
    {name:'科幻的粒子闪烁动画特效', type: 'string', path: `${path}/科幻的粒子闪烁动画特效/index.html`, img: img, imgUrl: ''},
    {name:'倒计时', type: 'string', path: `${path}/倒计时/index.html`, img: img, imgUrl: ''},
    {name:'酷炫的jQuery 3D图片轮播幻灯片带进度条的图片切换特效', type: 'string', path: `${path}/酷炫的jQuery_3D图片轮播幻灯片带进度条的图片切换特效/index.html`, img: img, imgUrl: ''},
    {name:'CSS3 3D立方体焦点图动画', type: 'string', path: `${path}/CSS3_3D立方体焦点图动画/index.html`, img: img, imgUrl: ''},
    {name:'3D逼真的吊摆球动画特效', type: 'string', path: `${path}/3D逼真的吊摆球动画特效/index.html`, img: img, imgUrl: ''},
    {name:'css溜滑板的人物动画特效', type: 'string', path: `${path}/css溜滑板的人物动画特效/index.html`, img: img, imgUrl: ''},
    {name:'原生js贪吃蛇游戏源码', type: 'string', path: `${path}/原生js贪吃蛇游戏源码.html`, img: img, imgUrl: ''},
    {name:'3D旋转', type: 'string', path: `${path}/3D旋转/index.html`, img: img, imgUrl: ''},
    {name:'响应式的幸运大转盘源码', type: 'string', path: `${path}/响应式的幸运大转盘源码/index.html`, img: img, imgUrl: ''},
    {name:'全屏的视频播放video特效', type: 'string', path: `${path}/全屏的视频播放video特效/index.html`, img: img, imgUrl: ''},
    {name:'创意的元素周期表ui布局特效', type: 'string', path: `${path}/创意的元素周期表ui布局特效/index.html`, img: img, imgUrl: ''},
    {name:'星光璀璨的万花筒动画特效', type: 'string', path: `${path}/星光璀璨的万花筒动画特效/index.html`, img: img, imgUrl: ''},
    {name:'超酷的环形动画进度数字时钟', type: 'string', path: `${path}/超酷的环形动画进度数字时钟/index.html`, img: img, imgUrl: ''},
    {name:'银河星空动画特效', type: 'string', path: `${path}/银河星空动画特效/index.html`, img: img, imgUrl: ''},
    {name:'WebGL滑动烟雾流体动画特效', type: 'string', path: `${path}/WebGL滑动烟雾流体动画特效/index.html`, img: img, imgUrl: ''},
    {name:'简易的五子棋小游戏H5源码', type: 'string', path: `${path}/简易的五子棋小游戏H5源码/index.html`, img: img, imgUrl: ''},
    {name:'html5全屏七夕表白页面滚动模板', type: 'string', path: `${path}/html5全屏七夕表白页面滚动模板/index.html`, img: img, imgUrl: ''},
    {name:'CSS粉色发光霓虹效果文字特效', type: 'string', path: `${path}/CSS粉色发光霓虹效果文字特效/index.html`, img: img, imgUrl: ''},
    {name:'获取酷狗音乐资源', type: 'string', path: `${path}/获取酷狗音乐资源/index.html`, img: img, imgUrl: ''},
    {name:'Canvas渐变彩色圈发光动画', type: 'string', path: `${path}/Canvas渐变彩色圈发光动画/index.html`, img: img, imgUrl: ''},
    {name:'Anime.js 烟花画布演示', type: 'string', path: `${path}/Anime.js_烟花画布演示/index.html`, img: img, imgUrl: ''},
    {name:'时间轮盘1', type: 'string', path: `${path}/时间轮盘1/index.html`, img: img, imgUrl: ''},
    {name:'时间轮盘2', type: 'string', path: `${path}/时间轮盘1/index1.html`, img: img, imgUrl: ''},
    {name:'CSS3黑色精美网页动画菜单导航', type: 'string', path: `${path}/CSS3黑色精美网页动画菜单导航/index.html`, img: img, imgUrl: ''},
    {name:'jQuery五彩炫酷模拟键盘', type: 'string', path: `${path}/jQuery五彩炫酷模拟键盘/index.html`, img: img, imgUrl: ''},
    {name:'模拟计算器(vue)', type: 'string', path: `${path}/Vue计算器/index.html`, img: img, imgUrl: ''},
    {name:'烟花', type: 'string', path: `${path}/烟花.html`, img: img, imgUrl: ''},
    {name:'MASK进行转场动画', type: 'string', path: `${path}/MASK进行转场动画/index.html`, img: img, imgUrl: ''},
    {name:'练习CSS', type: 'string', path: `${path}/indexAn.html`, img: img, imgUrl: ''},

]

// module.exports = options
export default {options}
// export interface Options {
//     options?: any,
// }