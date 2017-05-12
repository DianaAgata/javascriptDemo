function HeroDetailController() {

}

angular.module('app').component('heroDetail', {
    templateUrl: 'heroDetail.html',
    controller: HeroDetailController,
    bindings: {
        hero: '='
    }
});