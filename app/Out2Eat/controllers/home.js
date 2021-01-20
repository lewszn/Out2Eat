var Out2Eat;
(function (Out2Eat) {
    var HomeController = (function () {
        function HomeController(LocateService, RestaurantService, $q) {
            this.LocateService = LocateService;
            this.RestaurantService = RestaurantService;
            this.$q = $q;
            this.buttonText = "Press Me for Adventure";
            this.vegetarian = false;
            this.rangeValue = 12;
            this.foodList = [];
            this.randomRestaurant = [];
            this.loading = false;
            this.myLon = '';
            this.myLat = '';
            this.foodLat = '';
            this.foodLon = '';
        }
        HomeController.prototype.findFood = function () {
            this.LocateService.currentLocation().then(function (data) {
                var myLat = data.coords.latitude;
                var myLon = data.coords.longitude;
                this.myLon = myLon.toString();
                this.myLat = myLat.toString();
            });
            this.loading = true;
            var that = this;
            var randomRestaurant = [];
            var foodList = [];
            this.RestaurantService.listRestaurants(this.rangeValue, this.vegetarian).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var foodInfo = {
                        name: '',
                        rating_img_url: '',
                        url: '',
                        latitude: '',
                        longitude: ''
                    };
                    foodInfo.name = data[i].name;
                    foodInfo.rating_img_url = data[i].rating_img_url;
                    foodInfo.url = data[i].url;
                    foodInfo.latitude = data[i].location.coordinate.latitude;
                    foodInfo.longitude = data[i].location.coordinate.longitude;
                    foodList.push(foodInfo);
                }
                that.foodList = foodList;
                randomRestaurant.push(foodList[(Math.floor(Math.random() * that.foodList.length))]);
                that.randomRestaurant = randomRestaurant;
                that.foodLat = (randomRestaurant[0].latitude).toString();
                that.foodLon = (randomRestaurant[0].longitude).toString();
                that.loading = false;
                that.buttonText = "Try Again";
            });
        };
        HomeController.$inject = ["LocateService", "RestaurantService", "$q"];
        return HomeController;
    })();
    angular
        .module("Out2Eat")
        .controller("HomeController", HomeController);
})(Out2Eat || (Out2Eat = {}));
