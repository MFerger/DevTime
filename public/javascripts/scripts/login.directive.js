(function() {
  'use strict';

angular.module('devtime')
  .directive('devLogin', loginDirective)

  function loginDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/javascripts/partials/login.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }
  conroller.$inject = [
    '$log'
  ]

  function controller($log) {
    var vm = this;
  }

}());
