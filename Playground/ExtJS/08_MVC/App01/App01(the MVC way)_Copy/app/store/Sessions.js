Ext.define('SE.store.Sessions', {
    extend: 'Ext.data.Store',
    model: 'SE.model.Session',

    sorters: [
        {
            property: 'title'
        }
    ],
    groupField: 'sessionTimeDateTime',

    autoSync: true,
    autoLoad: true
    

});