///<reference path='../../_all.d.ts'/>
///<reference path='../../d.ts/vendor/node.d.ts'/>
///<reference path='../../d.ts/vendor/underscore.d.ts'/>
///<reference path='../../d.ts/interfaces.d.ts'/>
var dto = require("./testDto");

var _ = require('underscore')._;
var Parsimmon = require('parsimmon');

var regex = Parsimmon.regex;
var str = Parsimmon.string;
var optWhitespace = Parsimmon.optWhitespace;

var HaskellParser = (function () {
    function HaskellParser() {
    }
    HaskellParser.prototype.parse = function (contents) {
        var testFixture = new dto.TestFixtureDto();

        testFixture.fixtureName = "test";
        testFixture.tests = _.range(Math.floor((Math.random() * 100) + 1)).map(function (i) {
            return new dto.TestDto().withLineNum(Math.random()).withName(Math.random().toString());
        });

        return [testFixture];
    };

    HaskellParser.prototype.parseReal = function (contents) {
        var id = function (i) {
            return i;
        };

        var testKeyword = str("[TEST]");

        var between = function (parser, a, b) {
            return str(a).then(parser).skip(str(b)).map(function (result) {
                return result;
            });
        };

        var haskellSuffix = str(".hs");
        var running = str("RUNNING...");
        var colon = str(":");

        var word = regex(/^([A-Z]|[a-z]|[0-9])*/);

        var testSuite = str("Test suite").skip(optWhitespace).then(word).skip(colon).skip(optWhitespace).skip(running).skip(optWhitespace).map(id);

        var testName = testKeyword.skip(optWhitespace).skip(str("TestFixtures")).skip(colon).then(word).map(id);

        var fileName = regex(/^.*\.hs/).map(id);

        var fileNameWithNumber = fileName.skip(colon).then(function (name) {
            return Parsimmon.digits.map(function (d) {
                return {
                    fileName: name,
                    lineNumber: d
                };
            });
        });

        var sourceFile = optWhitespace.then(between(fileNameWithNumber, "(", ")"));

        var testEntry = testName.then(function (name) {
            return sourceFile.map(function (sourceInfo) {
                return {
                    testName: name,
                    source: sourceInfo
                };
            });
        });

        var file = testSuite.then(function (suite) {
            return testEntry.map(function (name) {
                return [suite, name];
            });
        });

        return file.parse(contents);
    };
    return HaskellParser;
})();
exports.HaskellParser = HaskellParser;
//# sourceMappingURL=haskell.js.map
