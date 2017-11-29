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
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data:
                {id: 'b'},
            position: {
                x: 100,
                y: 0
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data:
                {id: 'c'},
            position: {
                x: 100,
                y: -100
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'd'},
            position: {
                x: 100,
                y: -200
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'e'},
            position: {
                x: 100,
                y: 100
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'f'},
            position: {
                x: 100,
                y: 200
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'g'},
            position: {
                x: 200,
                y: 0
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'h'},
            position: {
                x: 300,
                y: -75
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'i'},
            position: {
                x: 300,
                y: 75
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'j'},
            position: {
                x: 400,
                y: -150
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'k'},
            position: {
                x: 400,
                y: 0
            },
            selectable: false,
            locked: true,
            grabbable: false
        },
        {
            data: {id: 'l'},
            position: {
                x: 400,
                y: 150
            },
            selectable: false,
            locked: true,
            grabbable: false
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
                id: 'bc',
                source: 'b',
                target: 'c'
            }
        },
        {
            data: {
                id: 'bg',
                source: 'b',
                target: 'g'
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