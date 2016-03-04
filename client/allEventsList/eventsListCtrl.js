angular.module('studyMate')


.controller('eventsListCtrl', function($scope, $window, $state, eventsListFact, logFact, booksListFact) {
  $scope.data = [];
  $scope.allGuestLists = {};
  $scope.booksShowing = false;
  $scope.myEvents = [];

  $scope.toggleBooksShowing = function (){
    if($scope.booksShowing === true){
      $scope.booksShowing = false;
    } else {
      $scope.booksShowing = true;
    }
  };

  $scope.signout = function() {
    logFact.signout();
  };

  $scope.upcomingEvents = function(obj) {
    var date = new Date();
    var eventDate = new Date(obj.datetime);
    return eventDate >= date;
  };

  $scope.displayEvent = function() {
    eventsListFact.getEvents()
    .then(function(data) {
      data.forEach(function(value) {
        moment.tz.add('America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');
        value.formatted = moment(value.datetime, moment.ISO_8601).format('MMM D, YYYY, h:mm A');
      });
      $scope.data = data;
    }).catch(function(err) {
      console.log(err);
    });
  };

  $scope.checkJoinStatus = function(event){
    var token = $window.localStorage.getItem('com.studymate');

    var eventJoinData = {
      token: token,
      event: event
    };

    eventsListFact.checkJoinStatus(eventJoinData)
    .then(function(response) {
      if (response.isValid) {

      } else {

      }
    });
  };

  $scope.eventAttendanceToggle = function(event) {

    var token = $window.localStorage.getItem('com.studymate');

    var eventData = {
      token: token,
      event: event
    };

    eventsListFact.eventToggle(eventData)
    .then(function(response) {
      if (response.isValid) {
        $scope.getGuestList(event);
      } else {
        console.log('Event join failed');
      }
    });
    $scope.getGuestList(event);
  };

  $scope.getGuestList = function(event) {
    var list = [];
    list = [];
    eventsListFact.getGuestList(event.id)
    .then(function(data) {
      data.forEach(function(item) {
        list.push(item.username);
      });
      $scope.allGuestLists[event.id] = list;
      console.log('++line85 data = ', $scope.data);
      console.log('++line 86: $scope.allGuestLists[event.id]  = ', $scope.allGuestLists[event.id]);
      console.log('++line87: event.id = ', event.id);
    });
  };

  $scope.getMyEvents = function(event) {
    var myEventList = [];
  };

  $scope.displayEvent();
});
