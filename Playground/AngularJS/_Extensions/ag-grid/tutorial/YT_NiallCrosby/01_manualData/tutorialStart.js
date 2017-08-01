'use strict';

(function () {

    document.addEventListener('DOMContentLoaded', function () {

        var gridDiv = document.querySelector('#myGrid');

        var gridOptions = {
            columnDefs: [
                {headerName: 'Name', field: 'name'},
                {headerName: 'Role', field: 'role'}

            ],
            rowData: [
                {name: 'Niall', role: 'Manager'},
                {name: 'Bill', role: 'Accountant'},
                {name: 'Joe', role: 'Developer'},
                {name: 'Stacy', role: 'Designer'},
                {name: 'Becky', role: 'Support'}
            ]
        };

        new agGrid.Grid(gridDiv, gridOptions);

        console.log('gridDiv = ', gridDiv);
    });

})();