'use strict';

(function () {

    document.addEventListener('DOMContentLoaded', function () {

        var gridDiv = document.querySelector('#myGrid');

        var gridOptions = {
            columnDefs: [
                {headerName: 'Country', field: 'Country'},
                {headerName: 'City', field: 'City'},
                {headerName: 'Budget', field: 'budget'}

            ]
        };

        new agGrid.Grid(gridDiv, gridOptions);

        function myRowScrolledHandler(event) {
            var position = gridOptions.api.getVerticalPixelRange();
            console.log('position', position);
        }

        gridOptions.api.addEventListener('bodyScroll', myRowScrolledHandler);



        jsonLoad(function (data) {
            gridOptions.api.setRowData(data);
            console.log('got data', data);
        });


    });

})();


function jsonLoad(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'MOCK_DATA.json'); //by default async
    xhr.responseType = 'json';

    xhr.onload = function () {
        if (this.status == 200) { //onload called even on 404 etc so check the status
            callback(this.response);
        }
    };

    xhr.onerror = function () {
        console.log('loading data error');
    };

    xhr.send();
}