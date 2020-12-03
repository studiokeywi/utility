const settle = mode => async promises =>
  (await Promise.allSettled(promises))
    .map(({ reason, status, value }) =>
      !mode
        ? { result: value || reason }
        : mode !== status
        ? void 0
        : mode === 'fulfilled'
        ? { result: value }
        : mode === 'rejected'
        ? { result: reason }
        : void 0
    )
    .filter(Boolean);
const all = settle();
const rejected = settle('rejected');
const resolved = settle('fulfilled');

export default { all, rejected, resolved };
export { all, rejected, resolved };
