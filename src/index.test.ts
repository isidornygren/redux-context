import { createUiContext } from ".";
import { mapContextToProps } from "./utils";

describe('createUiContext', () => {
	describe('reducer', () => {
		const { reducer, setAction, mergeAction, clearAction  } = createUiContext<{first: string, second: string}>('testReducer', 'TEST_REDUCER', state => state.testReducer);

		it('should return state by default', () => {
			const state = {first: 'First', second: 'Second'};
			expect(reducer(state, { type: 'UNKNOWN_ACTION' })).toEqual(state);

		});

		it('setAction should set state from payload', () => {
			const testObject = {first: 'First', second: 'Second'};
			expect(reducer(null, setAction(testObject))).toEqual(testObject);
		});

		it('mergeAction should merge state from payload', () => {
			expect(reducer({first: 'First', second: 'Second'}, mergeAction({second: 'Third'}))).toEqual({first: 'First', second: 'Third'});
		});

		it('clearAction should clear state to null', () => {
			expect(reducer({first: 'First', second: 'Second'}, clearAction())).toEqual(null);
		});

		it('clearAction should clear state to defaultValue if provided', () => {
			const defaultValue = {first: 'default', second: 'value'};
			const { reducer: newReducer, clearAction: newClearAction  } = createUiContext<{first: string, second: string}>('testReducer', 'TEST_REDUCER', state => state.testReducer, defaultValue);

			expect(newReducer({first: 'First', second: 'Second'}, newClearAction())).toEqual(defaultValue);
		});
	});
})

describe('mapContextToProps', () => {
	it('should create a normalized object from a list of contexts', () => {
		const firstReducer = createUiContext<{first: string, second: string}>('firstReducer', 'FIRST_REDUCER', state => state.testReducer);
		const secondReducer = createUiContext<{first: string, second: string}>('secondReducer', 'SECOND_REDUCER', state => state.testReducer);
		const thirdReducer = createUiContext<{first: string, second: string}>('thirdReducer', 'THIRED_REDUCER', state => state.testReducer);

		const something = mapContextToProps(firstReducer, secondReducer, thirdReducer);
	});
});