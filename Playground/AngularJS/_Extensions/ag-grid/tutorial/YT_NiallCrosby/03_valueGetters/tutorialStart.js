'use strict';

(function () {

    document.addEventListener('DOMContentLoaded', function () {

        var gridDiv = document.querySelector('#myGrid');

        var selectedMonth = 0;

        var gridOptions = {
            columnDefs: [
                {headerName: 'Country', field: 'Country'},
                {headerName: 'City', field: 'City'},
                {headerName: 'Budget Jan', field: 'jan', monthIndex: 0, valueGetter: monthValueGetter},
                {headerName: 'Budget Feb', field: 'feb', monthIndex: 1, valueGetter: monthValueGetter},
                {headerName: 'Budget Mar', field: 'mar', monthIndex: 2, valueGetter: monthValueGetter},
                {headerName: 'Budget Apr', field: 'apr', monthIndex: 3, valueGetter: monthValueGetter},
                {headerName: 'Budget May', field: 'may', monthIndex: 4, valueGetter: monthValueGetter},
                {headerName: 'YTD Actual', valueGetter : function(params){
                    var total = 0;
                    if (selectedMonth >= 0){total += params.data.jan_actual;}
                    if (selectedMonth >= 1){total += params.data.feb_actual;}
                    if (selectedMonth >= 2){total += params.data.mar_actual;}
                    if (selectedMonth >= 3){total += params.data.apr_actual;}
                    if (selectedMonth >= 4){total += params.data.may_actual;}
                    return total;
                }}
            ]
        };

        function monthValueGetter(params) {
            if (selectedMonth < params.colDef.monthIndex) {
                return params.data[params.colDef.field + '_budget'];
            } else {
                return params.data[params.colDef.field + '_actual'];
            }
        }

        new agGrid.Grid(gridDiv, gridOptions);

        function myRowScrolledHandler(event) {
            console.log('scrolled...' + event.direction);
            console.log('event', event);
        }

        gridOptions.api.addEventListener('bodyScroll', myRowScrolledHandler);

        jsonLoad(function (data) {
            gridOptions.api.setRowData(data);
            console.log('got data', data);
            gridOptions.api.sizeColumnsToFit();
        });

        document.querySelector('#btMonthDown').addEventListener('click', function () {
            selectedMonth--;
            gridOptions.api.refreshView();
        });

        document.querySelector('#btMonthUp').addEventListener('click', function () {
            selectedMonth++;
            gridOptions.api.refreshView();
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