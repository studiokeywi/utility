// TODO: Unpack & document
// TODO: Section as appropriate
const Snickerdoodle = doc => {
    if (!(doc instanceof HTMLDocument)) {
        throw new TypeError('Cannot create Snickerdoodle for a non-HTMLDocument');
    }

    const all = () => doc.cookie.split(/;\s+/).map(cookie => cookie.split(/=/));

    const make = (name, data) => {
        if (data === null || data === undefined) {
            const expires = new Date();
            expires.setDate(expires.getDate() + 1);
            data = {
                expires: new Date(expires).toUTCString()
            };
        }
        if (typeof data === 'object') {
            data = Object.entries(data).reduce((str, [prop, val]) => {
                if (prop === 'value') {
                    str = `${val}${str}`;
                } else {
                    if (['secure', 'samesite']) {
                        str += `;${prop}`;
                    } else {
                        str += `;${prop}=${encodeURIComponent(val)}`;
                    }
                }
                return str;
            }, '');
        } else if (typeof data === 'string') {
            data = encodeURIComponent(data);
        }
        doc.cookie = `${name}=${data}`;
    };
    const has = name => all().some(([cName]) => cName.match(name));
    const get = name => (has(name) ? all().find(([cName]) => cName === name) : undefined);
    const remove = name => {
        if (has(name)) {
            make(name, { expires: new Date().toUTCString(), 'max-age': 0 });
        }
    };

    const Snickerdoodle = {
        all,
        get,
        has,
        make,
        remove
    };

    return Snickerdoodle;
};

export default Snickerdoodle;
