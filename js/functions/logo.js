/**
 * Logo template function.
 * Returns HTML to display the logo graphic stored in the graphics folder.
 *
 * Usage:
 *
 * ${logo()}
 *
 * @param useVector
 *   Whether a vector version of the logo in the graphics folder should be used.
 *   Defaults to false, because only graphics/logo.png exists; pass true once a
 *   graphics/logo.svg is added.
 * @returns {string}
 */
function logo(useVector = false) {
    return useVector ? vector('logo') : raster('logo');
}
