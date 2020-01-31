// TODO: Unpack & document
// TODO: Section as appropriate
const Proletariat = ele => {
    const all = el => el.classList;

    const add = (el, ...clazz) => all(el).add(...clazz);
    const has = (el, clazz) => all(el).contains(clazz);
    const remove = (el, ...clazz) => all(el).remove(...clazz);
    const replace = (el, oldClazz, newClazz) => all(el).replace(oldClazz, newClazz);
    const toggle = (el, clazz, force) => all(el).toggle(clazz, force);

    const Proletariat = {
        add,
        all,
        has,
        remove,
        replace,
        toggle
    };

    return Object.entries(Proletariat).reduce((Proletariat, [prop, fn]) => {
        const bindVals = ele instanceof Element ? [fn, ele] : [ele];
        Proletariat[prop] = fn.bind(...bindVals);
        return Proletariat;
    }, {});
};

export default Proletariat;
