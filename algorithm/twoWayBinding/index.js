/*
Demo1: Object.defineProperty实现双向绑定
*/

var obj = {}
//Object.defineProperty的参数：
//  1 - 定义属性的对象
//  2 - 要定义或者修改的 **属性名称**
//  3 - 将被定义或者修改的熟悉描述符
Object.defineProperty(obj, 'txt', {
    // 使用get、set对数据双向劫持
    get: function(){
        return txt
    },
    set: function(val){
        document.getElementById('inp').value = val
        document.getElementById('view').innerHTML = val
    }
})

document.getElementById('inp').addEventListener('keyup', (e) => {
    // 监听键盘事件，将事件value
    obj.txt = e.target.value
})
