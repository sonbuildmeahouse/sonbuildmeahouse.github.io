//test


$.handlebars({
    templatePath: '/templates/',
    templateExtension: 'hbs'
});
Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});


Handlebars.registerHelper('setVariable', function (varName, varValue, options) {
    options.data.root[varName] = varValue;
});



Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('eachIndex', function(array, options) {
    var result = '';
    for (var i = 0; i < array.length; i++) {
        result += options.fn({item: array[i], index: i});
    }
    return result;
});


(function (document) {
    var metas = document.getElementsByTagName('meta'),
        changeViewportContent = function (content) {
            for (var i = 0; i < metas.length; i++) {
                if (metas[i].name == "viewport") {
                    metas[i].content = content;
                }
            }
        },
        initialize = function () {
            changeViewportContent("width=device-width, minimum-scale=1.0, maximum-scale=1.0");
        },
        gestureStart = function () {
            changeViewportContent("width=device-width, minimum-scale=0.25, maximum-scale=1.6");
        },
        gestureEnd = function () {
            initialize();
        };


    if (navigator.userAgent.match(/iPhone/i)) {
        initialize();

        document.addEventListener("touchstart", gestureStart, false);
        document.addEventListener("touchend", gestureEnd, false);
    }
})(document);
//why
$(document).ready(function () {
    $('#toc').toc(
        {
            title: '<i>Table of Contents</i>', minimumHeaders: 1
        }
    );

    console.log('im here');

    //bigfootjs
    $.bigfoot({actionOriginalFN: "ignore"});


    $('#calendar').fullCalendar({
        displayEventTime: false, // don't show the time column in list view

        googleCalendarApiKey: 'AIzaSyC1uRNqRN5Pig8GMxY5KLxJRQkhyBfnlfY',
        events: {
            googleCalendarId: 'fq1259fdec53lmurlmvnjcdmug@group.calendar.google.com',
            className: 'gcal-event' // an option!
        },
        eventRender: function(event, element) {
            // element.qtip({
            //     content: event.description
            // });
            console.log(element);
            console.log('i am split');


            var readings = event.description.split(",");
            $.each(readings,function(i){
                console.log('*******');
                console.log(readings[i]);
            });

            //element.html('<strong>'+event.description+'</strong>');

            element.render('publicreading-calendar', {
                torah: readings[0],
                prophets: readings[1],
                newTestament: readings[2],
                psalms: readings[3]
            });
        },
        eventClick: function(event) {
            console.log(event);


            // opens events in a popup window
            window.open(event.url, 'gcalevent', 'width=700,height=600');
            return false;
        },
        defaultView:'listMonth'
    });

});
