import { getAllContestsApi, submitContestApi } from "@/apis/contests";
import { addContestApi } from "@/apis/admin";
const state = () => {
    return {
        contestsList: [],
        contestSearch: "",
        endContest: null,
    }
}
const getters = {
    getAllContestsSearch(state) {
        if (state.contestSearch)
            return state.ContestsList.filter((item) => item.courseName.toLowerCase().includes(state.contestSearch.toLowerCase()))
        return state.ContestsList;
    },
    getEndContest(state) {
        return state.endContest;
    }
}
const mutations = {
    setContestsListMutation(state, ContestsList) {
        state.ContestsList = ContestsList;
    },
    setEndContestMutation(state, endContest) {
        state.endContest = endContest;
    }

}
const actions = {
    async getAllContestsAction(context, subjectId) {
        const result = await getAllContestsApi(subjectId);
        console.log(">>>getAllContestsAction")
        console.log(result.data);
        context.commit("setContestsListMutation", result.data);
    },
    setEndContestAction(context, endContest) {
        context.commit("setEndContestMutation", endContest);
    },
    async addContestAction(context, contest) {
        try {
            const result = await addContestApi(contest);
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    },
    async submitContestAction(context, submitInfo) {
        try {
            const result = await submitContestApi(submitInfo);
            return result.data;
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