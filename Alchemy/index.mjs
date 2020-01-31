// TODO: Document
const Alchemy = doc => {
    if (!(doc instanceof HTMLDocument)) {
        throw Error('Cannot create Alchemy for a non-HTMLDocument');
    }

    // SECTION: Internal functions
    const coerce = ele => (typeof ele === 'string' ? qs(ele) : ele);

    // SECTION: Alchemy Functions
    const update = (ele, attrs) => {
        ele = coerce(ele);
        attrs = !(attrs === null || attrs === undefined) ? attrs : {};
        Object.entries(attrs).forEach(([attr, value]) => {
            ele.setAttribute(attr, value);
        });

        return ele;
    };
    const make = (tag, attrs) => {
        const ele = doc.createElement(tag);

        return update(ele, attrs);
    };
    const get = (ele, selector) => {
        return coerce(ele).querySelector(selector);
    };
    const qs = selector => {
        return get(doc, selector);
    };
    const getAll = (ele, selector) => {
        return coerce(ele).querySelectorAll(selector);
    };
    const qsAll = selector => {
        return getAll(doc, selector);
    };
    const changeInnerHTML = (ele, text, append = false) => {
        ele = coerce(ele);
        if (append) {
            ele.innerHTML += text;
        } else {
            ele.innerHTML = text;
        }
    };
    const changeText = (ele, text, append = false) => {
        ele = coerce(ele);
        if (append) {
            ele.innerText += text;
        } else {
            ele.innerText = text;
        }
    };
    const addToEle = (dest, ele) => {
        dest = coerce(dest);
        dest.appendChild(coerce(ele));

        return dest;
    };
    const handle = (ele, type, handler) => {
        ele = coerce(ele);
        ele.addEventListener(type, handler);

        return ele;
    };
    const remove = ele => {
        ele = coerce(ele);
        return ele.parentNode.removeChild(ele);
    };
    const removeAll = ele => {
        ele = coerce(ele);
        [...ele.children].forEach(remove);
        return ele;
    };

    // SECTION: Alchemizer (create a miniature version of Alchemy specific to a given element)
    const alchemize = source => {
        if (source && source.source) {
            ({ source } = source);
        }
        source = coerce(source);
        if (!(source instanceof Node)) {
            throw Error('Cannot create Chainer for a non-Node');
        }
        const Alchemizer = {
            source,
            get: selector => {
                return alchemize(get(selector));
            },
            add: {
                ele: ele => {
                    if (ele && ele.source) {
                        ({ source: ele } = ele);
                    }
                    addToEle(source, ele);

                    return Alchemizer;
                },
                HTML: html => {
                    changeInnerHTML(source, html, true);

                    return Alchemizer;
                },
                text: text => {
                    changeText(source, text, true);
                }
            },
            update: {
                attrs: attrs => {
                    update(source, attrs);

                    return Alchemizer;
                },
                HTML: html => {
                    changeInnerHTML(source, html);

                    return Alchemizer;
                },
                text: text => {
                    changeText(source, text);

                    return Alchemizer;
                }
            },
            handle: (type, handler) => {
                handle(source, type, handler);

                return Alchemizer;
            }
        };

        return Alchemizer;
    };

    // SECTION: Helper Assemblage
    const Alchemy = {
        add: Object.assign(addToEle, {
            HTML: (ele, html) => changeInnerHTML(ele, html, true),
            text: (ele, text) => changeText(ele, text, true)
        }),
        alchemize,
        body: doc.body,
        frag: doc.createDocumentFragment.bind(doc),
        get: Object.assign(get, { all: getAll }),
        handle,
        head: doc.head,
        make,
        maker,
        qs: Object.assign(qs, { all: qsAll }),
        remove: Object.assign(remove, { all: removeAll }),
        update: Object.assign(update, {
            HTML: (ele, html) => changeInnerHTML(ele, html),
            text: (ele, text) => changeText(ele, text)
        })
    };

    return Alchemy;
};

export default Alchemy;
