var serverData = [
    {
        step: 1,
        approvers: [
            {
                user: "Timothy Chizoba",
                status: "approved",
                comment: "Approved"
            }
        ]
    },
    {
        step: 2,
        approvers: [
            {
                "user": "Melik Kapua",
                status: "rejected",
                comment: "Rejected"
            },
            {
                "user": "Yvain Uthyr",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "user": "Astaroth Ophelia",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "user": "Yahweh Cinderella",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "user": "Eowyn Gyneth",
                status: "waiting",
                comment: "Waiting"
            }
        ]
    },
    {
        step: 3,
        approvers: [
            {
                "user": "Ywain Athelstan",
                status: "approved",
                comment: "Approved"
            }
        ]
    },
    {
        step: 4,
        approvers: [
            {
                "user": "Gandalf Ossian",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "user": "Nimue Gyneth",
                status: "waiting",
                comment: "Waiting"
            }
        ]
    },
    {
        step: 5,
        approvers: [
            {
                "user": "Launce Artaxerxes",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "user": "Alphege Aminta",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "user": "Tristan Merry",
                status: "waiting",
                comment: "Waiting"
            }
        ]
    }

];


var graphConfig = {
    xStep: 250,
    yStep: 50,
    minZoom: 0.5,
    maxZoom: 3,
    maxGraphWidth: 800,
    maxGraphHeight: 600
};


var i, j;


function prepareData(data) {
    var stepLevel = 0;
    var newServerData = [];
    for (i = 0; i < data.length; i++) {
        // data[i]stepLevel = stepLevel;
        for (var j = 0; j < data[i].approvers.length; j++) {
            newServerData.push({
                stepLevel: stepLevel,
                user: data[i].approvers[j].user,
                status: data[i].approvers[j].status,
                comment: data[i].approvers[j].status
            });
        }
        stepLevel++;
    }

    return newServerData;
}

var newServerData = prepareData(serverData);

var serverNodes = [];
var severNodesLevels = [];
var nodesPerCategory = {};
var stepsArray = [];
var maxNodesPerLevel = 0;

//counting steps
for (i = 0; i < newServerData.length; i++) {
    if (severNodesLevels.indexOf(newServerData[i].stepLevel) === -1) {
        severNodesLevels.push(newServerData[i].stepLevel);
        stepsArray.push('lvl' + newServerData[i].stepLevel);
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

    for (j = 0; j < newServerData.length; j++) {
        if (newServerData[j].stepLevel === severNodesLevels[i]) {
            nodesPerCategory["lvl" + i] += 1;
        }
    }
}

var serverEdges = [];

if (newServerData.length > 1) {
    debugger;
    for (i = 0; i < stepsArray.length - 1; i++) {
        serverEdges.push({
            data: {
                id: stepsArray[i] + "-" + stepsArray[i + 1],
                source: stepsArray[i],
                target: stepsArray[i + 1]
            },
            classes: "test" ///TODO: finish this
        })
        ;
    }
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

    if (iterator > maxNodesPerLevel) {
        debugger;
        maxNodesPerLevel = iterator;
    }

    return yPosition;
}


for (i = 0; i < newServerData.length; i++) {
    serverNodes.push(
        {
            data: {
                id: "node" + "-" + i,
                user: newServerData[i].user,
                parent: (newServerData.length > 1) ? serverNodes[newServerData[i].stepLevel]["data"]["id"] : null //gests the id of the corresponding step if there is more than one node
            },
            position: {
                x: newServerData[i].stepLevel * graphConfig.xStep,
                y: generateYPosition(newServerData[i].stepLevel)
            },
            selected: false, // whether the element is selected (default false)

            selectable: false, // whether the selection state is mutable (default true)

            locked: true, // when locked a node's position is immutable (default false)

            grabbable: false, // whether the node can be grabbed and moved by the user

            classes: "node " + newServerData[i].status
        }
    );
}


$('#cyContainer').width(Math.min((severNodesLevels.length * 200), graphConfig.maxGraphWidth));
$('#cyContainer').height(Math.min((maxNodesPerLevel + 1) * 100, graphConfig.maxGraphHeight));

var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: [
        {
            selector: 'node',
            css: {
                'content': 'data(user)',
                'text-halign': 'center',
                'text-valign': 'top',
                'color': '#222',
                'font-family': 'arial',
                'font-size': '20px'
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
                'background-color': 'white',
                'border-color': 'gray',
                'border-width': "1px"
            }
        },
        {
            selector: 'edge',
            css: {
                'target-arrow-shape': 'triangle'
            }
        },
        //style node statuses
        {
            selector: '.node',
            css: {
                'border-color': "gray",
                'border-width': "1px"
            }
        },
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
        },
        {
            selector: '.test', //TODO: finish this
            css: {
                'background-color': 'red'
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


cy.minZoom(graphConfig.minZoom);
cy.maxZoom(graphConfig.maxZoom);

// cy.zoom({
//     level: 0.8 // the zoom level
// });


var defaults = {
    zoomFactor: 0.05, // zoom factor per zoom tick
    zoomDelay: 45, // how many ms between zoom ticks
    minZoom: graphConfig.minZoom, // min zoom level
    maxZoom: graphConfig.maxZoom, // max zoom level
    fitPadding: 50, // padding when fitting
    panSpeed: 10, // how many ms in between pan ticks
    panDistance: 10, // max pan distance per tick
    panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
    panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
    panInactiveArea: 8, // radius of inactive area in pan drag box
    panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
    zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
    fitSelector: undefined, // selector of elements to fit
    animateOnFit: function () { // whether to animate on fit
        return true;
    },
    fitAnimationDuration: 1000, // duration of animation on fit

    // icon class names
    sliderHandleIcon: 'fa fa-minus',
    zoomInIcon: 'fa fa-plus',
    zoomOutIcon: 'fa fa-minus',
    resetIcon: 'fa fa-expand'
};

cy.panzoom(defaults);


// addingQtips

for (i = 0; i < newServerData.length; i++) {
    cy.$('#node-' + i).qtip({
        content: newServerData[i].comment,
        position: {
            my: 'top center',
            at: 'bottom center'
        },
        show: {
            event: 'mouseover click',
            ready: true
        },
        hide: {
            event: 'mouseout unfocus'
        },
        style: {
            classes: 'qtip-bootstrap',
            tip: {
                width: 16,
                height: 8
            }
        }
    });
}


// cy.on('mouseover', 'node', function (event) {
//     var node = event.target
//     debugger;
//     node.qtip({
//         content: 'hello',
//         show: {
//             event: event.type,
//             ready: true
//         },
//         hide: {
//             event: 'mouseout unfocus'
//         }
//     }, event);
// });


//center the graph on a node
// var j = cy.$("#j");
// cy.center( j );