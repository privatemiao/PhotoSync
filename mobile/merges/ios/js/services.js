angular.module('starter.services').factory('PhotoService', function($q) {
	return {
		getLocalPhotos : function() {
			var photos = [];
			var deferred = $q.defer();
			var reference = this;
			CameraRoll.getPhotos(function(photo) {
				if (photo) {
					photos.push(photo);
				} else {
					deferred.resolve(photos);
				}
			});

			return deferred.promise;
		},
		convert2Image : function(url) {
			var reference = this;
			var deferred = $q.defer();
			if (!url) {
				deferred.reject(null);
			}
			resolveLocalFileSystemURL(url, function(entry) {
				entry.file(function(file) {
					/*
					 * end: 233551 lastModified: 1464158443000 lastModifiedDate:
					 * 1464158443000 localURL:
					 * "cdvfile://localhost/assets-library/asset/asset.JPG?id=5E4621C5-987B-4DEF-AA2C-CDA9EBD5E610&ext=JPG"
					 * name: "IMG_0051.JPG" size: 233551 start: 0 type:
					 * "image/jpeg"
					 */
					var image = {};
					image = angular.copy(file);
					// image.src = file.localURL;
					image.id = file.localURL.substring(file.localURL.indexOf('id=') + 3, file.localURL.indexOf('&ext'));

					if (image.type.startsWith('image')){
						var thumbnail = image.id + '.' + image.name.split('.').pop();
						reference.checkThumbnailExist(thumbnail).then(function(exist) {
							if (exist) {
								image.src = cordova.file.dataDirectory + thumbnail;
								deferred.resolve(image);
							} else {
								reference.makeThumbnail(file.localURL).then(function(thumbnailPath) {
									reference.persistThumbnail({
										url : thumbnailPath,
										id : image.id
									}).then(function(movedThumbnailPath) {
										image.src = movedThumbnailPath;
										console.log(image);
										deferred.resolve(image);
									});
								}, function(error) {
									deferred.reject(error);
								});
							}
						});
					}else{
						image.src = 'img/video-placeholder.jpg';
						deferred.resolve(image);
					}
					

				});
			});
			return deferred.promise;
		},
		makeThumbnail : function(path) {
			var deferred = $q.defer();
			ImageResizer.resize({
				uri : path,
				folderName : cordova.file.applicationStorageDirectory,
				quality : 50,
				width : 100,
				height : 80
			}, function(thumbnailPath) {
				deferred.resolve(thumbnailPath);
			}, function(error) {
				console.error(error);
				deferred.reject(error);
			});
			return deferred.promise;
		},
		persistThumbnail : function(file) {
			var deferred = $q.defer();
			window.resolveLocalFileSystemURL(file.url, function(fileEntry) {
				var fileExt = "." + file.url.split('.').pop();
				var newFileName = file.id + fileExt;
				window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
					fileEntry.moveTo(dirEntry, newFileName, function() {
						deferred.resolve(cordova.file.dataDirectory + '/' + newFileName);
					}, function(error) {
						console.error('1', error);
						deferred.reject(error);
					});
				}, function(error) {
					console.error('2', error);
					deferred.reject(error);
				});
			}, function(error) {
				console.error('3', error);
				deferred.reject(error);
			});
			return deferred.promise;
		},
		checkThumbnailExist : function(fileIdWithExt) {
			var deferred = $q.defer();
			
			requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		        fileSystem.root.getFile(cordova.file.dataDirectory + fileIdWithExt, { create: false }, function(){
		        	console.log('exist')
		        	deferred.resolve(true);
		        }, function(){
		        	console.log('not exist')
		        	deferred.resolve(false);
		        });
		    }, function(evt){
		    	resolve.reject(evt.target.error)
		    });
			
			return deferred.promise;
		}
	};
})
// assets-library://asset/asset.JPG?id=ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED&ext=JPG
// cdvfile://localhost/assets-library/asset/asset.JPG?id=ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED&ext=JPG
// <img
// data-ng-src="file:///Users/mel/Library/Developer/CoreSimulator/Devices/28D1EB4D-F4A7-42E9-87D6-5A2CD340809D/data/Containers/Data/Application/E5BE2452-DB6F-40A6-B2CD-DC25ED4AADF6/Library/NoCloud//106E99A1-4F6A-45A2-B320-B0AD4A8E8473.jpg"
// alt="" width="100%" height="90px"
// src="file:///Users/mel/Library/Developer/CoreSimulator/Devices/28D1EB4D-F4A7-42E9-87D6-5A2CD340809D/data/Containers/Data/Application/E5BE2452-DB6F-40A6-B2CD-DC25ED4AADF6/Library/NoCloud//106E99A1-4F6A-45A2-B320-B0AD4A8E8473.jpg">
