import Vue from 'vue';
import App from './App'


new Vue({
    el: '#app',
    template: `<App :state="state"/>`,
    components: {App},
    data: {
        state: {
            showDone: false,
            todos: [
                {
                    "text": "Make pankakes",
                    done: false
                },
                {
                    "text": "Wash Dog",
                    done: false
                },
                {
                    "text": "Drink Coffe",
                    done: true
                }
            ]
        }
    }

});