import reducer, { initialState, addItem, deleteItem, toggleCompletedState, toggleCompletedVisibility } from '../todos';

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(mockState, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  it('should add new items on ADD_ITEM', () => {
    const state = {
      items: [{ id: 1, content: 'first' }, { id: 2, content: 'second' }],
    };
    const mockAction = addItem('third');
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
  });

  it('should delete an item on DELETE_ITEM', () => {
    const state = {
      items: [{ id: 1, content: 'first' }, { id: 2, content: 'second' }],
    };
    const mockAction = deleteItem(2);
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toEqual(1);
    expect(result.items[0].content).toEqual('first');
  });

  it('should toggle completed state on TOGGLE_COMPLETED', () => {
    const state = {
      items: [{ id: 1, content: 'first', completed: false }, { id: 2, content: 'second', completed:true }],
    };
    const complete = toggleCompletedState(1);
    const uncomplete = toggleCompletedState(2);
    
    const completeResult = reducer(state, complete);
    const uncompleteResult = reducer(state, uncomplete);
    
    expect(completeResult.items[0].completed).toBe(true);
    expect(uncompleteResult.items[0].completed).toBe(false);
  });

  it('should toggle completed visibility on TOGGLE_COMPLETED_VISIBILITY', () => {
    
    const state = {
      showCompleted: true,
      items: [{ id: 1, content: 'first', completed: false }, { id: 2, content: 'second', completed:true }],
    };

    const mockAction = toggleCompletedVisibility();
    
    const hideResult = reducer(state, mockAction);
    
    expect(hideResult.showCompleted).toBe(false);

    state.showCompleted = false;
    
    const showResult = reducer(state, mockAction);
    
    expect(showResult.showCompleted).toBe(true);
    
  });

});
