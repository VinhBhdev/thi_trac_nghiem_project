import { getAllQuestionsByEnterContestIdApi } from "@/apis/questions";
import { getAllQuestionsBySubjectIdApi } from "@/apis/admin"
// import { getAllUserApi, createUserApi, removeUserApi, editUserApi } from "@/apis/users";

const state = () => {
    return {
        questionsArray: [],
        answered: []
    }
}
const getters = {
    getNumberOfQuestions(state) {
        if (state.questionsArray)
            return state.questionsArray.length;
        return 0;
    },
    getNumberOfSelectedAnwers(state) {
        return state.answered.reduce((sum, item) => {
            if (item) sum++;
            return sum;
        }, 0);
    },
    getAllQuestions(state) {
        return state.questionsArray;
    }
}
const mutations = {
    addAnswerMutation(state, obj) {
        if (state.answered[obj.questionNumber]) {
            state.answered[obj.questionNumber].answer = obj.answer;
            if (obj.answer.length === 0) {
                state.answered.splice(obj.questionNumber, 1, '')
            }
        }
        else state.answered[obj.questionNumber] = obj;
    },
    setQuestionsArrayMutation(state, data) {
        state.questionsArray = data;
        console.log(">>>mutation")
        console.log(state.questionsArray);
    }
}
const actions = {
    addAnswerAction(context, obj) {
        context.commit("addAnswerMutation", obj)
    },
    async getAllQuestionsByEnterContestIdAction(context, enterContestId) {
        try {
            console.log(">>>action");
            console.log(enterContestId);
            let result = await getAllQuestionsByEnterContestIdApi(enterContestId);
            context.commit("setQuestionsArrayMutation", result.data);
            console.log(result.data);
        } catch (error) {
            return error.response.data.message;
        }
    },
    async getAllQuestionsBySubjectIdAction(context, subjectId) {
        try {
            let result = await getAllQuestionsBySubjectIdApi(subjectId);
            console.log(">>>action");
            console.log(result.data);
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    },
    clearStateInfo(context) {
        context.state.questionsArray = [];
        context.state.answered = []
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}