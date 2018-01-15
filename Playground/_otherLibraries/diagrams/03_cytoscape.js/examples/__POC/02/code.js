var serverData = [
    {
        level: 0,
        label: "Marck_0"
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


var serverNodes = [];
var severNodesLevels = [];
var nodesPerCategory = {};
var levelsArray = [];

//counting levels
for (var i = 0; i < serverData.length; i++) {
    if (severNodesLevels.indexOf(serverData[i].level) === -1) {
        severNodesLevels.push(serverData[i].level);
        levelsArray.push('lvl' + serverData[i].level);
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
        if (serverData[j].level === severNodesLevels[i]) {
            nodesPerCategory["lvl" + i] += 1;
        }
    }
}

var serverEdges = [];

for (i = 0; i < levelsArray.length - 1; i++) {
    serverEdges.push({
        data: {
            id: levelsArray[i] + "-" + levelsArray[i + 1],
            source: levelsArray[i],
            target: levelsArray[i + 1]
        }
    })
    ;
}


var iterator = 0;
var currentLevel = "lvl0";

function generateYPosition(level) {
    if (level !== currentLevel) {
        iterator = 0;
    }

    var numberOfNodes = nodesPerCategory["lvl" + level];
    currentLevel = level;

    var yPosition = 0;

    if (numberOfNodes % 2 === 0) {
        if (iterator % 2 === 0) {
            yPosition = (iterator + 1) * 50;
        } else {
            yPosition = -1 * iterator * 50;
        }
    } else {
        if (iterator === 0) {
            yPosition = 0;
        } else {
            if (iterator % 2 !== 0) {
                yPosition = (iterator + 1) * 50;
            } else {
                yPosition = -1 * iterator * 50;
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
                parent: serverNodes[serverData[i].level]["data"]["id"] //gests the id of the coresponding level
            },
            position: {
                x: serverData[i].level * 100,
                y: generateYPosition(serverData[i].level)
            }
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
});
