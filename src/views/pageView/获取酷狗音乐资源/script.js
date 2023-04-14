"use strict";
var kgmusic = (function (w) {
    let kg = {}
    kg.audio = document.createElement("audio");
    kg.msg = {"keyword":"","total":0, "hash":"", "albumid":"", "volume":"", "lrc_time":[], "lrc_txt":[], "open_lrc":true,"isBool":false,"isRand":false}
    kg.song = {
        sTomin:function(s){
            var h;
            h  =   Math.floor(s/60);
            s  =   s%60;
            h    +=    '';
            s    +=    '';
            h  =   (h.length==1)?'0'+h:h;
            s  =   (s.length==1)?'0'+s:s;
            s = parseInt(s);
            if(s<10){
                s = "0"+s;
            }
            return h+':'+s;
        },
        time_to_sec:function(time){
            var s = '';

            var min = time.split(':')[0];
            var sec = time.split(':')[1];

            s = Number(min*60) + Number(sec);

            return s;
        },
        trim:function(str){
            return str.replace(/\s+/g,"");
        },
        empty:function(v){
            switch(typeof v){
                case 'undefined':
                    return true;
                case 'string':
                    if(kg.song.trim(v).length == 0){
                        return true;
                    }
                    break;
                case 'boolean':
                    if(!v){
                        return true;
                    }
                    break;
                case 'number':
                    if(0 === v){
                        return true;
                    }
                    break;
                case 'object':
                    if(null === v){
                        return true;
                    }
                    if(undefined !== v.length && v.length==0){
                        return true;
                    }
                    for(var k in v){
                        return false;
                    }
                    return true;
                    break;
            }
            return false;
        },
        removeEmpty:function(arr){
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] == "" || typeof(arr[i]) == "undefined") {
                    arr.splice(i,1);
                    i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位
                }
            }
            return arr;
        },
        init:function () {
            let searchBtn = document.querySelector("#search");
            let coverBtn = document.querySelector("#cover");
            let playRightBtn = document.querySelector("#play_right");
            let playLeftBtn = document.querySelector("#play_left");
            let progressEle = document.querySelector("#progress");
            let lrcEle = document.createElement("div");
            lrcEle.id = "lrc";
            lrcEle.className = "lrc";
            document.body.appendChild(lrcEle);
            searchBtn.onclick = function(){
                let nameEle = document.querySelector("#name");
                if(kg.song.empty(nameEle.value) || nameEle.value.replace(/\s*/g,"") == ''){
                    layer.msg('请输入搜索关键词');
                    nameEle.value = '';
                    nameEle.focus();
                }else{
                    kg.msg.keyword = nameEle.value;
                    kg.msg.isBool = true;
                    kg.song.search();
                }

            }
            coverBtn.onclick = function () {
                if($(this).hasClass('btn_pause')){
                    kg.song.songPause();
                }else{
                    kg.song.songPlay();
                }
            }
            playRightBtn.onclick = function () { //下一首
                kg.song.nextSong();
            }
            playLeftBtn.onclick = function () {
                kg.song.prveSong();
            }
            progressEle.addEventListener('mousedown', (e) => {
                if(isNaN(kg.audio.duration)){
                    return;
                }

                let  x = e.clientX-50;
                let total_width = progressEle.clientWidth;
                let bar = ((x/total_width)*100).toFixed(2);
                let playBarEle = document.querySelector("#play_on");
                playBarEle.style.transform = "translateX("+bar+"%)";
                kg.audio.currentTime = parseInt(kg.audio.duration * bar/100);
            });
            layui.use(['dropdown', 'util', 'layer', 'table'], function(){
                let dropdown = layui.dropdown,util = layui.util,layer = layui.layer,table = layui.table,$ = layui.jquery;
                dropdown.render({
                    elem: '.loop'
                    ,data: [{
                        title: '顺序播放'
                        ,id: 100
                    },{
                        title: '单曲循环'
                        ,id: 101
                    },{
                        title: '随机播放'
                        ,id: 102
                    }]
                    ,click: function(param){
                        if(param.id == '100'){
                            kg.audio.loop = false;
                            kg.msg.isRand = false;
                        }else if(param.id == '101'){
                            kg.audio.loop = true;
                            kg.msg.isRand = false;
                        }else if(param.id == '102'){
                            kg.audio.loop = false;
                            kg.msg.isRand = true;
                        }
                        this.elem[0].innerText = param.title;
                        layer.tips(param.title+"模式已开启", this.elem, {tips: [1, '#169af3']});
                    }
                });
            });
        },
        songMuted:function (isMuted) {
            if (isMuted){
                $(".vlue-icon i").addClass("v_c").removeClass("v_o");
            }else {
                $(".vlue-icon i").addClass("v_o").removeClass("v_c");
            }
            kg.audio.muted = isMuted;
        },
        setVolume:function (volume) {
            kg.audio.volume = volume;
        },
        setTotaltime:function(){
            let totalTimeEle = document.querySelector("#totalTime");
            totalTimeEle.innerHTML = kg.song.sTomin(kg.audio.duration);
        },
        setCurrenttime:function(){
            let curtime = parseInt(kg.audio.currentTime,10);
            let bar = ((curtime/kg.audio.duration)*100).toFixed(2);
            let playbarEle = document.querySelector("#play_on");
            let currentTimeEle = document.querySelector("#currentTime");
            playbarEle.style.transform = "translateX("+bar+"%)";
            currentTimeEle.innerHTML = kg.song.sTomin(curtime);
        },
        
        setLrc:function(){
            for (var i = 0;i<kg.msg.lrc_time.length;i++){
                if(kg.audio.currentTime>=kg.song.time_to_sec(kg.msg.lrc_time[i])){
                    document.getElementById("lrc").innerHTML = "<p>"+kg.msg.lrc_txt[i]+"</p>";
                }
            }
        },
        nextSong:function(){
            kg.song.design("next");
        },
        prveSong:function(){
            kg.song.design("prve");
        },
        design:function(){
            if(typeof arguments[0] == 'number'){
                var nextEle = document.querySelector("a[data-num='"+(arguments[0])+"']");
            }else {
                if(this.empty(kg.msg.hash)){
                    layer.msg('没有选择音乐');
                    return;
                }
                let currentEle = document.querySelector("a[data-hash='"+kg.msg.hash+"']");
                if(this.empty(currentEle)){
                    layer.msg('请从新选择播放');
                    return;
                }
                let data_num = Number(currentEle.getAttribute("data-num"));
                if (arguments[0] == "prve"){
                    data_num -- ;
                    if(data_num < 0){
                        layer.msg('已经是第一首了...');
                        return;
                    }
                }else {
                    data_num ++;
                    if(data_num > 9){
                        layer.msg('已经是最后一首了...');
                        return;
                    }
                }
                var nextEle = document.querySelector("a[data-num='"+(data_num)+"']");
            }
            kg.song.play(nextEle);
        },
        controlPlay:function(){
            let data = arguments[0];
            let imgELe = document.querySelector("#singer-img");
            let audioNameEle = document.querySelector("#audio_name");
            let lrcTxt = data.lyrics.split("\r\n");
            let lrc = this.removeEmpty(lrcTxt.splice(10,lrcTxt.length))
            let arrTxt = [];
            kg.msg.lrc_time.splice(0, kg.msg.lrc_time.length);
            kg.msg.lrc_txt.splice(0, kg.msg.lrc_txt.length);
            for (var i=0;i<lrc.length;i++){
                arrTxt = lrc[i].split("]");
                kg.msg.lrc_time.push(arrTxt[0].split("[")[1]);
                kg.msg.lrc_txt.push(arrTxt[1]);
            }
            kg.audio.src = data.play_url;
            imgELe.src =data.img;
            audioNameEle.innerHTML= data.audio_name;
            document.getElementById("lrc").innerHTML = '';
            kg.song.songPlay();
        },
        songPause:function () { //播放暂停
            kg.audio.pause();
            $("#cover").removeClass("btn_pause").addClass("btn_play");
        },
        songPlay:function () {//播放
            if(this.empty(kg.audio.getAttribute("src"))){
                layer.msg('没有选择音乐...');
                return;
            }
            kg.audio.play();
            $("#cover").removeClass("btn_play").addClass("btn_pause");
        },
        setPage:function(total){
            layui.use(['laypage', 'layer'], function(){
                var laypage = layui.laypage,layer = layui.layer;
                laypage.render({
                    elem: 'page'
                    ,count: total //数据总数
                    ,jump: function(ob,first){
                        if(!first){
                            kg.song.search(ob.curr);
                        }
                    }
                });
            });
        },
        setSong:function(d){
            layui.use('laytpl', function() {
                var laytpl = layui.laytpl;
                var temp = document.getElementById("temp").innerHTML;
                var app = document.getElementById("app");
                var data ={
                    "title": "\u7528\u6237\u7edf\u8ba1",
                    "data":d,
                    "format":kg.song.sTomin
                }
                laytpl(temp).render(data, function(html) {
                    app.innerHTML = html;
                });
            });
        },
        play:function(param){
            if(typeof param == "object"){
                var hash = param.getAttribute("data-hash");
                var AlbumID= param.getAttribute("albumid");
                kg.msg.hash = hash;
            }else{
                layer.msg('已经播放完了...');
                return;
            }
            $.ajax({
                type: "get",
                url: "https://wwwapi.kugou.com/yy/index.php?r=play/getdata&mid=15e720a03ff65beae49953da3a6f0d05",
                data:{hash:hash,album_id:AlbumID},
                dataType: "jsonp",
                beforeSend:function(){
                    layer.msg('加载中', {icon: 16,shade: 0.01});
                },
                complete:function(){
                    layer.closeAll();
                },
                success: function(d){
                    if(d.status == 1){
                        var play_url = d.data.play_url
                        if(kg.song.empty(play_url)){
                            kg.song.design();
                            return;
                        }
                        kg.song.controlPlay(d.data);

                    }else{
                        layer.msg('数据出错！', {icon: 2});
                    }
                },
                error:function (data) {
                    layer.msg('请求失败！', {icon: 2});
                },
            });
        },
        search:function (page = 1) {
            $.ajax({
                type: "get",
                url: "https://songsearch.kugou.com/song_search_v2?clientver=&platform=WebFilter&tag=em",
                dataType: "jsonp",
                data:{"page":page,"pagesize":10,"keyword":kg.msg.keyword},
                beforeSend:function(){
                    $(".load").fadeIn();
                },
                complete:function(){
                    $(".load").fadeOut();
                },
                success: function(d){
                    if(d.status == 1){
                        kg.song.setSong(d.data.lists);
                        if(kg.msg.isBool){
                            kg.msg.isBool = false;
                            kg.song.setPage(d.data.total);
                        }
                    }else{
                        layer.msg('暂无数据！', {icon: 2});
                    }
                },
                error:function (data) {
                    layer.msg('请求失败！', {icon: 2});
                },
            });
        },
        event:function () {
            kg.audio.addEventListener("ended", function() {
                if(kg.msg.isRand){
                    var randNum = Math.floor(Math.random()*10);
                    kg.song.design(randNum);
                } else {
                    kg.song.design();
                }

            });
            kg.audio.addEventListener("playing",function () {
                kg.song.setTotaltime();
            });
            kg.audio.addEventListener('timeupdate', function() {
                kg.song.setCurrenttime();
                if(kg.msg.open_lrc){
                    kg.song.setLrc();
                }
            });
            document.onkeydown = function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(e && e.keyCode==13){ //enter键
                    document.getElementById("search").click();
                }
                if(e && e.keyCode==39){ // right键
                    document.getElementById("play_right").click();
                }
                if(e && e.keyCode==37){ // left键
                    document.getElementById("play_left").click();
                }
                if(e && e.keyCode==38){ // up键
                    desionVolume('up');
                }
                if(e && e.keyCode==40){ // down键
                    desionVolume('down')
                }
                function desionVolume() {
                    let type = arguments[0];
                    let currentVol = 5;
                    let volume =  parseFloat(document.getElementById("volume").value)*10;
                    if (type === 'up'){
                        currentVol = (++volume)/10;
                        if(currentVol >= 1){
                            currentVol = 1;
                            kg.song.songMuted(false);
                        }
                    }else{
                        currentVol = (--volume)/10;
                        if(currentVol <= 0){
                            currentVol = 0;
                            kg.song.songMuted(true);
                        }
                    }
                    document.getElementById("volume").value = currentVol;
                    kg.song.setVolume(currentVol);
                }
            };
        },
        doJquery:function(){
            let currentVol = 5;
            $(".vlue-icon").click(function () {
                let isMuted,ele = $(this).children("i");
                if(ele.hasClass("v_o")){
                    isMuted = true;
                    $("#volume").val(0);
                }else {
                    isMuted = false;
                    $("#volume").val(currentVol);
                }
                kg.song.songMuted(isMuted);
            });
            $("#volume").change(function () {
                if($(this).val() == 0){
                    kg.song.songMuted(true);
                }else {
                    currentVol = $(this).val();
                    kg.song.songMuted(false);
                    kg.song.setVolume(currentVol);
                }
            });
            $("#cmn-toggle-1").click(function () {
                if($(this).is(':checked')){
                    kg.msg.open_lrc = true;
                    $("#lrc").fadeIn();
                }else{
                    kg.msg.open_lrc = false;
                    $("#lrc").fadeOut();
                }
            });
            $("#loop").click(function () {
                if($(this).is(':checked')){
                    kg.audio.loop = true;
                }else{
                    kg.audio.loop = false;
                }
            });
            $("#app").on('click','a',function (e) {
                kg.song.play(e.target);
            });
            $("#app").on('click','span',function (e) {
                layer.msg('功能实现中...');
            });
        }
    }
    return function () {
        kg.song.init();
        kg.song.event();
        kg.song.doJquery();
    }
})(window);
kgmusic();