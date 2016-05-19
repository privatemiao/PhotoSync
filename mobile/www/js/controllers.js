angular.module('starter.controllers', [])

.controller('SyncController', function($ionicPlatform, $scope, $ionicLoading) {
	$ionicPlatform.ready(function() {
		$scope.variables = {
			images : (function() {
				var imgs = [];
				for (var i = 0; i < 103; i++) {
					imgs.push({
						src : 'img/50x50.png'
					});
				}
				return imgs;
			})(),
			platform : device.platform,
			model : device.model
		};

		console.log($scope.variables);
	});
});
