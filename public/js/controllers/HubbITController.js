app.controller('HubbITController', function($scope, $http) {
    // get hubbit api 
    $http.get('/api/hubbit')
        .success(function(data) {
            $scope.stats = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});
