module.exports = lazyload;

let inViewport = require('in-viewport');
let lazyAttrs = ['data-src'];

global.lzld = lazyload();
global.inViewport = inViewport;

// Provide libs using getAttribute early to get the good src
// and not the fake data-src
replaceGetAttribute('Image');
replaceGetAttribute('IFrame');

const registerLazyAttr = attr => {
    if (indexOf.call(lazyAttrs, attr) === -1) {
        lazyAttrs.push(attr);
    }
}

function lazyload(opts) {
    opts = merge({
        'offset': 333,
        'src': 'data-src',
        'container': false
    }, opts || {});

    if (typeof opts.src === 'string') {
        registerLazyAttr(opts.src);
    }

    let elts = [];

    const show = elt => {
        let src = findRealSrc(elt);

        if(src) {
            elt.src = src;
        }

        elt.setAttribute('data-lzled', true);
        elts[indexOf.call(elts, elt)] = null;
    }

    const findRealSrc = elt => {
        if (typeof opts.src === 'function') {
            return opts.src(elt);
        }

        return elt.getAttribute(opts.src);
    }

    const register = elt => {
        // unsubscribe onload
        // needed by IE < 9, otherwise we get another onload when changing the src
        elt.onload = null;
        elt.removeAttribute('onload');

        elt.onerror = null;
        elt.removeAttribute('onerror');

        if (indexOf.call(elts, elt) === -1) {
            inViewport(elt, opts, show);
        }
    }

    return register;
}

function replaceGetAttribute(elementName) {
    let fullname = 'HTML' + elementName + 'Element';
    if (fullname in global === false) {
        return;
    }

    let original = global[fullname].prototype.getAttribute;
    global[fullname].prototype.getAttribute = function(name) {
        if (name === 'src') {
            let realSrc;
            for (let i = 0, max = lazyAttrs.length; i < max; i++) {
                realSrc = original.call(this, lazyAttrs[i]);
                if (realSrc) {
                    break;
                }
            }

            return realSrc || original.call(this, name);
        }

        // our own lazyloader will go through theses lines
        // because we use getAttribute(opts.src)
        return original.call(this, name);
    };
}

const merge = (defaults, opts) => {
    for (let name in defaults) {
        if (typeof opts[name] === 'undefined') {
            opts[name] = defaults[name];
        }
    }

    return opts;
}

// http://webreflection.blogspot.fr/2011/06/partial-polyfills.html
const indexOf = value => {
    for (let i = this.length; i-- && this[i] !== value;) {}
    return i;
}
