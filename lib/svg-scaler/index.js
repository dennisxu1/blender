var eventStream = require('event-stream');
var SVGTranslator = require('./lib/SVGTranslator');

module.exports = svgScaler;

function svgScaler(options, oneX) {
    var svgTranslator = new SVGTranslator(options, oneX || 120);
    return eventStream.map(function (file, callback) {
        if (file.isBuffer()) {
            svgTranslator.parser(String(file.contents))
                .then(function (data) {
                    file.contents = new Buffer(data);
                    callback(null, file);
                });
        }
    });
}
