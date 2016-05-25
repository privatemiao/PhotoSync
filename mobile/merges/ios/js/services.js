angular.module('starter.services').factory('PhotoService', function($q) {
	return {
		getLocalPhotos : function() {
			var photos = [];
			var deferred = $q.defer();
			var reference = this;
			CameraRoll.getPhotos(function(photo){
				if (photo){
					photos.push(photo);
				}else{
					deferred.resolve(photos);
				}
			});
			
			return deferred.promise;
		},
		convert2Image : function(url){
			var deferred = $q.defer();
			if (!url){
				deferred.reject(null);
			}
			var image = {};
			resolveLocalFileSystemURL(url, function(entry) {
				entry.file(function(file){
					image.src = file.localURL;
					deferred.resolve(image);
				});
			});
			return deferred.promise;
		}
	};
})