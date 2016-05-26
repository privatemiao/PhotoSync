angular.module('starter.controllers')

.controller('SyncController', function($ionicPlatform, $scope, PhotoService) {
	console.log('Photo Sync Controller.');

	$scope.variables = {
		appName : 'Photo Sync',
		images : [],
		photos : []
	};

	var service = {
		conver2Image : function(photos) {
			var index;
			for (index in photos) {
				(function(_index) {
					PhotoService.convert2Image(photos[_index]).then(function(image) {
						$scope.variables.photos.push(image);
						if (_index == photos.length - 1) {

							var i;
							for (i in $scope.variables.photos) {
								$scope.variables.images.unshift($scope.variables.photos[i]);
								if (i == 30) {
									break;
								}
							}

						}
					});
				})(index);
			}
		}
	};

	PhotoService.getLocalPhotos().then(function(photos) {
		$scope.variables.images = (function() {
			var imgs = [];
			for (var i = 0; i < 103; i++) {
				imgs.push({
					src : 'img/50x50.png'
				});
			}
			return imgs;
		})();
		service.conver2Image(photos);
	});

}).controller('ViewController', function($scope) {

}).controller('SettingController', function($scope) {

});
