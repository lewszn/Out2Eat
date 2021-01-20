module Out2Eat {
	export class LocateService {
		static $inject = ['$q'];
		constructor(private $q: ng.IQService){
		}
		//Web API call to find location
		currentLocation(): ng.IPromise<{}>{
			var deferred = this.$q.defer();
			navigator.geolocation.getCurrentPosition(function(position){
				return deferred.resolve(position);
			})
			return deferred.promise;
		}
	}
	angular
		.module("Out2Eat")
		.service("LocateService", LocateService);	
}