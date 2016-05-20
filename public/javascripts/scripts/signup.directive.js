(function() {
  'use strict';

angular.module('devtime')
  .directive('devSignup', signupDirective)

  function signupDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/javascripts/partials/signup.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }
  controller.$inject = [
    '$log',
    '$state',
    'questionsService'
  ]

  function controller($log, $state, questionsService) {
    var vm = this;
    vm.signup = signup;

    function signup (form) {
      var newUser = angular.copy(vm.form);
      vm.form = {};
      questionsService.signup(newUser);
      $state.go('questions')
    }
  }

}());
