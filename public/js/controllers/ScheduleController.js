app.controller('ScheduleController', function($scope, $http) {
    // get todays schedule as json
    // TODAYS: https://se.timeedit.net/web/chalmers/db1/public/ri15YXQ3041Z57Qv8X034156y8Y470155Y97Y1gQ0075X54Z14083Y5487Q7.json
    // https://se.timeedit.net/web/chalmers/db1/public/ri16X165X44Z08Q5Z36g4Y10y1006Y48504gQY5Q56753641Y78157551390Q448XY7.json
    $http.get('/api/schedule')
        .success(function(data) {
            $scope.schedule = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});
