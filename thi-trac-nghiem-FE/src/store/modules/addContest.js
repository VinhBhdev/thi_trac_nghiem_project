
import { addContestApi } from "@/apis/admin";
const state = () => {
    return {
        contest: {},
        recommendQuestionsList: [],
        searchRecommendQuestionsText: '',
        searchTopic: '',
        currentPage: 1,
        NUMBER_OF_QUESTIONS_PER_PAGE: 5
    }
}
function pagination(result, page, NUMBER_OF_QUESTIONS_PER_PAGE) {
    return result.slice((page - 1) * NUMBER_OF_QUESTIONS_PER_PAGE, page * NUMBER_OF_QUESTIONS_PER_PAGE);
}
const getters = {
    getRecommendQuestions(state) {
        return pagination(state.recommendQuestionsList, state.currentPage, state.NUMBER_OF_QUESTIONS_PER_PAGE);
    },
    getNumberOfPages(state) {
        return parseInt((state.recommendQuestionsList.length + state.NUMBER_OF_QUESTIONS_PER_PAGE - 1) / state.NUMBER_OF_QUESTIONS_PER_PAGE);
    },
    getRecommendQuestionsListBySearchText(state) {
        let filterQuestions = state.recommendQuestionsList.filter((item) => {
            console.log(item.topic);
            return item.topic.includes(state.searchRecommendQuestionsText) || item.questionText.includes(state.searchRecommendQuestionsText);
        });
        return filterQuestions;
    },
    getRecommendQuestionsListByTopicSearch(state) {
        let filterQuestions = state.recommendQuestionsList.filter((item) => {
            console.log(item.topic);
            return item.topic === state.searchTopic;
        });
        return filterQuestions;
    },
    getAllTopics(state) {
        let topicsList = state.recommendQuestionsList.reduce((res, item) => {
            if (res.indexOf(item.topic) === -1) res.push(item.topic);
            return res;
        }, []);
        return topicsList;
    }
}
const mutations = {
    setRecommendQuestionsListMutaion(state, recommendQuestionsList) {
        state.recommendQuestionsList = recommendQuestionsList;
    },
    setSearchTextMutation(state, searchRecommendQuestionsText) {
        state.searchRecommendQuestionsText = searchRecommendQuestionsText;
    },
    setSearchTopicTextMutation(state, searchTopic) {
        state.searchTopic = searchTopic;
    },
    setCurrentPageMutation(state, page) {
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
    setRecommendQuestionsListAction(context, recommendQuestionsList) {
        context.commit("setRecommendQuestionsListMutaion", recommendQuestionsList);
    },
    setSearchTextAction(context, searchText) {
        context.commit("setSearchTextMutation", searchText);
    },
    setSearchTopicTextAction(context, searchTopic) {
        context.commit("setSearchTopicTextMutation", searchTopic);
    },
    setCurrentPageAction(context, page) {
        context.commit("setCurrentPageMutation", page);
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}