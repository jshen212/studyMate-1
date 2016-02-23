angular.module('studyMate')

.controller('eventsListCtrl',function($scope, eventsListFact, logFact){
  $scope.data = [];

  $scope.signout = function () {
    logFact.signout();
  }

  $scope.displayEvent = function(){
    console.log('++line 6 inside eventsListCtrl');
    eventsListFact.getEvents()
    .then(function(data){
      data.forEach(function(value){
        value.formatted = moment(value.datetime, moment.ISO_8601).utcOffset(480).format('MMM Do YYYY, h:mm A');
      });
      $scope.data = data;
      console.log('++line 10 in eventsListCtrl Success: ',$scope.data);
    }).catch(function(err) {
      console.log('++line 12 in eventsList Ctrl Error: ',err);
    });
  };

  $scope.eventJoin = function() {
    console.log('++line 20 in eventJoin in eventsListCtrl');
    // $scope.event.token = window.localStorage.getItem('com.studymate');
    eventsListFact.eventJoin($scope.user, $scope.event)
    .then(function(response) {
      if (response.isValid) {
        console.log('Valid response from eventsListFact');
      } else {
        console.log('Event join failed');
      }
    })

  };

  $scope.displayEvent();

});
