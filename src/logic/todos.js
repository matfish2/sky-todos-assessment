export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';
export const DELETE_ITEM = 'qgo/assessment/DELETE_ITEM';
export const TOGGLE_COMPLETED = 'qgo/assessment/TOGGLE_COMPLETED';
export const TOGGLE_COMPLETED_VISIBILITY = 'qgo/assessment/TOGGLE_COMPLETED_VISIBILITY';


export const addItem = (content) => {
  return { type: ADD_ITEM, content };
};

export const deleteItem = (itemId) => {
  return {type: DELETE_ITEM, itemId};
}

export const toggleCompletedState = (itemId) => {
  return {type: TOGGLE_COMPLETED, itemId};
}

export const toggleCompletedVisibility = () => {
  return {type: TOGGLE_COMPLETED_VISIBILITY};
}


export const initialState = {
  showCompleted:true,
  items: [
    { id: 1, content: 'Call mum', completed: false },
    { id: 2, content: 'Buy cat food', completed: false },
    { id: 3, content: 'Water the plants', completed: false },
  ],
};

var items;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
      };

      return {
        ...state,
        items: [...state.items, newItem]
      };
      case DELETE_ITEM:
      items = state.items.filter(item=>item.id!==action.itemId);

      return {...state, items}
      case TOGGLE_COMPLETED:
      items = state.items.map(item=>
        (item.id === action.itemId)
        ? {...item, completed: !item.completed}
        : item
      )

      return {...state, items}
      case TOGGLE_COMPLETED_VISIBILITY:
      return {...state, showCompleted:!state.showCompleted}
    default:
      return state;
  }
};

export default reducer;
