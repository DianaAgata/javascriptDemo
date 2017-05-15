Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    name: 'HW', //this defines the namespace

    requires: [
        'HW.view.MainView'
    ],

    views: [
        // 'FirstView'
    ],


    launch: function () {
        Ext.create('HW.view.MainView');//this actually lauches the first view
    }


});