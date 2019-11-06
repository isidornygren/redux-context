interface ReduxContextProps<T> {
  actionType: string;
  defaultState?: T;
}

interface ContextActionSet {
  CLEAR: string;
  MERGE: string;
  SET: string;
}

function createContextActionSet(actionName: string): ContextActionSet {
  return {
    CLEAR: `${actionName}_CLEAR`,
    MERGE: `${actionName}_MERGE`,
    SET: `${actionName}_SET`,
  };
}

function createUiContext<T>(
  actionType: string,
  rootSelector: Selector<any, any>,
  defaultState?: T
) {
  const actionSet = createContextActionSet(actionType);
  return {
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
    selector: createSelector(rootSelector, root => ),
    setAction: (payload: T) => ({
      type: actionSet.SET,
      payload,
    }),
    clearAction: () => ({
      type: actionSet.CLEAR,
    }),
    [actionType]: actionSet,
  };
}

function mapContextToProps(...args: ReduxContext[]) {}

export const UIContext = createUiContext<boolean>(
  'ACTIVITY_STATUS',
  state => state.ui,
  false
);
