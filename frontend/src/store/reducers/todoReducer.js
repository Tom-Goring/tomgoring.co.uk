import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  TODOS_LOADING,
} from "../actions/types";

const initialState = {
  todos: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case UPDATE_TODO:
      // TODO: Add functionality to edit todos
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === action.payload.id ? { ...action.payload } : todo
        ),
      };
    case TODOS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
