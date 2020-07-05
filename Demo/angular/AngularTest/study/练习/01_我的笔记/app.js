angular.module('noteApp',[])
.controller('NoteController',function ($scope) {
//    笔记本三功能：保存、读取、删除
    $scope.message=''
    $scope.getCount=function () {
        if($scope.message.length>100){$scope.message.slice(0,100)}
        return 100-$scope.message.length
    }
    $scope.save=function () {
        alert('note is saved')
        sessionStorage.setItem('itemName',JSON.stringify($scope.message))  //sessionStorage的使用，参数1：保存的参数名 ； 参数2：JSON字符串
        $scope.message=''

    }
    $scope.read=function () {
        $scope.message=JSON.parse(sessionStorage.getItem('itemName')||'[]')  //处理了读取空数据的情况
    }
    $scope.delete=function () {
        $scope.message=''
    }
})