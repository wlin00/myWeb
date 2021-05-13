// /*
// Demo1: Binary-search
// */

const binarySearch = (arr, target) => {
  let low = 0,
      high = arr.length - 1
  while(low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (target === arr[mid]) {
      return mid
    } else if (target < arr[mid]) {
      high = mid - 1
    } else if (target > arr[mid]) {
      low = mid + 1
    } else {
      return -1
    }
  }    
}
const res = binarySearch([1,2,3,5,4], 3)

/**
 * Demo2: 数组扁平化
 */
let arr = ['1',[[2.2,[1.5, '3']],'4.8'],5.5]
//方法1 正则优化版
let solution3 =JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')
// 方法2: flat
let solution4 = arr.flat(Infinity)
// 方法3： reduce
let solution5 = arr =>{
    return arr.reduce((prev,curr) => {
        return prev.concat(Array.isArray(curr) ? solution5(curr) : curr )
    }, []) // 初始值为一个[]
}
//  方法4: 函数递归
let res6 = []
let solution6 = arr =>{
    for(let i=0;i<arr.length;i++){
        if (Array.isArray(arr[i])){
          solution6(arr[i])  
        } else {
          res6.push(arr[i])  
        }
    }
}
solution6(arr)

/*
  Demo3: 函数坷里化: 一种将多个参数的函数转换成一系列使用一个参数的函数的技术
  用于参数服用，提高适用性。
  柯里化函数是一个高阶组件，接受一个函数，返回一个函数
 */
const curry = (fn, ...arg) => {
    return (...rest) => {
      if ([...arg, ...rest].length < fn.length ) {
        // 参数未收集全
        return curry.call(this, fn, ...arg, ...rest)
      } else {
        return fn(...arg, ...rest)
      }
    }
}
function curryTest(a,b,c){
    return a+b+c
}
let curryRes = curry(curryTest) // 高阶函数返回一个fn
const rs = curryRes(1)(4)(5)

/**
 * Demo4: Promise上层封装，可不用写try-catch
 */
 const to = (promise) => {
   return promise.then((data) => [null, data]).catch((err) => [err])
 }
 const mock = () => {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error~')
    }, 1000)
   })
 }
 const mockSuccess = () => {
  return new Promise((resolve, reject) => {
   setTimeout(() => {
     resolve('success~')
   }, 1000)
  })
}
 // 实例
 const asyncTest = async () => {
   let err, success
   [err, success] = await to(mock()) // 使用to（promise）上层封装，来减少try-catch
   console.log('err:', err)
   console.log('success:', success)
 }


 /**
  * Demo5：继发/并发，调用装有Promise的数组
  */
const asyncFn = async (arr) => {
  for (const item of arr) {
    const res = await item()
  }
} // 由于是继发，效率很差，所以并发改造如下
const fixAsyncFn = (arr) => {
  const resArr = arr.map(async (item) => {
    const res = await item()
    return res
  })
  for (const resItem of resArr) {
     console.log(resItem)
  }
}


/**
 * Demo6：js休眠
*/
function sleep (wait) {
  return new Promise((resolve) => {
    setTimeout(resolve, wait)
  })
}

const log = async ()  => {
  for (let i = 0; i < 5; i++) {
    console.log(1)
    await sleep(1000)
  }
}
// log() // 程序sleep


/**
 * Demo7 - 多个async / await ，独立捕获错误, 通过asyncFn().catch(err => Promise.reject('xxx')), 外层+ try-catch
 */
 const catchDemo = async () => {
   try {
    const res1 = await mockSuccess().catch(err => Promise.reject('捕获错误1'))
    const res2 = await mock().catch(err => Promise.reject('捕获错误2'))

   } catch (err) {
     console.log(err)
   }
 }
//  catchDemo()


/** 
 * Demo8 - 四种继承：构造函数、原型链、组合、寄生组合
*/

function Parent (name) {
  this.name = name
  this.value = 'parent'
}

// 1 - 构造函数继承：缺点 - 每次子类创建实例会调用父类构造函数、 无法拿到父类的原型属性； 优点： 可以通过父类创建属性
function Child1 (name) {
  Parent.call(this, name)
  this.value = 'child'
}
const child1 = new Child1('cd1')

// 2 - 原型链继承， 缺点：子类无法通过父类创建属性； 优点： 可以共享同一条原型链上公共属性
function Child2 () {
  this.type = 'child'
}
Child2.prototype = new Parent()
const child2 = new Child2()

