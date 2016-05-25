angular.module('starter.services').factory('PhotoService', function($q) {
	return {
		getLocalPhotos : function(photos) {
			var deferred = $q.defer();
			photos.length = 0;
			CamerRoll.getPhotos(function(photo) {
				if (photo) {
					photos.push(photo);
				} else {
					deferred.resolve();
				}
			});
			return deferred.promis;
		}
	};
})