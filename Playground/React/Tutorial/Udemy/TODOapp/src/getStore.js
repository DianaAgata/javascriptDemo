import guid from 'guid';
import { createStore } from 'redux';

const todos = [
    {
        id: guid.raw(),
        text: "colect Wood",
        done: false
    },
    {
        id: guid.raw(),
        text: "Drink Coffee",
        done: true
    },
    {
        id: guid.raw(),
        text: "Wash Dogo",
        done: false
    }
];

const defaultState = {
    todos,
    showDone: true
};

const reducer = (state = defaultState, action) => {
    console.log(action);
    const { type,todo } = action;

    if(type === 'SUBMIT_TODO'){
        state = {
            ... state,
            todos: [...state.todos,todo]
        };
    }

    if(type === 'UPDATE_TODO'){
        state = {
            ... state,
            todos: state.todos.map(_todo =>_todo.id === todo.id ? todo : _todo)
        };
    }
    return state;
};

export default () => createStore(reducer);