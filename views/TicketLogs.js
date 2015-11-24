var myApp = angular.module('myApp', []);

myApp.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);0

/*myApp.filter('sumByKey', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }
        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }
        return sum;
    };
})

myApp.filter('customSum', function () {
    return function (listOfProducts, key) {
        //  Count how many items are in this order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            //            alert(product + "." + key);
            total += eval("product." + key);
        });
        return total;
    }
});

myApp.filter('countItemsInOrder', function () {
    return function (listOfProducts) {
        //  Count how many items are in this order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            total += product.Quantity;
        });
        return total;
    }
});

myApp.filter('orderTotal', function () {
    return function (listOfProducts) {
        //  Calculate the total value of a particular Order
        var total = 0;
        angular.forEach(listOfProducts, function (product) {
            total += product.Quantity * product.UnitPrice;
        });
        return total;
    }
});*/

myApp.controller('TicketLogs',
		function ($scope, $http) {

	$scope.listOfLogs = null;

	$scope.selectedLog = null;
	
	$scope.resultPut = null
	/* $http.get('http://localhost:3000/api/tickets',{"msg":"hi"}).success(function(data){
    	 console.log(data);
    });*/


	$http.get('http://localhost:3000/api/tickets', {headers:{ 'Content-Type': 'application/json'}})
	.success(function (data) {
		$scope.listOfLogs = data;
		if ($scope.listOfLogs.length > 0) {
			$scope.selectedLog = $scope.listOfLogs[0]._id;
			$scope.loadLogs();
		}
	})
	.error(function (data, status, headers, config) {
		$scope.errorMessage = "Couldn't load the list of logs, error # " + status;
	});


	$scope.isSelected = function(tkt) {
		if(tkt._id == $scope.selectedLog)
			return $scope.selectedLog;
	};

	$scope.checkStatus = function(status) {
		if(status.status == "Closed"){
			return true;
		}else
			return false;
	};

	$scope.selectLog = function (val) {
		$scope.selectedLog = val._id;
		$scope.loadLogs();
	}
	
	$scope.gotoUpdate = function(val){
		
		$http.put("http://localhost:3000/api/tickets/"+ val._id,val).success(function(result) {
		      console.log(result);
		      alert("Log updated Successfully");
		      $scope.resultPut = result;
		  }).error(function() {
		      console.log("error");
		  });
	}

	$scope.loadLogs = function () {
		$scope.listOftickets = null;


		$http.get('http://localhost:3000/api/tickets')
		.success(function (data) {
			$scope.listOftickets = data;
		})
		.error(function (data, status, headers, config) {
			$scope.errorMessage = "Couldn't load the list of tickets, error # " + status;
		});
	}
});
