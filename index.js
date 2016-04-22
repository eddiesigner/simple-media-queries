var postcss = require('postcss');

// Default configuration.
var media_config = {
	'initialize': '1px',
	'small': '35.5em', // >= 568px @ 16px
	'medium': '48em', // >= 768px @ 16px
	'large': '64em', // >= 1024px @ 16px
	'extra-large': '80em' // >= 1280px @ 16px
};

/**
 * Make a configuration object with the user options.
 * @param  {Object} object
 * @return {Object}
 */
function copyProperties(object) {
	var new_object = {};

	for (var prop in object) {
		new_object[prop] = object[prop];
	}

	return new_object;
}

/**
 * Check if a object is empty.
 * @param  {Object}  object
 * @return {Boolean}
 */
function isEmpty(object){
  return (Object.getOwnPropertyNames(object).length === 0);
}

module.exports = postcss.plugin('simple-media-queries', function simpleMediaQueries(options) {

  return function(css) {

    options = options || {};

    if (!isEmpty(options)) {
    	media_config = copyProperties(options);
    }

    css.walkRules(function(rule) {
    	rule.walkDecls(function(decl, i) {
    		var param = decl.parent.params;

    		if (param != undefined) {
    			if (param.indexOf('mq(') !== -1) {
    				var media_requested = param.match(/"[^\\"\n]*(\\["\\][^\\"\n]*)*"|'[^\\'\n]*(\\['\\][^\\'\n]*)*'|\/[^\\\/\n]*(\\[\/\\][^\\\/\n]*)*\//)[0].replace(/["']/g, "");
    				var media_string = 'only screen and ( min-width: ' + media_config[media_requested] + ' )';

    				// Return the media query as param.
    				decl.parent.params = media_string;
    			}
    		}
    	});
    });

  }

});
