const { error } = require('console');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginServices {
    login(req) {
        const { email, password } = req;
        return new Promise((res, rej) => {
            fs.readFile('data/users.json', 'utf8', (error, data) => {
                if (error) throw error;
                const users = JSON.parse(data);
                const currentUser = users.find(item => item.email === email); // поиск пользователя с переданным email
                const id = currentUser.id;
                if (currentUser) {
                    console.log('user found');
                    console.log(currentUser.id);
                    // проверка пароля
                    const isPassEquals = bcrypt.compareSync(password, currentUser.password);
                    // console.log(isPassEquals);
                    if (isPassEquals) {
                        const token = jwt.sign({ id: id, email: email }, process.env.ACCESS_TOKEN_SECRET, { noTimestamp: true });
                        // currentUser.token = token;
                        // const updateUser = users.map(item => item.email === currentUser.email ? currentUser : item);
                        // fs.writeFileSync('data/users.json', JSON.stringify(updateUser)); // перезаписываем пользователя с токеном
                        res({ status: 200, send: token }); // пользователь найден, пароль совпадает, вернуть токен

                    } else res({ status: 400, send: 'incorrect password' }); // пользователь найден, пароль не совпадает
                } else res({ status: 400, send: 'User with such an email is not registered' });
            })
        })
    }

}

module.exports = new LoginServices();