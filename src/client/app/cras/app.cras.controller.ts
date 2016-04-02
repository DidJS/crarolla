module app.cras {
    interface ICraScope {
        title: string;
    }

    function CraController(): ICraScope {

       const title: string = 'Hello world of cras';

       return {
           title: title
       }
    }

    angular
        .module('app.cras')
        .controller('app.cras.CraController', CraController);
}