angular.module('starter.controllers')

.controller('SyncController', function($ionicPlatform, $scope, PhotoService) {
	console.log('Photo Sync Controller.');

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

	var service = {
		conver2Image : function(photos) {
			var begin = new Date().getTime();
			var index;
			for (index in photos) {
				(function(_index){
					PhotoService.convert2Image(photos[_index]).then(function(image){
						$scope.variables.photos.push(image);
						if (_index == photos.length - 1){
							alert('found ' + photos.length + ' photos, cost ' + (new Date().getTime() - begin) + ' milliseconds.');
						}
					});
				})(index);
			}
		}
	};

	PhotoService.getLocalPhotos().then(function(photos) {
		service.conver2Image(photos);
	});

}).controller('ViewController', function($scope) {

}).controller('SettingController', function($scope) {

});
