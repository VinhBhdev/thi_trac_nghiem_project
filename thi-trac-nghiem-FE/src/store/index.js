import { createStore } from 'vuex';
import courses from './modules/courses.js';
import questions from './modules/questions.js';
import auth from './modules/auth.js';
import addQA from './modules/addQA.js';
import subjects from './modules/subjects.js'
import contest from './modules/contest.js'
import addContest from './modules/addContest.js'
const store = createStore({
    modules: {
        courses,
        questions,
        auth,
        addQA,
        subjects,
        contest,
        addContest
    }
})

export default store;