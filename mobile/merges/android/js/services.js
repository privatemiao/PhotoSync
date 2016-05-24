angular.module('starter.services').factory('FileService', function($q) {
	return {
		getParentDirectory : function(path) {
			var deferred = $q.defer();
			window.resolveLocalFileSystemURL(path, function(entity) {
				entity.getParent(function(result) {
					deferred.resolve(result);
				}, function(error) {
					deferred.reject(error);
				})
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		},
		getEntriesAtRoot : function() {
			var deferred = $q.defer();
			resolveLocalFileSystemURL('file:///', function(entry) {
				var directoryReader = entry.createReader();
				directoryReader.readEntries(function(result) {
					deferred.resolve(result);
				}, function(error) {
					deferred.reject(error);
				});
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		},
		getEntries : function(path) {
			var deferred = $q.defer();
			resolveLocalFileSystemURL(path, function(entry) {
				var directoryReader = entry.createReader();
				directoryReader.readEntries(function(result) {
					deferred.resolve(result);
				}, function(error) {
					deferred.reject(error);
				});
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}

	};
});