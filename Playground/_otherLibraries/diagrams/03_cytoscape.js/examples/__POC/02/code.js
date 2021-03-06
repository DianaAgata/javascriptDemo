var serverData = [
    {
        step: 1,
        invoiceApprovalDetailsList: [
            {
                userFullName: "Timothy Chizoba",
                status: "statusApproved",
                comment: "this is just a status"
            }
        ]
    },
    {
        step: 2,
        invoiceApprovalDetailsList: [
            {
                "userFullName": "Melik Kapua",
                status: "statusRejected",
                comment: "this is a comment"
            },
            {
                "userFullName": "Yvain Uthyr",
                status: "statusApprovalRequested",
                comment: "lolos envios"
            },
            {
                "userFullName": "Astaroth Ophelia",
                status: "statusApprovalRequested",
                comment: "Bibi Bubu"
            },
            {
                "userFullName": "Yahweh Cinderella",
                status: "statusApprovalRequested",
                comment: "Gigi Gica"
            },
            {
                "userFullName": "Eowyn Gyneth",
                status: "statusApprovalRequested",
                comment: "lorem ipsum"
            }
        ]
    },
    {
        step: 3,
        invoiceApprovalDetailsList: [
            {
                "userFullName": "Ywain Athelstan",
                status: "statusApprovalNotReady",
                comment: "bla bla bla"
            }
        ]
    },
    {
        step: 4,
        invoiceApprovalDetailsList: [
            {
                "userFullName": "Gandalf Ossian",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "userFullName": "Nimue Gyneth",
                status: "waiting",
                comment: "Waiting"
            }
        ]
    },
    {
        step: 5,
        invoiceApprovalDetailsList: [
            {
                "userFullName": "Launce Artaxerxes",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "userFullName": "Alphege Aminta",
                status: "waiting",
                comment: "Waiting"
            },
            {
                "userFullName": "Tristan Merry",
                status: "waiting",
                comment: "Waiting"
            }
        ]
    }

];

var graphConfig = {
    xStep: 250,
    xStep: 250,
    yStep: 50,
    minZoom: 0.5,
    maxZoom: 3,
    maxGraphWidth: 900,
    maxGraphHeight: 400
};

var i, j; //variables used for iterating

/**
 *
 * @param data
 * @returns {Array}
 */
function prepareData(data) {
    var stepLevel = 0;
    var newServerData = [];
    for (i = 0; i < data.length; i++) {
        // data[i]stepLevel = stepLevel;
        for (var j = 0; j < data[i].invoiceApprovalDetailsList.length; j++) {
            newServerData.push({
                stepLevel: stepLevel,
                userFullName: data[i].invoiceApprovalDetailsList[j].userFullName,
                status: data[i].invoiceApprovalDetailsList[j].status,
                comment: data[i].invoiceApprovalDetailsList[j].comment
            });
        }
        stepLevel++;
    }

    return newServerData;
} //closing prepareDataFunction

var newServerData = prepareData(serverData);

var serverNodes = [];
var serverEdges = [];
var severNodesLevels = [];
var nodesPerCategory = {};
var stepsArray = [];
var maxNodesPerLevel = 0;

