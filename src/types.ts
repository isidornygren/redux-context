import { AnyAction } from 'redux';

export interface ContextActionSet {
  CLEAR: string;
  MERGE: string;
  SET: string;
}

export interface ReduxContext<T, S = {}> {
  _name: string;
  selector: (state: S) => T;
  reducer: (state: T | null, action: AnyAction) => T | null;
  setAction: (payload: T) => AnyAction;
  mergeAction: (payload: T) => AnyAction;
  clearAction: () => AnyAction;
}