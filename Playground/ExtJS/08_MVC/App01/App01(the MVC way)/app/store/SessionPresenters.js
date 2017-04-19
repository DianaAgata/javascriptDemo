Ext.define('SE.store.SessionPresenters', {
    extend: 'Ext.data.Store',

    requires: [
        'SE.model.SessionPresenter',
        'Ext.util.Sorter'
    ],

    autoLoad: true,
    model: 'SE.model.SessionPresenter',
    storeId: 'SessionPresenters',
    pageSize: 9999,
    sorters: {
        property: 'sequence'
    }

});