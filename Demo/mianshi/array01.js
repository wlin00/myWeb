(function arr_adjust() {
   function arr1(arr){//模块化封装，数组去重方法1：
       var newarr1=[]
       for(var i=0;i<arr.length;i++)
       {
           if(newarr1.indexOf(arr[i])===-1){
               newarr1.push(arr[i])//若新数组中不存在参数数组中对应的值，则加入新数组，若重复就取消
           }
       }
       return newarr1
   }

   // function arr2(arr){
   //     var newarr=[]
   //     for(var i=0;i<arr.length;i++){//双重循环，第一轮遍历数组，第二轮进行去重
   //        for (var j=i+1;j<arr.length;j++){
   //            if(arr[i]===arr[j]){
   //              i++;
   //              j=i;
   //              break
   //            }
   //        }
   //        //若第二轮检查都通过，则对应第一轮数据压入新数组
   //         newarr.push(arr[i])
   //     }
   //     return newarr;
   // }

   function arr3(arr){
       for(var i=0;i<arr.length;i++){//双重循环，第一轮遍历数组，第二轮splice去重
           for (var j=i+1;j<arr.length;j++){
               if(arr[i]===arr[j]){
                   arr.splice(j,1);
                   j--;
               }
           }
       }
       return arr;
   }


   //将模块中封装的方法、函数暴露，可以通过立即执行函数+window封装，或者通过返回值暴露结合引入后函数执行（麻烦）
    window.arr_adjust={arr1:arr1,
        // arr2:arr2,
        arr3:arr3}
})()