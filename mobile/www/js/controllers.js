angular.module('starter.controllers', [])

.controller('SyncController', function($scope) {
	$scope.variables = {
		images : (function() {
			var imgs = [];
			for (var i = 0; i < 103; i++) {
				imgs.push({
					src : 'img/50x50.png'
				});
			}
			return imgs;
		})()
	};
	
	console.log($scope.variables);
});
