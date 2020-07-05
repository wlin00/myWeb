(function self_canvas() {
    function qipao(param1,param2){
        //此方法在windo.onload下引用

       //  param1:   对应大Div的dom节点
       //  param2:   对应li节点
        var team3 = document.querySelector(param1);
        var team3Lis = document.querySelectorAll(param2);
        var now=0;
        var timer=0;


        biubiu();
        function biubiu(){
            var oc =null;
            var time1=0;
            var time2=0;
            for(var i=0;i<team3Lis.length;i++){
                team3Lis[i].onmouseenter=function(){
                    for(var i=0;i<team3Lis.length;i++){
                        team3Lis[i].style.opacity=.2;
                    }
                    this.style.opacity=1;
                    addCanvas();
                    console.log(this.offsetLeft)

                    oc.style.left = this.offsetLeft+"px";

                }
            }

            function addCanvas(){
                if(!oc){
                    oc = document.createElement("canvas");
                    oc.width = team3Lis[0].offsetWidth;
                    oc.height = team3Lis[0].offsetHeight*2/3;

                    //oc team3
                    /*
                         当指针设备移动到存在监听器的元素或其子元素的时候，
                        mouseover
                        mouseout（有冒泡）

                        mouseenter
                        mouseleave（无冒泡）
                        事件就会被触发
                    */
                    team3.onmouseleave=function(){
                        for(var i=0;i<team3Lis.length;i++){
                            team3Lis[i].style.opacity=1;
                        }

                        removeCanvas();
                    }


                    team3.appendChild(oc);
                    QiPao()
                }
            }


            function QiPao(){
                if(oc.getContext){
                    var ctx = oc.getContext("2d");
                    var arr=[];
                    //将数组中的圆绘制到画布上
                    time1=setInterval(function(){
                        ctx.clearRect(0,0,oc.width,oc.height);
                        //动画
                        for(var i=0;i<arr.length;i++){
                            arr[i].deg+=10;
                            arr[i].x = arr[i].startX +  Math.sin( arr[i].deg*Math.PI/180 )*arr[i].step*2;
                            arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step ;

                            if(arr[i].y <=50){
                                arr.splice(i,1)
                            }
                        }
                        //绘制
                        for(var i=0;i<arr.length;i++){
                            ctx.save();
                            ctx.fillStyle="rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alp+")";
                            ctx.beginPath();
                            ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
                            ctx.fill();
                            ctx.restore();
                        }
                    },1000/60)

                    //往arr中注入随机圆的信息
                    time2=setInterval(function(){
                        var r =Math.random()*6+2;
                        var x = Math.random()*oc.width;
                        var y = oc.height - r;
                        var red =   Math.round(Math.random()*255);
                        var green = Math.round(Math.random()*255);
                        var blue =  Math.round(Math.random()*255);
                        var alp = 1;


                        var deg =0;
                        var startX = x;
                        var startY = y;
                        //曲线的运动形式
                        var step =Math.random()*20+10;
                        arr.push({
                            x:x,
                            y:y,
                            r:r,
                            red:red,
                            green:green,
                            blue:blue,
                            alp:alp,
                            deg:deg,
                            startX:startX,
                            startY:startY,
                            step:step
                        })
                    },50)
                }
            }

            function removeCanvas(){
                oc.remove();
                oc=null;
                clearInterval(time1);
                clearInterval(time2);
            }
        }


    }

    window.self_canvas={
        qipao:qipao
    }
})();