import { getAllSubjectsApi } from "@/apis/subjects";
import { addSubjectApi, updateSubjectApi } from "@/apis/admin";
const state = () => {
    return {
        subjectsList: [],
        subjectSearch: "",
    }
}
const getters = {
    getAllSubjectSearch(state) {
        if (state.subjectSearch)
            return state.subjectsList.filter((item) => item.courseName.toLowerCase().includes(state.subjectSearch.toLowerCase()))
        return state.subjectsList;
    },
    // getSubjectById(state, subjectId) {
    //     let subjectsList = state.subjectsList;
    //     let findSubject = subjectsList.find((item) => item.id === subjectId);
    //     return findSubject;
    // }
}
const mutations = {
    setSubjectsListMutation(state, subjectsList) {
        state.subjectsList = subjectsList;
    },
    // setCouseSearchMutation(state, courseSearchName) {
    //     state.courseSearch = courseSearchName
    // }
}
const actions = {
    async getAllSubjectsAction(context) {
        const data = await getAllSubjectsApi();

        context.commit("setSubjectsListMutation", data);
    },
    // setCouseSearchAction(context, courseSearchName) {
    //     console.log("actions");
    //     console.log(courseSearchName)
    //     context.commit("setCouseSearchMutation", courseSearchName)
    // }
    async addSubjectAction(context, subject) {
        try {
            const result = await addSubjectApi(subject);
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    },

    async updateSubjectAction(context, updateSubject) {
        try {
            const result = await updateSubjectApi(updateSubject);
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    },
    // getSubjectByIdAction(context) {
    //     return context.state.subjectsList[0];
    //     // console.log("subjectId");
    //     // console.log(subjectId);
    //     // let subjectsList = context.state.subjectsList;
    //     // for (let subject of subjectsList) {
    //     //     console.log(subject);
    //     //     if (subject.id == subjectId) return { name: 'test' };
    //     // }
    //     // let findSubject = subjectsList.find((item) => item.id === subjectId);
    //     // return findSubject;
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}