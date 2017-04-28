var work = function () {
    console.log('working hard');
};


var doWork = function (f) {
    console.log('starting');

    try {
        f();
    }
    catch (ex) {
        console.error(ex);
    }
    console.log('end');

};

doWork(work);