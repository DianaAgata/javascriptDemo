Ext.define('SE.model.Session', {
    extend: 'Ext.data.Model',

    fields: [
       'id',
       { name: 'title', sortType: 'asUCText' },
       { name: 'approved', type: 'boolean' },
       {
           dateFormat: 'c',
           name: 'sessionTimeDateTime',
           sortType: 'asDate',
           type: 'date'
       },
       {
           convert: function (v, rec) {
               var convertIt = Ext.util.Format.dateRenderer('m/d/Y g:i a'),
                   pretty = convertIt(rec.get("sessionTimeDateTime"));
               return pretty;
           },
           name: 'sessionTimePretty',
           type: 'string'
       }
    ],
    proxy: {
        type: 'rest',
        url: 'data/sessions.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});