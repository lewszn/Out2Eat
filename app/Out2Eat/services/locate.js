var Out2Eat;
(function (Out2Eat) {
    var LocateService = (function () {
        function LocateService($q) {
            this.$q = $q;
        }
        LocateService.prototype.currentLocation = function () {
            var deferred = this.$q.defer();
            navigator.geolocation.getCurrentPosition(function (position) {
                return deferred.resolve(position);
            });
            return deferred.promise;
        };
        LocateService.$inject = ['$q'];
        return LocateService;
    })();
    Out2Eat.LocateService = LocateService;
    angular
        .module("Out2Eat")
        .service("LocateService", LocateService);
})(Out2Eat || (Out2Eat = {}));
