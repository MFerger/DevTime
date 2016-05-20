(function() {
  'use strict';

  var dependencies = [
    'ui.router'
  ];

  angular.module('devtime', dependencies)
  .config(setupStates)

  setupStates.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider'
  ];

  function setupStates($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
     .state('devtime', {
       abstract: true,
       templateUrl: '/javascripts/layout/layout.html',
    })
    .state('landing',{
      template: '<landing-page></landing-page>',
      parent: 'devtime',
      url: "/"
    })
    .state('login',{
      template: '<dev-login></dev-login>',
      parent: 'devtime',
      url: "/login"
    })
    .state('signup',{
      template: '<dev-signup></dev-signup>',
      parent: 'devtime',
      url: "/signup",
      })
      .state('questions', {
        template: '<dev-questions></dev-questions>',
        parent: 'devtime',
        url: '/superawesomefuntimequestions'
      })
      .state('messages', {
        template: '<dev-messages></dev-messages>',
        parent: 'devtime',
        url: '/messages'
      })
  }

}());
