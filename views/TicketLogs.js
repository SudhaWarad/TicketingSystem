var myApp = angular.module('myApp', []);

myApp.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);0


myApp.controller('TicketLogs',
		function ($scope, $http) {

	$scope.listOfLogs = null;

	$scope.selectedLog = null;
	
	$scope.resultPut = null
	

	$http.get('/api/tickets', {headers:{ 'Content-Type': 'application/json'}})
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
		
		$http.put("/api/tickets/"+ val._id,val).success(function(result) {
		      console.log(result);
		      alert("Log updated Successfully");
		      $scope.resultPut = result;
		  }).error(function() {
		      console.log("error");
		  });
	}

	$scope.loadLogs = function () {
		$scope.listOftickets = null;


		$http.get('/api/tickets')
		.success(function (data) {
			$scope.listOftickets = data;
		})
		.error(function (data, status, headers, config) {
			$scope.errorMessage = "Couldn't load the list of tickets, error # " + status;
		});
	}
});
