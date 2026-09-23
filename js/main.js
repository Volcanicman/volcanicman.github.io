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

    // The theme's scroll script is not part of this site, so nothing adds
    // `fixed-header-on` to the body. The header rules keyed on it (in css/main.css and
    // the theme) only apply once the page has scrolled away from the top.
    const scrolledPastTop = 50;
    function markScrolled() {
        jQuery('body').toggleClass('fixed-header-on', jQuery(window).scrollTop() > scrolledPastTop);
    }
    jQuery(window).on('scroll', markScrolled);
    markScrolled();

    // Below 800px the menu items live in a panel opened by the hamburger. The theme script that
    // wired it up is not part of this site, so use the theme's side menu plugin directly.
    const menuIcon = jQuery('#menu-icon');
    menuIcon.themifySideMenu({ close: '#menu-icon-close' });
    jQuery('#main-nav a').on('click', function() {
        menuIcon.themifySideMenu('hide');
    });
    // The theme's anchor scrolling stops `scrollOffset` pixels above the section. Below 800px the
    // fixed bar covers the top of the viewport, so stop below it instead of under it.
    const desktopScrollOffset = tbScrollHighlight.scrollOffset;
    function syncMenu() {
        if (window.innerWidth >= 800) {
            menuIcon.themifySideMenu('hide');
            tbScrollHighlight.scrollOffset = desktopScrollOffset;
        } else {
            tbScrollHighlight.scrollOffset = jQuery('#headerwrap').outerHeight();
        }
    }
    jQuery(window).on('resize', syncMenu);
    syncMenu();

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
