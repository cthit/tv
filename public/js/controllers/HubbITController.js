app.controller('HubbITController', function($scope, $http) {
    // when landing on the page, get all todos and show them
    $http.get('/api/hubbit')
        .success(function(data) {
            $scope.stats = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});
