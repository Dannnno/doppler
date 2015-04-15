// Code borrowed from http://stackoverflow.com/a/4256130/3076272
// Used to better enable string formatting
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function pickRandomNumber(cap) {
    cap = (cap === undefined) ? 4 : cap;
    return Math.floor((Math.random() * cap));
}

function pickStartValue() {
    return (pickRandomNumber(10) < 8) ? 2 : 4;
}

function getColor(value) {
    switch (value) {
        case undefined:
            return "#CCCCCC";
        case null:
            return "#CCCCCC";
        case 2:
            return "white";
        case 4:
            return "#FFCC99";
        case 8:
            return "#FF9933";
        case 16:
            return "#FF6600";
        case 32:
            return "#FF3300";
        case 64:
            return "#FF0000";
        case 128:
            return "#FFFF99";
        case 256:
            return "#FFFF66";
        case 512:
            return "#FFFF00";
        case 1024:
            return "#FFCC00";
        case 2048:
            return "#FF9900";
        case 4096:
            return "#CC5200";
        case 8192:
            return "#66FF99";
    }
}
