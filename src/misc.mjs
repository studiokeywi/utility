/**@param {{apiMasterList: *, propDelim: string|RegExp, pathDelim: string|RegExp}} config */
const createAPITool = ({ apiMasterList = {}, propDelim = '_', pathDelim = '\\$' }) => {
  if ('string' === typeof pathDelim) {
    pathDelim = RegExp(pathDelim, 'g');
  }
  if ('string' === typeof propDelim) {
    propDelim = RegExp(propDelim);
  }
  const fetchModes = ['arrayBuffer', 'blob', 'formData', 'json', 'text'];

  return new Proxy(
    {},
    {
      get: (_, request) => {
        const [api, mode, endpoint] = request.split(propDelim);
        if (!apiMasterList?.[api]) return `${api} is not in our API database`;
        return async (...args) => {
          try {
            return await (await fetch(`${apiMasterList[api]}${endpoint.replace?.(pathDelim, '/') ?? ''}`))[
              fetchModes.find(m => m === mode) ?? 'blob'
            ]();
          } catch (error) {
            console.error(error);
            return error;
          }
        };
      },
    }
  );
};

// const apiTest = async () => {
//   let apiTool = createAPITool({
//     apiMasterList: {
//       gw2: 'https://api.guildwars2.com/',
//       wiki: 'https://en.wikipedia.org/api/rest_v1/',
//     },
//   });
//   console.log(await apiTool.gw2_json_v2$items$12345('test 1'));
//   apiTool = createAPITool({
//     apiMasterList: {
//       gw2: 'https://api.guildwars2.com/',
//       wiki: 'https://en.wikipedia.org/api/rest_v1/',
//     },
//     propDelim: /\|/,
//   });
//   console.log(await apiTool['gw2|json|v2/items/12345']('test 2'));
// };

const monkeyPatch = obj => data => void Object.assign(obj.prototype, data);

export default { createAPITool, monkeyPatch };
export { createAPITool, monkeyPatch };
