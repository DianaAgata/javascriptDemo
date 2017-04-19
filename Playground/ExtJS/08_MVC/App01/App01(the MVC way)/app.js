Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'SE',

    requires: [
        'SE.view.MainView'
    ],

    controllers: [
        'SE.controller.SessionController'
    ],

    stores: [
        'Sessions',
        'SessionPresenters',
        'Presenters'
    ],

    models: [
        'Session',
        'SessionPresenter',
        'Presenter'
    ],

    views: [
        'Sessions',
        'SessionForm',
        'Presenters',
        'Details'
    ],


    launch: function() {
        Ext.create('SE.view.MainView');
    }
});