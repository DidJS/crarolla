
module app.cras {
    interface ICraScope {
        title: string;
    }

    class CraController implements ICraScope {
        title: string;

        constructor() {
            this.title = 'Hello world of cras';
        }
    }

    angular
        .module('app.cras')
        .controller('app.cras.CraController', CraController);
}