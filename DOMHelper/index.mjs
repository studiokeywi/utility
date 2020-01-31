// TODO: Unpack & document
// TODO: Section as appropriate
// TODO: Provide minified versions(?)
import Alchemy from '../Alchemy/index.mjs';
import Proletariat from '../Proletariat/index.mjs';
import Snickerdoodle from '../Snickerdoodle/index.mjs';

const curry = (fn, ...args) => (fn.length <= args.length ? fn(...args) : (...more) => curry(fn, ...args, ...more));

const DOMHelper = doc =>
    doc instanceof HTMLDocument
        ? {
              Alchemy: Object.assign(Alchemy(doc), {
                  maker: new Proxy(curry(Alchemy(doc).make), {
                      get: (obj, prop) => (attrs = {}) => obj(prop)(attrs)
                  })
              }),
              Proletariat: Proletariat(),
              Snickerdoodle: Snickerdoodle(doc)
          }
        : {
              Alchemy,
              Proletariat,
              Snickerdoodle
          };

export default DOMHelper;
