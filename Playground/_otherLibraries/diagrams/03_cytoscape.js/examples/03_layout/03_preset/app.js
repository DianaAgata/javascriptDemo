var cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [
        // nodes
        {
            data:
                {id: 'a'},
            position: {
                x: 100,
                y: 100
            }
        },
        {
            data:
                {id: 'b'},
            position: {
                x: 100,
                y: 200
            }
        },
        {
            data:
                {id: 'c'},
            position: {
                x: 200,
                y: 100
            }
        },
        {
            data: {id: 'd'},
            position: {
                x: 200,
                y: 200
            }
        },
        {
            data: {id: 'e'},
            position: {
                x: 100,
                y: 300
            }
        },
        {
            data: {id: 'f'},
            position: {
                x: 200,
                y: 300
            }
        },
        // edges
        {
            data: {
                id: 'ab',
                source: 'a',
                target: 'b'
            }
        },
        {
            data: {
                id: 'cd',
                source: 'c',
                target: 'd'
            }
        },
        {
            data: {
                id: 'ef',
                source: 'e',
                target: 'f'
            }
        },
        {
            data: {
                id: 'ac',
                source: 'a',
                target: 'c'
            }
        },
        {
            data: {
                id: 'be',
                source: 'b',
                target: 'e'
            }
        }
    ],
    layout: {
        name: 'preset'
    },
    style: [
        {
            selector: 'node',
            style: {
                shape: 'hexagon',
                'background-color': 'red',
                label: 'data(id)'
            }
        }]
});