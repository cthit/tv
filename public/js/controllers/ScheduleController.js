app.controller('ScheduleController', function($scope, $http) {
    // get todays schedule as json
    // TODAYS: https://se.timeedit.net/web/chalmers/db1/public/ri15YXQ3041Z57Qv8X034156y8Y470155Y97Y1gQ0075X54Z14083Y5487Q7.json
    // https://se.timeedit.net/web/chalmers/db1/public/ri16X165X44Z08Q5Z36g4Y10y1006Y48504gQY5Q56753641Y78157551390Q448XY7.json
    $http.get('/api/schedule')
        .success(function(data) {
            $scope.schedule = data;
            calendarSetup();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      /**
      * Sets up the calendar with values from the schedule, formats these so the calendar can understand them.
      */
    function calendarSetup(){
      var events_fullcalender_format = [];
      var reservations = $scope.schedule.reservations;

      for (i = 0; i < reservations.length; i++) {
        events_fullcalender_format.push({
          id: reservations[i].id,
          title: reservations[i].columns[0],
          description: "Location: " + reservations[i].columns[1] +
              "</br>Type: " + reservations[i].columns[2] +
              "</br>Classes: " + reservations[i].columns[5],
          start: reservations[i].startdate + "T" + reservations[i].starttime + "Z",
          end: reservations[i].enddate + "T" + reservations[i].endtime + "Z",
        })
      }
      console.log(events_fullcalender_format);
      $('#calendar').fullCalendar({
        events: events_fullcalender_format,
        defaultView: 'agendaDay',
        minTime: '08:00',
        maxTime: '18:00',
        slotEventOverlap:false,
        smallTimeFormat: 'HH:mm',
        timeFormat: {
           agenda: 'HH:mm'
        },
        eventRender: function(event, element) {
          element.find('.fc-title').append("<br/>" + event.description);
        }
      });
    }
  });
