import { ContextActionSet, ReduxContext } from './types';

export function createContextActionSet(actionName: string): ContextActionSet {
  return {
    CLEAR: `${actionName}_CLEAR`,
    MERGE: `${actionName}_MERGE`,
    SET: `${actionName}_SET`,
  };
}

export function mapContextToProps <S>(...args: ReduxContext<any>[]){
	return function (state: S) {
		return args.reduce(
			(memo, context) => (
				{...memo, [context._name]: context.selector(state)}
			), {});
	}
};
