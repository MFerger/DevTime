(function() {
  'use strict';

angular.module('devtime')
  .directive('devMessages', messagesDirective)

  function messagesDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/javascripts/partials/messages.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }
  controller.$inject = [
    '$log',
    'questionsService'
  ]

  function controller($log, questionsService) {
    var vm = this;
    vm.form = {};
    vm.form.message = message;

    function message(form) {
      var msg = angular.copy(vm.form);
      vm.form = {};
      console.log(msg);
      questionsService.message(msg);
    }
  }

}());
