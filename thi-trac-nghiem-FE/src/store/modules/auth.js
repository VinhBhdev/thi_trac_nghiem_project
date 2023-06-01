import { postSigninApi, postSignupApi, checkUserLoggedApi } from "@/apis/auth";

const state = () => {
    return {
        user: null
    }
}
const getters = {
    getUser(state) {
        return state.user;
    }
}
const mutations = {
    postSigninMutation(state, user) {
        state.user = user;
    },
    signoutMutation(state) {
        state.user = null;
    },

}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const actions = {
    async postSigninAction(context, user) {
        try {
            const result = await postSigninApi(user);
            context.commit("postSigninMutation", result.data.user);
            setCookie("token", result.data.token, 1);
            window.localStorage.setItem("isLoggedIn", true);
            window.localStorage.setItem("role", result.data.user.role);
            return "Đăng nhập thành công";

        } catch (error) {
            return error.response.data.message;
        }
    },

    async postSignupAction(context, user) {
        try {
            const result = await postSignupApi(user);
            context.commit("postSigninMutation", result.data.user);
            return "Đăng ký thành công";

        } catch (error) {
            context.commit("postSigninMutation", null);
            return error.response.data.message;
        }
    },

    signoutAction(context) {
        context.commit("signoutMutation");
        window.localStorage.removeItem("isLoggedIn");
    },

    async checkUserLoggedAction(context, token) {
        try {
            const result = await checkUserLoggedApi(token);
            console.log(result);
            context.commit("postSigninMutation", result.data);
        } catch (error) {
            console.log(error.message)
            context.commit("postSigninMutation", null);
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