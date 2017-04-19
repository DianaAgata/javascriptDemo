Ext.define('SE.store.Presenters', {
    extend: 'Ext.data.Store',

    requires: [
        'SE.model.Presenter',
        'Ext.util.Filter'
    ],

    model: 'SE.model.Presenter',
    autoLoad: true,
    storeId: 'Presenters',
    pageSize: 999,
    filters: {
        filterFn: function (item) {
            return false;

        }
    }
});