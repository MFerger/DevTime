(function() {
  'use strict';

angular.module('devtime')
  .directive('devQuestions', loginDirective)

  function loginDirective() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/javascripts/partials/questions.html',
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
    vm.form.time = 'function Person(name){this.name = name;} \n Person.prototype.greet = function(otherName){\nreturn"Hi " + otherName + ", my name is " + name;\n}'

    vm.form.submitQuestions = submitQuestions;

    function submitQuestions(form){
      if (vm.form.time === 'function Person(name){this.name = name;} \n Person.prototype.greet = function(otherName){\nreturn"Hi " + otherName + ", my name is " + this.name;\n}') {
        vm.form.time = true;
      } else {
        vm.form.time = false;
      }
      console.log('it got here');
      var questions = angular.copy(vm.form);
      vm.form = {};
      questionsService.questions(questions);
    }


  }

}());
