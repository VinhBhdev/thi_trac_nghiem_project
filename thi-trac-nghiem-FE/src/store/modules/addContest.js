
import { addContestApi, getAllQuestionsBySubjectIdApi, getAllUsersApi, validateUsersApi } from "@/apis/admin";
const state = () => {
    return {
        contest: {},
        recommendQuestionsList: [],
        PAGE_SIZE: 1,
        numberOfPages: 1,
        currentPage: 1,
    }
}

const getters = {

}
const mutations = {
    setPageSizeMutation(state, PAGE_SIZE) {
        state.PAGE_SIZE = PAGE_SIZE;
    },
    setNumberOfPagesMutatation(state, numberOfPages) {
        state.numberOfPages = numberOfPages;
    },
    setRecommendQuestionsListMutatation(state, questions) {
        state.recommendQuestionsList = questions;
    },
    setCurrentPageMutatation(state, page) {
        state.currentPage = page;
    }
}
const actions = {
    async addContestAction(context, contest) {
        try {
            const result = await addContestApi(contest);
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    },
    async getQuestionsBySubjectIdAction(context, info) {
        let { subjectId, page, search } = info;
        page = page || 1;
        console.log(subjectId, page);
        try {
            const result = await getAllQuestionsBySubjectIdApi(subjectId, page || 1, search || "");
            console.log(result);
            context.commit("setNumberOfPagesMutatation", result.data.numberOfPages);
            context.commit("setPageSizeMutation", result.data.PAGE_SIZE);
            context.commit("setRecommendQuestionsListMutatation", result.data.questionsList);
            context.commit("setCurrentPageMutatation", page);
            return result.data.questionsList;
        } catch (error) {
            return error.response.data.message;
        }
    },
    async getAllUsersAction(context, role = 1) {
        try {
            const users = await getAllUsersApi(role);
            return users.data;
        } catch (error) {
            return error.response.data.message;
        }
    },
    async validateUsersAction(context, usernames) {
        try {
            const users = await validateUsersApi(usernames);
            return users.data;
        } catch (error) {
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