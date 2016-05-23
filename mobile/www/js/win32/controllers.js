angular.module('starter.controllers')

.controller('SyncController', function($ionicPlatform, $scope) {
	$ionicPlatform.ready(function(){ //TODO test use or not use ionicPlatform.ready for IOS
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
				platform : ionic.Platform.platform()
			};

});
}).controller('ViewController', function($scope) {

}).controller('SettingController', function($scope) {

});