function prepareNodesAndEdges() {
    //counting steps
    for (i = 0; i < newServerData.length; i++) {
        if (severNodesLevels.indexOf(newServerData[i].stepLevel) === -1) {
            severNodesLevels.push(newServerData[i].stepLevel);
            stepsArray.push('lvl' + newServerData[i].stepLevel);
        }
    }

    for (i = 0; i < severNodesLevels.length; i++) {
        serverNodes.push(
            {
                data: {
                    id: "lvl" + severNodesLevels[i],
                    type: "level"
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


    if (newServerData.length > 1) {
        for (i = 0; i < stepsArray.length - 1; i++) {
            serverEdges.push({
                data: {
                    id: stepsArray[i] + "-" + stepsArray[i + 1],
                    source: stepsArray[i],
                    target: stepsArray[i + 1]
                },
                classes: "cy-node" ///TODO: finish this implementation
            })
            ;
        }
    }

}

prepareNodesAndEdges();

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
        maxNodesPerLevel = iterator;
    }

    return yPosition;
}

function assignNodesPostionAndParent() {
    for (i = 0; i < newServerData.length; i++) {
        serverNodes.push(
            {
                data: {
                    id: "node" + "-" + i,
                    type: "node",
                    userFullName: newServerData[i].userFullName,
                    comment: newServerData[i].comment,
                    status: newServerData[i].status,
                    parent: (newServerData.length > 1) ? serverNodes[newServerData[i].stepLevel]["data"]["id"] : null //gests the id of the corresponding step if there is more than one node
                },
                position: {
                    x: newServerData[i].stepLevel * graphConfig.xStep,
                    y: generateYPosition(newServerData[i].stepLevel)
                },
                selected: false, // whether the element is selected (default false)

                selectable: false, // whether the selection state is mutable (default true)

                locked: true, // when locked a node's position is immutable (default false)

                grabbable: false, // whether the node can be grabbed and moved by the userFullName

                classes: "node tooltip " + newServerData[i].status
            }
        );
    }

    // console.log(newServerData);
}

assignNodesPostionAndParent();

var cy;

function initCy() {

    $('#cyContainer').width(Math.min((severNodesLevels.length * 200), graphConfig.maxGraphWidth) + 50);
    $('#cyContainer').height(Math.min((maxNodesPerLevel + 1) * 100, graphConfig.maxGraphHeight) + 50);


    cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        style: [
            {
                selector: 'node',
                css: {
                    'content': 'data(userFullName)',
                    "text-margin-y" : 10,
                    'text-halign': 'center',
                    'text-valign': 'bottom',
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
                    'border-width': "2px"
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
                css: { //TODO:add padding for labels
                    'border-color': "gray",
                    'border-width': "1px"

                }
            },
            {
                selector: '.node.statusApproved',
                css: {
                    'background-color': '#02BFB3',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black'
                }
            },
            {
                selector: '.node.statusRejected',
                css: {
                    'background-color': '#F44336',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black'
                }
            },
            {
                selector: '.node.statusApprovalRequested',
                css: {
                    'background-color': '#FFC107',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black'
                }
            },
            {
                selector: '.node.statusOnHold',
                css: {
                    'background-color': '#AAAAAA',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black'
                }
            },
            {
                selector: '.node.statusApprovalNotReady',
                css: {
                    'background-color': '#dedede',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black'
                }
            },

            {
                selector: '.cy-node', //TODO: finish this
                css: {}
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


    cy.minZoom(graphConfig.minZoom);
    cy.maxZoom(graphConfig.maxZoom);

    cy.zoom({
        level: 0.7 // the zoom level
    });

    cy.panBy({
        x: 50,
        y: 0
    });

}

initCy();

function initPanzoom() {
    // if(serverData.length>1){

    var panzoomSetting = {
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
        sliderHandleIcon: 'panzoomMinus',
        zoomInIcon: 'panzoomPlus',
        zoomOutIcon: 'panzoomMinus',
        resetIcon: 'panzoomExpand'
    };

    cy.panzoom(panzoomSetting);
    // }

}

initPanzoom();

function renderNodesTemplates() {
    cy.ready(function (event) {
        cy.nodeHtmlLabel(
            [
                {
                    tpl: function (data) {
                        var comment = data.comment ? '<li>' + data.comment + '</li>' : "";
                        var status = data.status ? '<li>' + $filter('translate')(data.status) + '</li>' : "";

                        if (data.type === "node" && (comment || status)) {
                            return '<span id="tooltipsterCy' + data.id + '" ' +
                                '       title="<ul ' + 'class=\'tooltipsterCyLabelList\'' + '>' + comment + status + '</ul>" ' +
                                '     </span>';
                        }
                        return '<span title=" + data.id + "></span>';
                    }
                }
            ]
        );
    });

}

renderNodesTemplates();

initTooltips();

function initTooltips() {
    cy.on('mouseover', 'node', function () {
        var tooltip = tooltipService.init($('#tooltipsterCy' + this.data("id")), {contentAsHTML: true});
        tooltip.tooltipster('open');

    });

    cy.on('mouseout', 'node', function () {
        $('#tooltipsterCy' + this.data("id")).tooltipster('close');

    });
}