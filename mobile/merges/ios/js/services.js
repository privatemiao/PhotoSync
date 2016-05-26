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
			var deferred = $q.defer();
			if (!url) {
				deferred.reject(null);
			}
			resolveLocalFileSystemURL(url, function(entry) {
				entry.file(function(file) {
					deferred.resolve({
						name : file.name,
						src : file.localURL,
						size : file.size,
						type : file.type,
						lastModified : file.lastModified
					});
				});
			});
			return deferred.promise;
		}
	};
})