/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />

(() : void => {
    'use strict';

   angular
        .module('app.cras')
        .config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider): void => {
            $routeProvider
                    .when('/', {
                        templateUrl: 'app/cras/cra.html',
                        controller: 'app.cras.CraController',
                        controllerAs: 'vm'
                    });

        }]);

   console.log('app.cras routes loaded');
})();