angular.module('starter.controllers').controller('SyncController', function($ionicPlatform, $scope, CommonService, PhotoService, $timeout) {
	$scope.variables = {
		appName : 'Photo Sync',
		images : [],
		photos : []
	};

	var service = {
		conver2Image : function(photos) {

			var index = undefined, reference = this;

			var total = photos.length;
			var count = 2;
			var pages = parseInt(total / count);

			if (total % count != 0) {
				pages++;
			}

//			console.log('total>', total, " pages>", pages);
			(function _batchConvert(currentPage) {
//				console.log('currentPage>', currentPage);
				for (var i = 0; i < count; i++) {
					var photoIndex = currentPage * count + i;
					if (photoIndex > total - 1) {
						break;
					}
					(function(photoIndex, i) {
						// window.setTimeout(function() {
						// console.log(currentPage, photoIndex, i);
						// if (i == count - 1 && currentPage < pages - 1) {
						// _batchConvert(++currentPage);
						// }
						// }, 500);

						PhotoService.convert2Image(photos[photoIndex]).then(function(img) {
//							console.log(currentPage, photoIndex, i, img.src);
							$scope.variables.photos.push(img);
							$scope.variables.images[photoIndex].src = img.src;
							if (i == count - 1 && currentPage < pages - 1) {
								_batchConvert(++currentPage);
							}
						}, function(error) {

						});

					})(photoIndex, i);
				}
			})(0);

		},
		checkSystemEnv : function() {
			CommonService.checkCreateFolder(PhotoService.variables.thumbnailFolderName);
			CommonService.checkCreateFolder(PhotoService.variables.contactFolderName);
		}
	};

	service.checkSystemEnv();

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

}).controller('SettingController', function($scope, CommonService, $cordovaToast) {
	$scope.cleanThumbnail = function() {
		CommonService.cleanThumbnail().then(function() {
			CommonService.checkCreateFolder(CommonService.variables.thumbnailFolderName);
			$cordovaToast.showShortCenter('Clean success!');
		}, function(error) {
			console.error(error);
			$cordovaToast.showShortCenter('Clean fail!');
		});
	};
});