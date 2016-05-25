angular.module('starter.controllers')

.controller('SyncController', function($ionicPlatform, $scope, PhotoService) {
	console.log('Photo Sync Controller.');

	$scope.variables = {
		appName : 'Photo Sync',
		images : []
	};

	var service = {
		conver2Image : function(photos) {
			console.log('conver2Image>');
			var index;
			for (index in photos) {
				PhotoService.convert2Image(photos[index]).then(function(image){
					$scope.variables.images.push(image);
				});
			}
		}
	};

	PhotoService.getLocalPhotos().then(function(photos) {
		console.log('getLocalPhotos>', photos);
		service.conver2Image(photos);
	});

}).controller('ViewController', function($scope) {

}).controller('SettingController', function($scope) {

});
