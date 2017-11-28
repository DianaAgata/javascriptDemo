// var cy = cytoscape({
//
//     container: document.getElementById('cy'),
//
//     elements: [
//         { // node n1
//             group: 'nodes', // 'nodes' for a node, 'edges' for an edge
//             // NB the group field can be automatically inferred for you but specifying it
//             // gives you nice debug messages if you mis-init elements
//
//
//             data: { // element data (put json serialisable dev data here)
//                 id: 'n1', // mandatory (string or number) id for each element, assigned automatically on undefined
//                 parent: 'nparent', // indicates the compound node parent id; not defined => no parent
//             },
//
//             // scratchpad data (usually temp or nonserialisable data)
//             scratch: {
//                 _foo: 'bar' // app fields prefixed by underscore; extension fields unprefixed
//             },
//
//             position: { // the model position of the node (optional on init, mandatory after)
//                 x: 100,
//                 y: 100
//             },
//
//             selected: false, // whether the element is selected (default false)
//
//             selectable: true, // whether the selection state is mutable (default true)
//
//             locked: false, // when locked a node's position is immutable (default false)
//
//             grabbable: true, // whether the node can be grabbed and moved by the user
//
//             classes: 'foo bar' // a space separated list of class names that the element has
//         },
//
//         { // node n2
//             data: { id: 'n2' },
//             renderedPosition: { x: 200, y: 200 } // can alternatively specify position in rendered on-screen pixels
//         },
//
//         { // node n3
//             data: { id: 'n3', parent: 'nparent' },
//             position: { x: 123, y: 234 }
//         },
//
//         { // node nparent
//             data: { id: 'nparent', position: { x: 200, y: 100 } }
//         },
//
//         { // edge e1
//             data: {
//                 id: 'e1',
//                 // inferred as an edge because `source` and `target` are specified:
//                 source: 'n1', // the source node id (edge comes from this node)
//                 target: 'n2'  // the target node id (edge goes to this node)
//             }
//         }
//     ],
//
//     layout: {
//         name: 'preset'
//     },
//
//     // so we can see the ids
//     style: [
//         {
//             selector: 'node',
//             style: {
//                 'content': 'data(id)'
//             }
//         }
//     ]
//
// });


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