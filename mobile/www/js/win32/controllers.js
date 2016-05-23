angular.module('starter.controllers')

.controller('SyncController', function($scope) {
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
		platform : 'loadding...',
		model : 'loadding...'
	};

}).controller('ViewController', function($scope) {

}).controller('SettingController', function($scope) {

});