// 3 - 组合继承， 优点： 综合构造函数、原型链继承优势， 缺点：调用两次父类构造函数
function Child3 (name) {
  this.type = 'child'
  Parent.call(this, name)
}
Child3.prototype = new Parent()
const child3 = new Child3('test')

// 4 - 寄生组合继承 
function Child4 (name) {
  this.type = 'child'
  Parent.call(this, name)
}
// Child4.prototype = new Parent() // 寄生组合继承对此处改写
Child4.prototype = Object.create(Parent.prototype)
Child4.prototype.constructor = Child4
const child4 = new Child4('test4')


/**
 * Demo9 - InstanceOf
*/
const myInstanceOf = (a, b) => {
  let child = a.__proto__
  let parent = b.prototype
  while (child !== null) {
    if (child === parent) {
      return true
    } else {
      child = child.__proto__
    }
  }
  return false 
}
// console.log(myInstanceOf(child4, Child3))

/** 
 * Demo10- promiseAll
*/
const myPromiseAll = (promises) => {
  return new Promise((resolve, reject)=> {
    var resolvedCounter = 0
    var promiseNum = promises.length
    var resolvedValues = new Array(promiseNum)
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then((value)=> {
        resolvedCounter++
        resolvedValues[i] = value
        if (resolvedCounter == promiseNum) {
          console.log('res -- self', resolvedCounter, promises, resolvedValues)
          return resolve(resolvedValues)
        }
      }, (reason)=> {
        return reject(reason)
      })
    }
  })
}

  const myPromiseAllSelf = (promises) => {
    return new Promise((resolve, reject) => {
      let index = 0,
      resArr = [] // resArr = new Array(promises)

      const deal = (idx, res) => {
        index++;
        resArr[idx] = res;
        if (index === promises.length) {
          return resolve(resArr)
        }
      }

      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then((res) => {
          deal(i, res) // 遍历promiseArr，收集其执行结果，等到全部收集完毕统一resolve
        }, (err) => {
          return reject(err) // 若失败则返回失败的那个promise终止promise
        })
      }
    })
  }

  const promise1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve('prrrr1')
      }, 1000)
    })

  const promise2 =  new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('err-prrrr2')
      }, 200)
    })

  const promise3 = new Promise((resolve) => {
      setTimeout(() => {
        resolve('prrrr3')
      }, 3000)
    })
  // myPromiseAllSelf([promise1, promise2, promise3]).then((res) => {
  //   console.log('rrr - all' , res)
  // }).catch((err) => console.log('err', err))


  /** 
   * Demo11 - promiseRace  拿个promise先执行完，回调哪个的结果
  */
  const myPromiseRace = (promises) => {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then((value)=> {
          return resolve(value)
        }, (reason) => {
          return reject(reason)
        })
      }
    })
  }
  // myPromiseRace([promise1, promise2, promise3]).then((res) => {
  //   console.log('first' , res)
  // }).catch((err) => console.log('err', err))

  /**
   * Demo 12 - stair : count solutions of input stairs
   */

   // normal
  const stair = (n) =>  {
    if ([1, 2].indexOf(n) >= 0) {
      return n
    }
    return stair(n - 1) + stair(n - 2)
  }

  // dp
  const stairDp = (n) =>  {
    if ([1, 2].indexOf(n) >= 0) {
      return n
    }
    let dp = []
    dp[0] = 1
    dp[1] = 2
    for (let i = 2; i < n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n - 1]
  }
  // console.time('normal')
  // stair(100)
  // console.timeEnd('normal')

  // console.time('dp')
  // stairDp(999)
  // console.timeEnd('dp')

  /**
   * Demo 13 - sum of two num
  */
  const sumOfTwo = (arr, target) => {
    let map = {}
    arr.forEach((item, index) => {
      if (map[item] === undefined) {
        map[target - item] = index // 若目标在map中没找到， 存想要值 - 序号的映射
      } else {
        return [map[item] , index] // 返回两数下标list
      }
    })
  }

  /**
   * Demo 14 - sum of three num
   * input : arr of num
   * output : index of nums (sum = 0)
   */

  const sumOfThree = (arr)=> {
    const arrCopy = JSON.parse(JSON.stringify(arr))
    arrCopy.sort((a, b) => a - b)

    let res = []

    for (let i = 0; i < arr.length - 2; i++) {
      if (i >= 1 && arr[i] === arr[i - 1]) {
        continue // 对第一位i去重
      }
      let j = i + 1,
          k = arr.length - 1
      while (j < k) {
        let sum = arr[i] + arr[j] + arr[k] // 获取三数之和
        if (sum === 0) {
          res.push(i, j, k)
          j++
          // 对第二位j去重
          while (arr[j] === arr[j - 1]) {
            j++
          }
        } else if (sum < 0) {
          j++
        } else {
          k--
        }
      }
    }
    return res
  }
  // console.log('sum', sumOfThree([1, 2, 4, -3]))

  /** 
   * Demo15 千分位分隔
  */
 function formatThousands() {
  if (!target || target.toString().includes('%')) {
    return target
  }
  // 接收string / number类型的参数进行千分位转换
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  // 正则表达式 \d{1,3}(?=(\d{3})+$)  表示前面有1~3个数字，后面的至少由一组3个数字结尾
  // ?=表示正向引用，可以作为匹配的条件，但匹配到的内容不获取，并且作为下一次查询的开始
  // $& 表示与正则表达式相匹配的内容
  const arr = target && target.toString().split('.')
  // 若存在小数点，将小数点前面的数字添加分隔符
  if (arr && arr.length) {
    arr[0] = arr[0].replace(reg, '$&,')
  }
  return arr && arr.join('.')
}

