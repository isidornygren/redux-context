import { AnyAction } from 'redux';
import { Selector, createSelector } from 'reselect';
import { createContextActionSet } from './utils';

export { mapContextToProps } from './utils';

export function createUiContext<T>(
  name: string,
  actionType: string,
  rootSelector: Selector<any, any>,
  defaultState?: T
) {
  const actionSet = createContextActionSet(actionType);
  return {
    _name: name,
    reducer: (
      state: T | null = defaultState || null,
      action: AnyAction
    ): T | null => {
      switch (action.type) {
        case actionSet.SET: {
          return action.payload;
        }
        case actionSet.MERGE: {
          // Could do a deep merge here if we wanted to
          return {
            ...state,
            ...action.payload,
          };
        }
        case actionSet.CLEAR: {
          return defaultState || null;
        }
        default: {
          return state;
        }
      }
    },
    selector: createSelector(rootSelector, root => root[name]),
    setAction: (payload: T) => ({
      type: actionSet.SET,
      payload,
    }),
    mergeAction: (payload: Partial<T>) => ({
      type: actionSet.MERGE,
      payload,
    }),
    clearAction: () => ({
      type: actionSet.CLEAR,
    }),
    [actionType]: actionSet,
  };
}
