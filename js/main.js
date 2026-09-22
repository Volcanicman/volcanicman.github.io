let functions = {
    'photo': false,
    'raster': false,
    'vector': false,
    'logo': false,
    'icons': false,
};
let markdown = {};

/**
 * Stores given Markdown markup into the global markdown object.
 *
 * @param markup
 */
function md(markup) {
    const sectionName = document.currentScript.getAttribute('data-name').replace('_section', '');
    markdown[sectionName] = markup;
}

jQuery(window).ready(function() {

    // Load template functions.
    const functionKeys = Object.keys(functions);
    functionKeys.forEach(function(func) {
        if (jQuery('script[data-name=' + func +'_function]').length) {
            return;
        }
        const script = document.createElement('script');
        script.src = 'js/functions/' + func + '.js';
        script.setAttribute('async', true);
        script.setAttribute('data-name', func + '_function');
        document.body.appendChild(script);
        script.onload = function() {
            settleHelper(func);
        };
        script.onerror = function() {
            settleHelper(func);
        };
    });

    function helpersReady() {
        return Object.keys(functions).every(function(name) {
            return functions[name];
        });
    }

    function settleHelper(func) {
        functions[func] = true;
        if (helpersReady()) {
            allFunctionsLoaded();
        }
    }

    // Load section Markdown into the index page.
    function allFunctionsLoaded() {
        jQuery('.section').each(function (i, e) {
            const section = e.id;
            if (jQuery('script[data-name=' + section +'_section]').length) {
                return;
            }

            const template = 'templates/' + section + '.md.js';
            const script = document.createElement('script');
            script.src = template;
            script.setAttribute('data-name', section + '_section');
            script.setAttribute('async', true);
            document.body.appendChild(script);
            script.onload = scriptLoaded;
            script.onerror = scriptLoaded;

            function scriptLoaded() {
                if (section in markdown) {
                    jQuery('#' + section)[0].innerHTML = marked.parse(markdown[section]);
                }
                else {
                    jQuery('#' + section)[0].innerHTML = '<pre>' + template + '</pre> load error';
                }
            }
        });
    }
});
