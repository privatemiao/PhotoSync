angular.module('starter.controllers')

.controller('SyncController',
		function($ionicPlatform, $scope, $ionicLoading, $ionicPopup) {
			// $ionicPlatform.ready(function() {
			// $scope.variables = {
			// images : (function() {
			// var imgs = [];
			// for (var i = 0; i < 103; i++) {
			// imgs.push({
			// src : 'img/50x50.png'
			// });
			// }
			// return imgs;
			// })(),
			// platform : device.platform,
			// model : device.model
			// };
			//
			// console.log($scope.variables);
			// });

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

			$ionicPlatform.ready(function() {
				$scope.variables.platform = window.variables.platform;
				$scope.variables.model = window.variables.model;
			});

		});
