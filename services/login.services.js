const { error } = require('console');
const fs = require('fs')

class LoginServices {
    loginServices(req) {
        return new Promise((res, rej) => {
            fs.readFile('data/users.json', 'utf8', (error, data) => {
                if (error) throw error;
                const users = JSON.parse(data);
                const currentUser = users.find(item => item.email === req.email); // поиск пользователя с переданным email
                if (currentUser) {
                    console.log('user found'); // проверка пароля
                    currentUser.password === req.password ?
                        res({ status: 200, send: 'вернуть токен' }) : // пользователь найден, пароль совпадает, вернуть токен
                        res({ status: 400, send: 'incorrect password' }); // пользователь найден, пароль не совпадает
                } else res({ status: 400, send: 'User with such an email is not registered' });
            })
        })
    }

}

module.exports = new LoginServices();