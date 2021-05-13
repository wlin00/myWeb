/*
Demo1: 构造函数的constructor
*/

var a,b
(function(){
    function A(arr1, arr2) {
        this.a = 1
        this.b = 2
    }

    A.prototype.log = function(){
        console.log(this.a)
    }

    a = new A()
    b = new A()
})()
a.log()
b.log()

// 企图在外部访问闭包内的函数A， 在A的原型对象上新增方法
// A.prototype.log2 = function(){
//     console.log(this.b)  // A is not defined
// }

// 1、通过实例的constructor， 它会指向自身的构造函数
// a.constructor.prototype.log2 = function(){
//     console.log(this.b)
// }

// 2、constructor.prototype可以将实例的构造器的原型对象暴露出来，
// 例如我们写一个插件后，别人得到了构造函数实例化的对象，但是这时别人想拓展一下对象，就可以使用实例.constructor.prototype来获取构造函数的原型
// 同时我们可以使用a.__proto__来代替a.constructor.prototype, 因为他们会指向同一片堆区的内存
// a.__proto__.log2 = function(){
//     console.log(this.b)
// }


b.log2()