angular.module('starter.controllers')

.controller('SyncController', function($ionicPlatform, $scope) {
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

}).controller('ViewController', function($scope) {

}).controller('FileController', function($scope, FileService) {
	FileService.getEntriesAtRoot().then(function(result) {
		$scope.files = result;
	}, function(error) {
		console.error(error);
	});
	$scope.getContent = function(path) {
		FileService.getEntries(path).then(function(result) {
			$scope.files = result;
			$scope.files.unshift({
				name : '[parent]'
			});
			FileService.getParentDirectory(path).then(function(result) {
				result.name = '[parent]';
				$scope.files[0] = result;
				console.log('Parent>', result);
			}, function(error) {
				console.error(error);
			});
		}, function(error) {
			console.error(error);
		});
	};
}).controller('SettingController', function($scope) {

});
