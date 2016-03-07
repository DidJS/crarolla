(() : void => {
    'use strict';

   angular
        .module('app.cras')
        .config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider): void => {
            $routeProvider
                    .when('/', {
                        templateUrl: 'public/app/cras/cra.html',
                        controller: 'app.cras.CraController',
                        controllerAs: 'vm'
                    });

        }]);

   console.log('app.cras routes loaded');
})();