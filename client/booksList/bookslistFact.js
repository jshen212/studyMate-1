angular.module('studyMate')

.factory('bookslistFact', function($http) {

  var getBooks = function(topic){
    return $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + topic,
    }).then(function success(response) {
      console.log(response);
    }, function error(err) {
      console.log(err);
    });
  };
});
