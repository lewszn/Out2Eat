
module Out2Eat{
	export class RestaurantService{
		static $inject =["$q", "LocateService"];
		constructor(private $q: ng.IQService, private LocateService){
			
		}
		//Call to Yelp API for restaurant data based on location
		listRestaurants(dist?: number, veg?: boolean): ng.IPromise<{}>{
			var deferred = this.$q.defer();
			var meterRadius: number = Math.floor(dist * 1609.34)
			this.LocateService.currentLocation().then(function(position){
				var myLat: string = (position.coords.latitude).toString();
				var myLon: string = (position.coords.longitude).toString();
				var radius: string = '&radius_filter=' + meterRadius.toString();
				var url: string = '';
				if (veg){
					var url = 'http://localhost:1234/search?term=food&ll=' + myLat + ',' + myLon  + '&sort=1&limit=20' + radius + '&category_filter=vegetarian';
				}else{
					var url: string = 'http://localhost:1234/search?term=food&ll=' + myLat + ',' + myLon  +'&sort=0&limit=20' + radius;
				}
				var method: string = 'GET'	
				$.ajax({
						url: url,
						type: method,
					}).then(function(data){
						return deferred.resolve(data.businesses);
					})		
			})
			return deferred.promise;
		}
	}
	angular
		.module("Out2Eat")
		.service("RestaurantService", RestaurantService);
}