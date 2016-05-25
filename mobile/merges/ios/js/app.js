angular.module('starter', [ 'ionic', 'ngCordova', 'starter.controllers', 'starter.services' ])

.run(function($ionicPlatform, $cordovaDevice) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

	});
})


.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|cdvfile):/);
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|cdvfile):|data:image\//);
	
	console.log('config>', ionic.Platform.platform());
	
	$stateProvider

	.state('tab', {
		url : '/tab',
		abstract : true,
		templateUrl : 'templates/tabs.html'
	})

	.state('tab.sync', {
		url : '/sync',
		views : {
			'tab-sync' : {
				templateUrl : 'templates/tab-sync.html',
				controller : 'SyncController'
			}
		}
	})

	.state('tab.view', {
		url : '/view',
		views : {
			'tab-view' : {
				templateUrl : 'templates/tab-view.html',
				controller : 'ViewController'
			}
		}
	})

	.state('tab.setting', {
		url : '/setting',
		views : {
			'tab-setting' : {
				templateUrl : 'templates/tab-setting.html',
				controller : 'SettingController'
			}
		}
	});

	$urlRouterProvider.otherwise('/tab/view');

});

angular.module('starter.controllers', []);
angular.module('starter.services', [])
