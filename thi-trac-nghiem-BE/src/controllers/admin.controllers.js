const SECRET = 'shhhhhh';
import adminServices from '../services/admin.services'
const path = require("path");
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();
// const extracted = extractor.extract("file.docx");

// extracted.then(function (doc) { console.log(doc.getBody()); });


let addQA = async (req, res) => {
    try {
        const result = await adminServices.addQAServices(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

let addSubject = async (req, res) => {
    try {
        const result = await adminServices.addSubjectServices(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


let addContest = async (req, res) => {

    try {
        let contest = req.body;
        contest.usersEnterContest.sort(function (a, b) {
            return a - b;
        });
        contest.openContest = new Date(contest.openContest);
        contest.closeContest = new Date(contest.closeContest);
        const result = await adminServices.addContestServices(contest);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

let updateSubject = async (req, res) => {
    try {
        let updateSubject = req.body;
        const result = await adminServices.updateSubjectServices(updateSubject);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

let getAllQuestionsBySubjectId = async (req, res) => {
    try {
        let subjectId = req.params.subjectId;
        let page = req.query.page || 1;
        console.log(req.query.serach);
        let search = req.query.search || "";
        let result = await adminServices.getAllQuestionsBySubjectIdServices(subjectId);
        console.log(search);
        result = result.filter((item) => {
            console.log(item.questionText, item.questionText.includes(search));
            return item.questionText.includes(search);
        })
        const PAGE_SIZE = 5;
        const start = (page - 1) * PAGE_SIZE;
        const end = Math.min(page * PAGE_SIZE, result.length); // or (start + PAGE_SIZE)
        const questionsList = result.slice(start, end);
        const numberOfPages = parseInt((result.length + PAGE_SIZE - 1) / PAGE_SIZE)
        res.status(200).json({
            PAGE_SIZE,
            numberOfPages,
            page: +page,
            questionsList,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

let getAllUsers = async (req, res) => {
    try {
        let result = await adminServices.getAllUsersServices();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function readFile() {
    const extracted = await extractor.extract("src\\controllers\\files\\file.docx");
    console.log(extracted.getBody());
    return extracted.getBody();
}

async function handleAddQAFromFile(lines, subjectId) {
    let QAs = [];
    let question_and_options = [];
    for (let line of lines) {
        question_and_options.push(line);
        if (line.includes("ANSWER:")) {
            let QA = {};
            QA.question = question_and_options[0];
            QA.answersList = question_and_options.slice(1, question_and_options.length - 1);
            QA.resultQuestion = new Array(QA.answersList.length);
            QA.resultQuestion.fill(false);
            QA.resultQuestion[question_and_options[question_and_options.length - 1][8].charCodeAt(0) - 'A'.charCodeAt(0)] = true;
            QA.subjectId = subjectId;
            console.log(QA);
            question_and_options = [];
            QAs.push(QA);
        }
    }
    console.log(QAs);
    let result;
    try {
        for (let QA of QAs) {
            result = await adminServices.addQAServices(QA);
        }
    } catch (error) {
        return { message: "error!" };
    }

    return result;
}
let uploadFile = async (req, res) => {
    let subjectId = req.params.subjectId;
    const files = req.files
    console.log(files)

    Object.keys(files).forEach(async function (key) {
        const filepath = path.join(__dirname, 'files', files[key].name)
        await files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
        console.log(">>>", filepath);
    })

    let fileText;
    while (true) {
        try {
            fileText = await readFile();
            break;
        } catch (error) {
            console.log(error.message);
        }
    }
    let lines = fileText.split("\n").filter((item) => item.length > 0);
    await handleAddQAFromFile(lines, subjectId);
    res.json({
        message: "ok",
        status: "ok",
    })

}

let validateUsers = async (req, res) => {
    let usernames = req.body.usernames;
    usernames = usernames.filter((item) => item.length > 0);
    let role = 1;
    let validUsers = [], invalidUsernames = [];
    let users = await adminServices.getAllUsersServices(role);
    for (let username of usernames) {
        let userFound = users.find((item) => item.username === username);
        if (userFound) validUsers.push(userFound);
        else invalidUsernames.push(username);
    }
    let message = '';
    if (invalidUsernames.length > 0) message = 'INVALID USERNAMES: ' + invalidUsernames.join(", ");
    else message = 'VALID';
    return res.json({
        validUsers,
        invalidUsernames,
        message,
    })
}

function updateTimeZonePlus7(date) {
    return new Date(date.valueOf() + 25200000)
}

let getAllContestsForAdmin = async (req, res) => {
    try {
        let subjectId = req.params.subjectId;
        let result = await adminServices.getAllContests(subjectId);
        result = result.reduce((result, item) => {
            let tmp = {};
            tmp.contestName = item.contest_name;
            tmp.id = item.id;
            if (item.close_contest < Date.now()) tmp.status = "Đã kết thúc";
            else if (item.open_contest > Date.now()) tmp.status = "Chưa bắt đầu";
            else tmp.status = "Đang diễn ra";
            tmp.openContest = updateTimeZonePlus7(item.open_contest);
            tmp.closeContest = updateTimeZonePlus7(item.close_contest);
            tmp.contestTime = item.contest_time;
            tmp.subjectId = item.subject_id;
            result.push(tmp);
            return result;
        }, [])
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    addQA,
    addSubject,
    addContest,
    updateSubject,
    getAllQuestionsBySubjectId,
    getAllUsers,
    uploadFile,
    validateUsers,
    getAllContestsForAdmin,
}
