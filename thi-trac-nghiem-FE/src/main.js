import { createApp } from 'vue'
import App from './App.vue'
import CourseList from './components/CourseList.vue'
import QuestionsList from './components/QuestionsList.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import NavBar from './components/NavBar.vue'
import store from './store'
import AddQuestionsList from './components/AddQuestionsList.vue'
import ErrorPage from './components/ErrorPage.vue'
import SubjectsList from './components/SubjectsList.vue'
import ContestsList from './components/ContestsList.vue'
import AddSubject from './components/AddSubject.vue'
import AddContest from './components/AddContest.vue'
import ManageSubjects from './components/ManageSubjects.vue'
import UpdateSubject from './components/UpdateSubject.vue'
import RankTable from './components/RankTable.vue'
import UploadWordFile from './components/UploadWordFile.vue'
import AllContestsForAdmin from './components/AllContestsForAdmin.vue'
import UpdateContest from './components/UpdateContest.vue'
import VueCookies from 'vue-cookies';

import { createRouter, createWebHistory } from 'vue-router'


const isLoggedIn = window.localStorage.getItem("isLoggedIn");
const role = window.localStorage.getItem("role");
console.log(role);
const routes = [

    { path: '/', component: (isLoggedIn) ? SubjectsList : SignIn },
    { path: '/courses/:courseId', component: QuestionsList },
    { path: '/courses', component: CourseList },
    { path: '/subjects', component: SubjectsList },
    { path: '/subjects/:subjectId', component: ContestsList },
    // { path: '/contests/:contestId', component: QuestionsList },
    { path: '/enter-contest/:enterContestId', component: QuestionsList },
    { path: '/signup', component: SignUp },
    { path: '/signin', component: SignIn },
    { path: '/add-questions-list', component: AddQuestionsList },
    { path: '/admin/add-subject', component: AddSubject },
    { path: '/admin/add-contest', component: AddContest },
    { path: '/admin/manage-subjects', component: ManageSubjects },
    { path: '/admin/update-subjects/:subjectId', component: UpdateSubject },
    { path: '/contest/contest-rank/:contestId', component: RankTable },
    { path: '/upload', component: UploadWordFile },
    { path: '/admin/all-contests-for-admin/subjects/:subjectId', component: AllContestsForAdmin },
    { path: '/admin/update-contest/:contestId', component: UpdateContest },

    { path: '/error-page', component: ErrorPage },

]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
    linkActiveClass: "active",
})
const app = createApp(App)

app.use(router)
app.use(store);
app.use(VueCookies);

app.component('NavBar', NavBar);
app.mount('#app')
