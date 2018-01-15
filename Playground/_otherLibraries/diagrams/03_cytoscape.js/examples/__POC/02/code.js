var serverData = [
    {
        level: 0,
        label: "Mike_0"
    },
    {
        level: 1,
        "label": "Joe_0"
    },
    {
        level: 1,
        "label": "Joe_1"
    },
    {
        level: 1,
        "label": "Joe_2"
    },
    {
        level: 1,
        "label": "Joe_3"
    },
    {
        level: 1,
        "label": "Joe_4"
    },
    {
        level: 2,
        "label": "Lucy_0"
    },
    {
        level: 3,
        "label": "Mike_0"
    },
    {
        level: 3,
        "label": "Mike_1"
    },
    {
        level: 4,
        "label": "Julie_0"
    },
    {
        level: 4,
        "label": "Julie_1"
    },
    {
        level: 4,
        "label": "Julie_2"
    }

];

var nodes = [
    {
        data:
            {
                id: 'lvl0'

            }
    },
    {
        data:
            {
                id: 'lvl0_pos0',
                parent: 'lvl0'
            },
        position: {
            x: 0,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl1'
            }
    },
    {
        data:
            {
                id: 'lvl1-pos0',
                parent: 'lvl1'
            },
        position: {
            x: 100,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl1-pos1',
                parent: 'lvl1'
            },
        position: {
            x: 100,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl1-pos2',
                parent: 'lvl1'
            },
        position: {
            x: 100,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl1-pos3',
                parent: 'lvl1'
            },
        position: {
            x: 100,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl1-pos4',
                parent: 'lvl1'
            },
        position: {
            x: 100,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl2'

            }
    },
    {
        data:
            {
                id: 'lvl2_pos0',
                parent: 'lvl2'
            },
        position: {
            x: 200,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl3'
            }
    },
    {
        data:
            {
                id: 'lvl3_pos0',
                parent: 'lvl3'

            },
        position: {
            x: 300,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl3_pos1',
                parent: 'lvl3'

            },
        position: {
            x: 300,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl4'
            }
    },
    {
        data:
            {
                id: 'lvl4-pos0',
                parent: 'lvl4'

            },
        position: {
            x: 400,
            y: 0
        }
    },
    {
        data:
            {
                id: 'lvl4-pos1',
                parent: 'lvl4'

            },
        position: {
            x: 400,
            y: 0
        }
    }, {
        data:
            {
                id: 'lvl4-pos2',
                parent: 'lvl4'

            },
        position: {
            x: 400,
            y: 0
        }
    }

];

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
        nodes: nodes,
        edges: [
            {
                data:
                    {
                        id: 'lvl0-lvl1',
                        source: 'lvl0',
                        target: 'lvl1'
                    }
            },
            {
                data:
                    {
                        id: 'lvl1-lvl2',
                        source: 'lvl1',
                        target: 'lvl2'
                    }
            },
            {
                data:
                    {
                        id: 'lvl2-lvl3',
                        source: 'lvl2',
                        target: 'lvl3'
                    }
            },
            {
                data:
                    {
                        id: 'lvl3-lvl4',
                        source: 'lvl3',
                        target: 'lvl4'
                    }
            }

        ]
    },

    layout: {
        name: 'preset',
        padding: 5
    }
});
