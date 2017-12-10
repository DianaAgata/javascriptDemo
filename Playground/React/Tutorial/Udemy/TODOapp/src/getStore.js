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
    return state;
};

export default () => createStore(reducer);