(function() {
  'use strict';

angular.module('devtime')
  .directive('landingPage', landingPageDirective)

  function landingPageDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/javascripts/partials/landingPage.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }
  controller.$inject = [
    '$log'
  ]

  function controller($log) {
    var vm = this;
  }

}());
