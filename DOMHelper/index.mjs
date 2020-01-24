// TODO: Update to nullish when available
// TODO: Update documentation
/**
 * Creates a DOMHelper object
 * @param {HTMLDocument} doc
 */
const DOMHelper = doc => {
    if (!(doc instanceof HTMLDocument)) {
        throw Error('Cannot create DOMHelper for a non-HTMLDocument');
    }
    // SECTION: DOMHelper Functions
    /**
     * Updates the attributes on a given element
     * @param {Node} ele
     * @param {*} attrs
     * @return {Node} The updated element
     */
    const update = (ele, attrs) => {
        attrs = !((attrs === null) & (attrs === undefined)) ? attrs : {};
        Object.entries(attrs).forEach(([attr, value]) => {
            tag.setAttribute(attr, value);
        });

        return ele;
    };
    /**
     * Creates a new HTML element with the given attributes
     * @param {string} tag
     * @param {*} attrs
     * @return {HTMLElement} The new element
     */
    const make = (tag, attrs) => {
        const ele = doc.createElement(tag);

        return update(ele, attrs);
    };
    /**
     * Executes a querySelect on a given element
     * @param {HTMLElement} ele
     * @param {string} selector
     * @return {HTMLElement}
     */
    const get = (ele, selector) => {
        return ele.querySelector(selector);
    };
    /**
     * Executes a querySelect on the internal document
     * @param {string} selector
     */
    const qs = selector => {
        return get(doc, selector);
    };
    /**
     * Executes a querySelectAll on a given element
     * @param {HTMLElement} ele
     * @param {string} selector
     * @return {NodeList}
     */
    const getAll = (ele, selector) => {
        return ele.querySelectorAll(selector);
    };
    /**
     * Executes a querySelectAll on the internal document
     * @param {string} selector
     * @return {NodeList}
     */
    const qsa = selector => {
        return getAll(doc, selector);
    };
    /**
     * Adds an element to a destination
     * @param {HTMLElement} dest
     * @param {HTMLElement} ele
     * @return {HTMLElement} The destination element
     */
    const addToEle = (dest, ele) => {
        dest.appendChild(ele);

        return dest;
    };
    /**
     * Adds text to an element
     * @param {HTMLElement} ele
     * @param {string} text
     * @return {HTMLElement}
     */
    const addText = (ele, text) => {
        ele.append(text);

        return ele;
    };
    /**
     * Applies an event handler of a given type to a given element
     * @param {HTMLElement} ele
     * @param {string} type
     * @param {EventListener} handler
     * @return {HTMLElement} The handled element
     */
    const handle = (ele, type, handler) => {
        ele.addEventListener(type, handler);

        return ele;
    };
    /**
     * Removes an element from it's parent
     * @param {HTMLElement} ele
     * @return {HTMLElement}
     */
    const remove = ele => {
        return ele.parentNode.removeChild(ele);
    };
    // SECTION: Chainer
    // NOTE: Chainer allows a customized DOMHelper to apply to a given Node
    /**
     *  Creates a customized, limited scope DOMHelper to allow for chained method calls
     * @param {Node} source
     */
    const Chainer = source => {
        if (source && source.source) {
            ({ source } = source);
        }
        if (typeof source === 'string') {
            source = qs(source);
        }
        if (!(source instanceof Node)) {
            throw Error('Cannot create Chainer for a non-Node');
        }
        const chainer = {
            source,
            get: selector => {
                return Chainer(get(selector));
            },
            addTo: ele => {
                addToEle(source, ele);

                return chainer;
            },
            addText: text => {
                addText(source, text);

                return chainer;
            },
            update: attrs => {
                update(source, attrs);

                return chainer;
            },
            handle: (type, handler) => {
                handle(source, type, handler);

                return chainer;
            }
        };

        return chainer;
    };

    // SECTION: Proxies
    /**
     * Creates a new JS Proxy based on the given target and handler objects
     * @param {*} target
     * @param {ProxyHandler} handler
     */
    const proxify = (target, handler) => new Proxy(target, handler);
    const qsConversion = {
        apply: (target, thiss, [first, ...args]) => {
            if (typeof first === 'string') {
                first = qs(first);
            }

            return Reflect.apply(target, thiss, [first, ...args]);
        }
    };
    const propParser = {
        get: (target, prop) => {
            prop = prop.split(/_/);
            if (prop.length > 1) {
                const args = prop.slice(1);

                return Reflect.get(target, prop[0])(...args);
            }

            return Reflect.get(target, prop[0]);
        }
    };

    // SECTION: Helper Assemblage
    const Helper = Object.assign(Chainer, {
        make,
        qs,
        qsa,
        body: doc.body,
        head: doc.head,
        frag: doc.createDocumentFragment.bind(doc),
        get: proxify(get, qsConversion),
        getAll: proxify(getAll, qsConversion),
        addText: proxify(addText, qsConversion),
        addToEle: proxify(addToEle, qsConversion),
        update: proxify(update, qsConversion),
        handle: proxify(handle, qsConversion),
        remove: proxify(remove, qsConversion)
    });

    return proxify(Helper, propParser);
};

export { DOMHelper };
