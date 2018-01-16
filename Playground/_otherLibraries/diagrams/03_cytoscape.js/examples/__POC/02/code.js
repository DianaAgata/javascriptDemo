var serverData = [
    {
        step: 0,
        label: "Marck_0",
        status: "approved"
    },
    {
        step: 1,
        "label": "Joe_0",
        status: "rejected"
    },
    {
        step: 1,
        "label": "Joe_1",
        status: "waiting"
    },
    {
        step: 1,
        "label": "Joe_2",
        status: "waiting"
    },
    {
        step: 1,
        "label": "Joe_3",
        status: "waiting"
    },
    {
        step: 1,
        "label": "Joe_4",
        status: "waiting"
    },
    {
        step: 2,
        "label": "Lucy_0",
        status: "waiting"
    },
    {
        step: 3,
        "label": "Mike_0",
        status: "waiting"
    },
    {
        step: 3,
        "label": "Mike_1",
        status: "waiting"
    },
    {
        step: 4,
        "label": "Julie_0",
        status: "waiting"
    },
    {
        step: 4,
        "label": "Julie_1",
        status: "waiting"
    },
    {
        step: 4,
        "label": "Julie_2",
        status: "waiting"
    }

];

var graphConfig = {
    xStep: 120,
    yStep: 50
};

var serverNodes = [];
var severNodesLevels = [];
var nodesPerCategory = {};
var stepsArray = [];

//counting steps
for (var i = 0; i < serverData.length; i++) {
    if (severNodesLevels.indexOf(serverData[i].step) === -1) {
        severNodesLevels.push(serverData[i].step);
        stepsArray.push('lvl' + serverData[i].step);
    }
}

console.log("severNodesLevels", severNodesLevels);

for (i = 0; i < severNodesLevels.length; i++) {

    serverNodes.push(
        {
            data: {
                id: "lvl" + severNodesLevels[i]
            }
        }
    );

    nodesPerCategory["lvl" + i] = 0;

    for (var j = 0; j < serverData.length; j++) {
        if (serverData[j].step === severNodesLevels[i]) {
            nodesPerCategory["lvl" + i] += 1;
        }
    }
}

var serverEdges = [];

for (i = 0; i < stepsArray.length - 1; i++) {
    serverEdges.push({
        data: {
            id: stepsArray[i] + "-" + stepsArray[i + 1],
            source: stepsArray[i],
            target: stepsArray[i + 1]
        }
    })
    ;
}


var iterator = 0;
var currentLevel = "lvl0";

function generateYPosition(step) {
    if (step !== currentLevel) {
        iterator = 0;
    }

    var numberOfNodes = nodesPerCategory["lvl" + step];
    currentLevel = step;

    var yPosition = 0;

    if (numberOfNodes % 2 === 0) {
        if (iterator % 2 === 0) {
            yPosition = (iterator + 1) * graphConfig.yStep;
        } else {
            yPosition = -1 * iterator * graphConfig.yStep;
        }
    } else {
        if (iterator === 0) {
            yPosition = 0;
        } else {
            if (iterator % 2 !== 0) {
                yPosition = (iterator + 1) * graphConfig.yStep;
            } else {
                yPosition = -1 * iterator * graphConfig.yStep;
            }
        }
    }

    iterator++;

    return yPosition;
}


for (i = 0; i < serverData.length; i++) {
    serverNodes.push(
        {
            data: {
                id: serverData[i].label,
                parent: serverNodes[serverData[i].step]["data"]["id"] //gests the id of the coresponding step
            },
            position: {
                x: serverData[i].step * graphConfig.xStep,
                y: generateYPosition(serverData[i].step)
            },
            selected: false, // whether the element is selected (default false)

            selectable: false, // whether the selection state is mutable (default true)

            locked: true, // when locked a node's position is immutable (default false)

            grabbable: false, // whether the node can be grabbed and moved by the user

            classes: "node " + serverData[i].status
        }
    );
}


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
        },
        //style node statuses
        {
            selector: '.node.approved',
            css: {
                'background-color': 'blue',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
            }
        },
        {
            selector: '.node.rejected',
            css: {
                'background-color': 'red',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
            }
        },
        {
            selector: '.node.waiting',
            css: {
                'background-color': 'yellow',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
            }
        }

    ],


    elements: {
        nodes: serverNodes,
        edges: serverEdges
    },

    layout: {
        name: 'preset',
        padding: 5
    }

}); //closing cy constructor


cy.minZoom(0.5);
cy.maxZoom(2);

//center the graph on a node
// var j = cy.$("#j");
// cy.center( j );