app.controller('VasttrafikController', function($scope, $http) {
    $http.get('/api/vasttrafik')
        .success(function(data) {
            $scope.departures = data;
        })
        .error(function(data) {
            console.log('Error:' + data);
        });
});