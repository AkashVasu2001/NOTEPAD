var app = angular.module('sample', ['ngRoute', 'ngStorage']);
app.config(function($routeProvider) {
	$routeProvider
		.when('/noteTemp', {
			templateUrl: 'noteTemp.html',
			controller: 'MainCtrl'
		})
		.when('/newNote', {
			templateUrl: 'newNote.html',
			controller: 'MainCtrl'
		})
		.when('/newNote/edit/:id', {
			templateUrl: 'newNote.html',
			controller: 'MainCtrl'
		})
		.otherwise({
			redirectTo: '/noteTemp'
		});
});
app.factory('StorageService', function ($localStorage) {
	
	
	$localStorage = $localStorage.$default({
		things: []
	});
	var _getAll = function () {
		return $localStorage.things;
	};
    var _add = function (thing) {
        var updatedItem = this.findId(thing.id);
		if (updatedItem) {
			updatedItem.date = thing.date;
			if (thing.message === "") {
				
			 } else {
				updatedItem.message = thing.message;
			}
		} else if(thing.message===""){
			
		} else {
			thing.id = this.newId();
			$localStorage.things.push(thing);
			
		}
		
	}
	
    
	return {
		getAll: _getAll,
		add: _add,
		remove: function (thing) {
			
			$localStorage.things.splice($localStorage.things.indexOf(thing), 1);
		},
		findId: function(id) {
			for (var item in $localStorage.things) {
				if ($localStorage.things[item].id === id) {
	
					return $localStorage.things[item];
				}
				
			}
		},
		newId:  function() {
			if (this.NId) {
				
				NId++;
				return NId;
			} else {
				
				
				if (_.isEmpty($localStorage.things)) {
					$localStorage.things.push({
						id: 1, time: 'Default Message', message: '........................................#hello world..................................................     ......................................................................................................IMPORTANT INFORMATION : The note you create is stored in your cache memory. You could sign in but it does not upload your notes to cloud as of now .                                                                                                    cheers <3' });
				}
				
				
				var maxId = _.max($localStorage.things, function (thing) {
					 
					return thing.id;
				});
				
				NId = maxId.id + 1;
				return NId;
			}
		}
	};
});
app.controller('MainCtrl', function ($scope, $routeParams, StorageService, $location) {
    $scope.things = StorageService.getAll();
	$scope.today = new Date();
    if (!$routeParams.id) {
		$scope.newContent = { id: 0, time: new Date(), message: '' };
	} else {
		$scope.newContent = _.clone(StorageService.findId(parseInt($routeParams.id)));
	}
	
	$scope.add = function () {
		StorageService.add($scope.newContent);
		$location.path('/noteTemp');
		
	};
	$scope.remove = function (thing) {
        StorageService.remove(thing);
        $location.path('/noteTemp');
	};
	
});
