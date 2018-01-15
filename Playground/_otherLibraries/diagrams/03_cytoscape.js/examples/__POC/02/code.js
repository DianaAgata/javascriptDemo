var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: [
        {
            selector: 'node',
            css: {
                'content': 'data(id)',
                'text-valign': 'center',
                'text-halign': 'center'
            }
        },
        {
            selector: '$node > node',
            css: {
                'padding-top': '10px',
                'padding-left': '10px',
                'padding-bottom': '10px',
                'padding-right': '10px',
                'text-valign': 'top',
                'text-halign': 'center',
                'background-color': '#bbb'
            }
        },
        {
            selector: 'edge',
            css: {
                'target-arrow-shape': 'triangle'
            }
        },
        {
            selector: ':selected',
            css: {
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
            }
        }
    ],

    elements: {
        nodes: [
            {
                data:
                    {
                        id: 'a'

                    },
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                data:
                    {
                        id: 'b'
                    }
            },
            {
                data:
                    {
                        id: 'c',
                        parent: 'b'
                    },
                position: {
                    x: 100,
                    y: -100
                }
            },
            {
                data:
                    {
                        id: 'd',
                        parent: 'b'
                    },
                position: {
                    x: 100,
                    y: -50
                }
            },
            {
                data:
                    {
                        id: 'e',
                        parent: 'b'
                    },
                position: {
                    x: 100,
                    y: 0
                }
            },
            {
                data:
                    {
                        id: 'f',
                        parent: 'b'
                    },
                position: {
                    x: 100,
                    y: 50
                }
            },
            {
                data:
                    {
                        id: 'g',
                        parent: 'b'
                    },
                position: {
                    x: 100,
                    y: 100
                }
            },
            {
                data:
                    {
                        id: 'h'

                    },
                position: {
                    x: 200,
                    y: 0
                }
            },
            {
                data:
                    {
                        id: 'i'
                    }
            },
            {
                data:
                    {
                        id: 'j',
                        parent: 'i'

                    },
                position: {
                    x: 300,
                    y: -50
                }
            },
            {
                data:
                    {
                        id: 'k',
                        parent: 'i'

                    },
                position: {
                    x: 300,
                    y: 50
                }
            },
            {
                data:
                    {
                        id: 'l'
                    }
            },
            {
                data:
                    {
                        id: 'm',
                        parent: 'l'

                    },
                position: {
                    x: 400,
                    y: -50
                }
            },
            {
                data:
                    {
                        id: 'n',
                        parent: 'l'

                    },
                position: {
                    x: 400,
                    y: 0
                }
            }, {
                data:
                    {
                        id: 'o',
                        parent: 'l'

                    },
                position: {
                    x: 400,
                    y: 50
                }
            }

        ],
        edges: [
            {
                data:
                    {
                        id: 'ab',
                        source: 'a',
                        target: 'b'
                    }
            },
            {
                data:
                    {
                        id: 'bh',
                        source: 'b',
                        target: 'h'
                    }
            },
            {
                data:
                    {
                        id: 'hi',
                        source: 'h',
                        target: 'i'
                    }
            },
            {
                data:
                    {
                        id: 'il',
                        source: 'i',
                        target: 'l'
                    }
            }

        ]
    },

    layout: {
        name: 'preset',
        padding: 5
    }
});