/** 
 * Demo16 深拷贝
*/
function deepClone (obj){
  let result
  if (getType(obj) === 'Object') {
    result = {}
    for (const key in obj) {
      if (getType(obj[key]) === 'Object' || getType(obj[key]) === 'Array') {
        result[key] = deepClone(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  } else if (Object.prototype.toString.call(obj).slice(8, -1) === 'Array') {
    result = []
    for (const key of obj) {
      if (getType(obj[key]) === 'Object' || getType(obj[key]) === 'Array') {
        result.push(deepClone(key))
      } else {
        result.push(deepClone(key))
      }
    }
  } else {
    return obj
  }
  return result
}
const getType = (o) => Object.prototype.toString.call(o).slice(8, -1)

// solution2
function cloneDeep(target) {
  let res
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      // arr
      res = []
      for (let item of target) {
       res.push(cloneDeep(item))
      }
    } else if (target === null || target.constructor === RegExp) {
      res = target
    } else {
      // object
      res = {}
      for (let s of Object.keys(target)) {
        res[s] = cloneDeep(target[s])
      }
    }
  } else {
    res = target
  }
  return res
}
const obj1 = {name:'test', inner: {key:[{innerItem: 'aaa'}]}}

/** 
 * Demo17 - 盛水最多的容器
*/
const maxArea = (arr) => {
  let begin = 0,
      end = arr.length - 1,
      max = 0,
      squre = 0
  while (end > begin) {
    if (arr[begin] > arr[end]) {
      squre = arr[end] * (end - begin)
      end--
    } else {
      squre = arr[begin] * (end - begin)
      begin++
    }
    max = Math.max(max, squre)
  }
  return max
}
// console.log('max', maxArea([1,8,6,2,5,4,8,3,7]))


/** 
 * Demo18 - easy - promise
*/

// 16 -1 ,未实现链式调用的promise -> 极简态 + 延时机制
class myPromise {
  value = null
  callbacks = []
  state = 'PENDING'
  
  // 构造器
  constructor(fn) {
    fn(this._resolve.bind(this))
  }

  // then ：判断当前状态，根据是否已经resolve，
  // 选择1：将onFulfilled回调存入callbacks； 选择2: 直接执行回调
  // then 实际上做的事是： 想要将onFulfilled回调进行注册，类似观察者模式
  then(onFulfilled) {
    if (this.state === 'PENDING') {
      this.callbacks.push(onFulfilled)
    } else {
      onFulfilled(this.value)
    }
    return this // then返回一个新的promise， 这里暂时先写成返回本身， 后续链式调用功能补充
  }

  // resolve方法， 遍历存放onFulfilled回调的list执行
  _resolve(value) {
    this.state = 'Fulfilled'
    this.value = value
    this.callbacks.forEach(fn => fn(value))
  }
}
// let promiseTest1 = new myPromise((resolve) => {
//   setTimeout(() => {
//     resolve('promse1 - test')
//   }, 3000)
// })
// .then((e) => console.log('then111', e))
// .then((e) => console.log('then222', e))


/** 
 * Demo19 - longgest palindromes string - dp, 
*/
const palindromesString = (str) => {
  if (!str) return
  const dp = []
  for (let n = 0; n < str.length; n++) {
    dp[n] = [] // build two dimension dp
  }
  let max = 0, // max length
  res = ''

  for (let k = 0 ; k < str.length; k++) {
    for (let i = 0; i < str.length - k; i++) {
      let j = i + k // get all kinds of co-ordinates

      if (k === 0) {
        // case D-value equal to 0
        dp[i][j] = true

      } else if (k<= 2) {
        // case D-value is included of [1, 2]
        dp[i][j] = str[i] === str[j]        
      } else {
        // other case
        dp[i][j] = str[i] === str[j] && dp[i+1][j-1]
      }

      // judge & update max
      if (dp[i][j] && k > max) {
        max = k
        res = str.slice(i, j+1)
      }

    }
  }
  return res
}


/** 
 * Demo20 - promise - complete
*/
class selfPromise {
  callbacks = []
  state = 'PENDING'
  value = null
  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this))
  }
  _reject(err) {
    this.value = err
    this.state = 'REJECT'
    this.callbacks.forEach((callback) => this._handle(callback))
  }
  _resolve(val) {
    // 判断当前传入的参数是不是一个promise， 若是则处理需要链式调用的场景
    if (val && ['function', 'object'].indexOf(typeof val) >= 0) {
      const then = val.then
      if (typeof then === 'function') {
        // 处理返回的Promise， 调用then方法，将上一个Promise的‘控制权’给到下一个
        then.call(val, this._resolve.bind(this), this._reject.bind(this))
        return
      }
    }
    this.value = val
    this.state = 'RESOLVE'
    this.callbacks.forEach((callback) => this._handle(callback))
  }
  then(onFulfilled, onRejected) {
    return new selfPromise((resolve, reject) => {
      this._handle({
        resolve: resolve,
        reject: reject,
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
      })
    })
  }
  catch(err) {
    this.then(null, err) // 重写catch方法
  }
  _handle(callback) {
    // 若当前状态未改变，则只注册事件（观察者模式）
    if (this.state === 'PENDING') {
      this.callbacks.push(callback)
      return
    }

    const fn = this.state === 'RESOLVE' ? callback.onFulfilled : callback.onRejected
    const run = this.state === 'RESOLVE' ? callback.resolve : callback.reject
    // 若当前未传入回调用方法, 则直接处理state中的状态
    if (!fn) {
      run(this.value)
      return
    }

    // 若传入回调，处理回调
    let res
    try {
      // 若此处是由return的新promise调用，则fn是等于调用了上一个promise的reolve
      // 调用后，上一个promise拿到最新的值，继续去遍历其callbacks，以此实现链式调用。
      res = fn(this.value) 
    } catch(error) {
      res = error
    } finally {
      run(res)
    }
  }
}

const promise11 = new selfPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('prrrr1')
  }, 1000)
})

const promise22 =  new selfPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('prrrr2')
  }, 3000)
})

promise11.then((res1) => {
  console.log('then1:',res1) 
  return promise22
}).then((res2) => {
  console.log('then2', res2)
}).catch((err) => {
  console.log('err', err)
})

/** 
 * Demo21 call、apply、bind
 * */ 

 Function.prototype.myCall = (context, ...arg) => {
   context = context || window
   context.fn = this
   let res = eval('context.fn(...arg)')
   delete context.fn
   return res
 }

 Function.prototype.myCall = (context, arg) => {
  context = context || window
  context.fn = this
  let res = eval('context.fn(...arg)')
  delete context.fn
  return res
}

Function.prototype.myBind = (context, ...arg) => {
  context = context || window
  context.fn = this
  return (...rest) => {
    context.fn(...arg, ...rest)
  }
}

/** 
 * Demo22 最长无重复子序列
* */ 
const getStrFn = (s) => {
  let start = 0, max = 0;
  const set = new Set();

  for (let i = 0; i < s.length; i++) {
    while(set.has(s[i])){
      set.delete(s[start++])
    }
    set.add(s[i])
    max = Math.max(max, set.size)
  }
return max
}