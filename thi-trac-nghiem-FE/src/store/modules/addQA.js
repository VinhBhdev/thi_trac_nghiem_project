import { addQAApi, uploadWordFileApi } from "@/apis/addQA";
const state = () => {
    return {
        subjectId: 1,
        question: '',
        answersList: [],
        resultQuestion: [],
        typeOfQuestion: 'radio',
        topic: '',
    }
}
const getters = {

    getQA(state) {
        return {
            subjectId: state.subjectId,
            question: state.question,
            answersList: state.answersList,
            resultQuestion: state.resultQuestion,
            typeOfQuestion: state.typeOfQuestion,
            topic: state.topic,
        }
    }
}
const mutations = {
    addAnswerMutation(state, TheAnswer) {
        state.answersList[TheAnswer.answerNum] = TheAnswer.answerContent;
    },
    addQuestionMutation(state, question) {
        state.question = question;
    },
    addSubjectIdMutation(state, id) {
        state.subjectId = id;
    },
    addTopicMutation(state, topic) {
        state.topic = topic;
    },
    updateResultQuestionMutation(state, TheResultQuestion) {
        state.resultQuestion[TheResultQuestion.answerNum] = TheResultQuestion.isResult;
        let numberOfResult = state.resultQuestion.reduce((cnt, item) => {
            if (item) return cnt + 1;
            return cnt;
        }, 0)
        console.log("NUMBER");
        console.log(numberOfResult);
        if (numberOfResult > 1) state.typeOfQuestion = 'checkbox';
        else state.typeOfQuestion = 'radio'
    }
}
const actions = {
    addAnswerAction(context, TheAnswer) {
        context.commit("addAnswerMutation", TheAnswer);
    },
    addQuestionAction(context, question) {
        context.commit("addQuestionMutation", question)
    },
    addSubjectIdAction(context, id) {
        context.commit("addSubjectIdMutation", id)
    },
    addTopicAction(context, topic) {
        context.commit("addTopicMutation", topic)
    },
    updateResultQuestionAction(context, TheResultQuestion) {
        context.commit("updateResultQuestionMutation", TheResultQuestion);
    },
    addQAAction(context, data) {
        addQAApi(data)
    },
    async uploadWordFileAction(context, form) {
        try {
            const result = await uploadWordFileApi(form);
            return result.data;
        }
        catch (error) {
            return error.response.data.message;
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}