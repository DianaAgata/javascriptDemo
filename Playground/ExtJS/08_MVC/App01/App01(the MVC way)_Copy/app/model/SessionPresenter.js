Ext.define('SE.model.SessionPresenter', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'sessionId',
            type: 'int'
        },
        {
            name: 'presenterId',
            type: 'int'
        },
        {
            name: 'sequence',
            sortType: 'asUCString'
        },
        {
            name: 'speakerName'
        }
    ],

    proxy: {
        type: 'rest',
        url: 'data/SessionPresenters.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});