angular.module('starter.controllers').controller('SyncController', function($ionicPlatform, $scope, CommonService, PhotoService, $timeout) {
	$scope.variables = {
		appName : 'Photo Sync',
		images : [],
		photos : []
	};

	var service = {
		conver2Image : function(photos) {
			var index, reference = this;

			// for (index in photos) {
			// (function(_index) {
			// PhotoService.convert2Image(photos[_index]).then(function(image)
			// {
			// $scope.variables.photos.push(image);
			//
			// $scope.variables.images[_index].src = image.src;
			// });
			// })(index);
			// }

			// (function _convertOneByOne(index) {
			// PhotoService.convert2Image(photos[index]).then(function(image)
			// {
			// $scope.variables.photos.push(image);
			// $scope.variables.images[index].src = image.src;
			// index++;
			// if (index < photos.length) {
			// _convertOneByOne(index);
			// }
			// });
			// })(0);

			var total = photos.length, count = 10, pages = parseInt(total / count);
			if (total % 10 != 0) {
				pages++;
			}

			(function _convertBatch(currentPage) {
				var photoIndexArray = [];
				for (var i = 0; i < count; i ++){
					var photoIndex = currentPage * count + i;
					if (photoIndex < total){
						photoIndexArray.push(photoIndex);
					}
				}
				
				(function(_photoIndexArray){
					for (var i = 0; i < _photoIndexArray.length; i ++){
						(function(indexOfPage){
							PhotoService.convert2Image(photos[_photoIndexArray[indexOfPage]]).then(function(image){
								$scope.variables.images[_photoIndexArray[indexOfPage]].src = image.src;
								if (i == _photoIndexArray.length - 1){
									currentPage ++;
									if (currentPage < pages){
										_convertBatch(currentPage);
									}
								}
							});
						})(i);
					}
				})(photoIndexArray);
				
//				currentPage ++;
//				if (currentPage < pages){
//					_convertBatch(currentPage);
//				}
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
