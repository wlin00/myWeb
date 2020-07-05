angular.module('todoApp',[])
 .controller('TodoController',function ($scope) { //注意angular使用依赖注入必须声明依赖注入的对象
 //    业务逻辑 建立作用域下的属性: todo列表  定义方法add和delete

     $scope.todos=[
           {todo:'吃饭',isChecked:false}
          ,{todo:'睡觉',isChecked:false}
          ,{todo:'学习',isChecked:false}
     ]

 //   定义add方法，增加一个todo实例，并且在todos中使用unshift、push等方法来加入
     $scope.add=function () {
          //先进行判定，是否新加入的newTodo为' ' 若是的话则不能继续加入
         if(!$scope.newTodo){alert('输入内容不能为空');return;}

         var todo={
             todo:$scope.newTodo,
             isChecked:false
         }
         $scope.todos.unshift(todo)
         $scope.newTodo=''

     }

     //定义delete方法：
         $scope.delete=function () {
            // 逻辑：首先暂存旧数组于变量中，然后将旧数组清除
            var oldTodo=$scope.todos
            $scope.todos=[]

         // 清空todos用与存放筛选后的数组

         // 遍历旧数组，将符合条件的值筛选（ischecked：false)
            oldTodo.forEach(function (item,index) {
                if(!item.isChecked){
                    $scope.todos.push(item)
                }
            //  补充 数组对象foreach、jQ对象each、jQ对象map方法异同
            //    参数的位置，只有jQ的each将value放callback中的第二位，其余放value于callback的第一位，且jQ的map会请求新内存，返回新数组

            })
         }




 })