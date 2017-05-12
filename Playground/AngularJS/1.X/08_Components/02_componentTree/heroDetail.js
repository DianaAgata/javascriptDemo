
angular.module('heroApp').component('heroDetail', {
    templateUrl: 'heroDetail.html',
    controller: HeroDetailController,
    bindings: {
        hero: '<',
        onDelete: '&',
        onUpdate: '&'
    }
});

function HeroDetailController() {

    var ctrl = this;
    ctrl.delete = function() {
        console.log('deleting hero');
        ctrl.onDelete({hero: ctrl.hero});
    };

    ctrl.update = function(prop, value) {
        console.log('updating ',prop, 'to ', value);
        ctrl.onUpdate({hero: ctrl.hero, prop: prop, value: value});
    };
}
