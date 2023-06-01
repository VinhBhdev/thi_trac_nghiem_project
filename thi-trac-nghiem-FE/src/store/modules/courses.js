import { getAllCoursesApi } from "@/apis/courses";
const state = () => {
    return {
        coursesArray: [
        ],
        courseSearch: "",
    }
}
const getters = {
    getAllCourseSearch(state) {
        if (state.courseSearch)
            return state.coursesArray.filter((item) => item.courseName.toLowerCase().includes(state.courseSearch.toLowerCase()))
        return state.coursesArray;
    }
}
const mutations = {
    setCoursesListMutation(state, courseList) {
        state.coursesArray = courseList;
    },
    setCouseSearchMutation(state, courseSearchName) {
        state.courseSearch = courseSearchName
    }
}
const actions = {
    async getAllCoursesAction(context) {
        const data = await getAllCoursesApi();
        context.commit("setCoursesListMutation", data);
    },
    setCouseSearchAction(context, courseSearchName) {
        console.log("actions");
        console.log(courseSearchName)
        context.commit("setCouseSearchMutation", courseSearchName)
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}