(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngAnimate'
  ];

  angular.module('devtime', dependencies)
  .config(setupStates)
  .run(function ($rootScope, $state, $window, $location) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        if(toState.protected && !localStorage.getItem('token')) {
          event.preventDefault();
          $state.go('landing')
        }
      });
    })
    .factory('authInterceptor', function ($location) {
      return {
        request: function (config) {
          if (localStorage.getItem('token')) {
              config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
              return config
            } else {
              return config;
            }
        }
      }
    })

  setupStates.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider'
  ];

  function setupStates($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $httpProvider.interceptors.push('authInterceptor');

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
        url: '/messages',
        protected: true
      })
  }

}());
