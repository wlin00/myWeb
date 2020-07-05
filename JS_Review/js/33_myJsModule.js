(function myJsModule(){
    var msg='myJsModule';
    function toLower() {
        console.log("toLower: "+msg.toLowerCase())
    }
    function toUpper() {
        console.log("toUpper: "+msg.toUpperCase())
    }
    //将所有数据和功能封装在一个函数内部，指向外暴露一个包含n个方法的对象或函数；
    //供使用者，通过模块暴露的对象调用方法来实现对应功能
    // return{toLower:toLower,toUpper:toUpper} 方法1：返回值暴露对象，外部调用函数来使用


    // 方法2：
    //或者将函数修改为立即执行函数
    //然后将此对象封装为window的属性
    //window.myJsModule2={ 属性名随意取：属性值是函数对象 }
    window.myJsModule2={toLower:toLower,toUpper:toUpper}

})()