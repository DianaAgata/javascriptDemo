var cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [
        // nodes
        {
            data:
                {id: 'a'},
            position: {
                x: 0,
                y: 0
            }
        },
        {
            data:
                {id: 'b'},
            position: {
                x: 100,
                y: 0
            }
        },
        {
            data:
                {id: 'c'},
            position: {
                x: 100,
                y: -100
            }
        },
        {
            data: {id: 'd'},
            position: {
                x: 100,
                y: -200
            }
        },
        {
            data: {id: 'e'},
            position: {
                x: 100,
                y: 100
            }
        },
        {
            data: {id: 'f'},
            position: {
                x: 100,
                y: 200
            }
        },
        {
            data: {id: 'g'},
            position: {
                x: 200,
                y: 0
            }
        },
        {
            data: {id: 'h'},
            position: {
                x: 300,
                y: -75
            }
        },
        {
            data: {id: 'i'},
            position: {
                x: 300,
                y: 75
            }
        },
        {
            data: {id: 'j'},
            position: {
                x: 400,
                y: -150
            }
        },
        {
            data: {id: 'k'},
            position: {
                x: 400,
                y: 0
            }
        },
        {
            data: {id: 'l'},
            position: {
                x: 400,
                y: 150
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