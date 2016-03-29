app.controller('VasttrafikController', function($scope, $http) {
    $http.get('/api/vasttrafik-chalmers')
        .success(function(data) {
            $scope.departures_chalmers = data.DepartureBoard.Departure;
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
    $http.get('/api/vasttrafik-tvargatan')
        .success(function(data) {
            $scope.departures_chalmers = data;
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
});