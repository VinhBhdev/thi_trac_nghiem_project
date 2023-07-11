// import pool from "../configs/configDB";
import User from '../models/User'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const saltRounds = 10;

let signinServices = async (user) => {
    // const [data, fields] = await pool.execute(`select * from users where username = '${user.username}'`);
    // const findUser = data[0];
    const findUser = await User.findOne({ where: { username: user.username } });
    if (findUser) {
        console.log(findUser);
        const match = await bcrypt.compare(user.password, findUser.password);
        if (match) {
            const SECRET = 'shhhhhh';
            let token = jwt.sign({ id: findUser.id }, SECRET, {
                expiresIn: '1h',
            });
            delete findUser.password;
            return ({
                token: token,
                message: "OK",
                user: findUser
            });
        }

        else throw new Error('Sai mật khẩu');
    }
    else throw new Error('Không tìm thấy username');

}

let signupServices = async (user) => {
    // const [data, fields] = await pool.execute(`select * from users where username = '${user.username}'`);
    // const findUser = data[0];
    const findUser = await User.findOne({ where: { username: user.username } });
    if (findUser) {
        throw new Error('Tài khoản này đã tồn tại');
    }
    else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;

        // await pool.execute(`insert into users(username, last_name, first_name, email, password)
        // values('${user.username}', '${user.last_name}', '${user.first_name}', '${user.email}', '${user.password}')`);
        await User.create({
            username: user.username,
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            password: user.password,
            role: 1,
        });

        return ({
            token: "OK",
            message: "OK",
            user: user
        });
    }
}

let findUserById = async (id) => {
    const findUser = await User.findOne({ where: { id: id } });
    if (findUser) return findUser;
    else throw new Error('User chưa loggin');
}

let getAllUsers = async () => {
    let users = await User.findAll();
    users = users.map(item => item.dataValues);
    return users;
}
module.exports = {
    signinServices,
    signupServices,
    findUserById,
    getAllUsers,
}