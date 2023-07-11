import { getAllContestsApi, submitContestApi, enterContestApi, getEndTimeOfContestApi, getContestStatusApi, getContestRankApi, getContestDetailApi } from "@/apis/contests";
import { addContestApi, getAllContestsForAdminApi } from "@/apis/admin";
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
    async getAllContestsAction(context, info) {
        const result = await getAllContestsApi(info);
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
    async enterContestAction(context, enterContestData) {
        try {
            const result = await enterContestApi(enterContestData);
            return result.data;
        }
        catch (error) {
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
    },
    async getEndTimeOfContestAction(context, userAndContestInfo) {
        try {
            const result = await getEndTimeOfContestApi(userAndContestInfo);
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    },
    async getContestStatusAction(context, userAndContestInfo) {
        try {
            const result = await getContestStatusApi(userAndContestInfo);
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    },
    async getContestRankAction(context, contestId) {
        try {
            const result = await getContestRankApi(contestId);
            return result.data;
        }
        catch (error) {
            return error.response.data.message;
        }
    },
    async getAllContestsForAdminAction(context, subjectId) {
        try {
            // console.log(">>>getAllContestsForAdminAction");
            const result = await getAllContestsForAdminApi(subjectId);
            console.log(result.data);
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    },

    async getContestDetailAction(context, contestId) {
        try {
            const result = await getContestDetailApi(contestId);
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