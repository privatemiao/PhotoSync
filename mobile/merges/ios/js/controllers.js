angular.module('starter.controllers')

.controller('SyncController', function($ionicPlatform, $scope, PhotoService) {
	$scope.variables = {
		appName : 'Photo Sync',
		images : (function() {
			var imgs = [];
			for (var i = 0; i < 103; i++) {
				imgs.push({
					src : 'img/50x50.png'
				});
			}
			return imgs;
		})(),
		photos : []
	};

	PhotoService.getLocalPhotos($scope.variables.photos).then(function() {
		console.log($scope.variables.photos);
	});

}).controller('ViewController', function($scope) {

}).controller('SettingController', function($scope) {

});
