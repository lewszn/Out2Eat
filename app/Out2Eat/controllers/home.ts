module Out2Eat {
	class HomeController {
		static $inject = ["LocateService", "RestaurantService", "$q"];
			constructor(private LocateService, private RestaurantService, private $q: ng.IQService) {
				
			}
			private buttonText: string = "Press Me for Adventure";
			public vegetarian: boolean = false;
			public rangeValue: number = 12;
			private foodList = [];
			private randomRestaurant = [];
			private loading: boolean = false;
			private myLon = '';
			private myLat = '';
			private foodLat = '';
			private foodLon = '';
			findFood(){
				this.LocateService.currentLocation().then(function(data){
					var myLat = data.coords.latitude
					var myLon = data.coords.longitude
					this.myLon = myLon.toString();
					this.myLat = myLat.toString();
				})
				this.loading = true;
				var that = this;
				var randomRestaurant = [];
				var foodList = [];
				this.RestaurantService.listRestaurants(this.rangeValue, this.vegetarian).then(function(data){
					for (var i = 0; i < data.length; i++) {
						var foodInfo = {
								name: '',
								rating_img_url: '',
								url: '',
								latitude: '',
								longitude: ''
							}
						foodInfo.name = data[i].name;
						foodInfo.rating_img_url = data[i].rating_img_url;
						foodInfo.url = data[i].url;
						foodInfo.latitude= data[i].location.coordinate.latitude;
						foodInfo.longitude = data[i].location.coordinate.longitude;
						foodList.push(foodInfo);
						
					}
					
					that.foodList = foodList;
					randomRestaurant.push(foodList[(Math.floor(Math.random() * that.foodList.length))]);
					that.randomRestaurant = randomRestaurant;
					that.foodLat = (randomRestaurant[0].latitude).toString();
					that.foodLon = (randomRestaurant[0].longitude).toString();
					that.loading = false;
					that.buttonText = "Try Again"
				})
				
			}
	}
	
	angular
		.module("Out2Eat")
		.controller("HomeController", HomeController);
}

