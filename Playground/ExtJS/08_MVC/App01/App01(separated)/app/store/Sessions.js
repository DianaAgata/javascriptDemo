Ext.define('SE.store.Sessions',{
    extend: 'Ext.data.Store',
    model: 'SE.model.Session',

    autoLoad: true,
    autoSync: true,

    sorters:[
        {property: 'approved'},
        {property: 'title'}

    ],
    groupField: 'sessionTimeDateTime'


});