Ext.define("SE.controller.SessionController",{
    extend: 'Ext.app.Controller',

    init: function(){

        this.control({
            "sessiongridpanel":{
                itemdblclick: function(gridpanel,record,item,e){
                    var formWindow = Ext.create('SE.view.SessionForm');
                    // debugger;

                    var form = formWindow.down('form');

                    form.loadRecord(record);


                    formWindow.show();

                }
            }

        })

    }


});