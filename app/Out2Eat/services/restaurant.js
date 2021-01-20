var Out2Eat;
(function (Out2Eat) {
    var RestaurantService = (function () {
        function RestaurantService($q, LocateService) {
            this.$q = $q;
            this.LocateService = LocateService;
        }
        RestaurantService.prototype.listRestaurants = function (dist, veg) {
            var deferred = this.$q.defer();
            var meterRadius = Math.floor(dist * 1609.34);
            this.LocateService.currentLocation().then(function (position) {
                var myLat = (position.coords.latitude).toString();
                var myLon = (position.coords.longitude).toString();
                var radius = '&radius_filter=' + meterRadius.toString();
                var url = '';
                if (veg) {
                    var url = 'http://localhost:1234/search?term=food&ll=' + myLat + ',' + myLon + '&sort=1&limit=20' + radius + '&category_filter=vegetarian';
                }
                else {
                    var url = 'http://localhost:1234/search?term=food&ll=' + myLat + ',' + myLon + '&sort=0&limit=20' + radius;
                }
                var method = 'GET';
                $.ajax({
                    url: url,
                    type: method,
                }).then(function (data) {
                    return deferred.resolve(data.businesses);
                });
            });
            return deferred.promise;
        };
        RestaurantService.$inject = ["$q", "LocateService"];
        return RestaurantService;
    })();
    Out2Eat.RestaurantService = RestaurantService;
    angular
        .module("Out2Eat")
        .service("RestaurantService", RestaurantService);
})(Out2Eat || (Out2Eat = {}));
