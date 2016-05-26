angular.module('starter.controllers').controller('SyncController', function($ionicPlatform, $scope, PhotoService) {
	$scope.variables = {
		appName : 'Photo Sync',
		images : [],
		photos : []
	};

	var service = {
		conver2Image : function(photos) {
			var index, reference = this;
			for (index in photos) {
				(function(_index) {
					PhotoService.convert2Image(photos[_index]).then(function(image) {
						$scope.variables.photos.push(image);

						$scope.variables.images[_index].src = image.src;
					});
				})(index);
			}
		}
	};

	PhotoService.getLocalPhotos().then(function(photos) {
		$scope.variables.images = (function() {
			var imgs = [];
			for (var i = 0; i < photos.length; i++) {
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
