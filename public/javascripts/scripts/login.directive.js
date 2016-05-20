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
  controller.$inject = [
    '$log'
  ]

  function controller($log) {
    var vm = this;
    vm.form = {};
    vm.form.login = login;

    function login(form) {
      var login = angular.copy(vm.form);
      vm.form = {};
      questionsService.login(login);
    }
  }

}());
