const { error } = require('console');
const fs = require('fs');

class ToDosServices {
    getTasksUser(id) {
        console.log('enter ToDosServices getTasksUser');
        return new Promise((res, rej) => {
            fs.readFile('data/tasks.json', 'utf8', (error, data) => {
                if (error) throw error;
                const tasks = JSON.parse(data);
                console.log(tasks);
                if (tasks.length == 0) {
                    res({ status: 200, send: "o rear for users" });
                }
                const userTasks = tasks.filter(item => item.idUser == id)
                if (userTasks.length == 0) {
                    res({ status: 200, send: "this user has no tasks" });
                }

                res({ status: 200, send: userTasks });
            })
        })
    }

    createTask(id, body) {
        return new Promise((res, rej) => {
            fs.readFile('data/tasks.json', 'utf8', (error, data) => {
                if (error) throw error;
                const tasks = JSON.parse(data);
                // console.log(body);
                const task = {
                    id: ToDosServices.makeId(),
                    title: body.title,
                    isComplite: false,
                    idUser: id,
                }
                tasks.push(task);
                fs.writeFile('data/tasks.json', JSON.stringify(tasks), (error) => {
                    if (error) throw error;
                });
                res({ status: 200, send: task });
            })
        })
    }

    updateTitleTask(id, req) {
        return new Promise((res, rej) => {
            fs.readFile('data/tasks.json', 'utf8', (error, data) => {
                if (error) throw error;
                const tasks = JSON.parse(data);
                // console.log(req.params.id);
                // console.log(req.body.title);
                const task = tasks.find(item => item.id == req.params.id);
                if (!task) {
                    res({ status: 404, send: 'task not found' });
                } else if (task.idUser == id) {
                    const updateTask = tasks.map(item => item.id == req.params.id ? { ...item, title: req.body.title } : item);
                    fs.writeFile('data/tasks.json', JSON.stringify(updateTask), (error) => {
                        if (error) throw error;
                    });
                    const resTask = updateTask.find((item => item.id == req.params.id));
                    console.log(resTask);
                    res({ status: 200, send: resTask });
                } else res({ status: 400, send: 'this not your task' });
            })
        })
    }

    isCompletedTask(id, req) {
        console.log('isCompletedTask');

        return new Promise((res, rej) => {
            fs.readFile('data/tasks.json', 'utf8', (error, data) => {
                if (error) throw error;
                const tasks = JSON.parse(data);
                // console.log('id: ' + req.params.id);
                const task = tasks.find(item => item.id == req.params.id);
                if (!task) {
                    res({ status: 404, send: 'task not found' });
                } else if (task.idUser == id) {
                    const updateTask = tasks.map(item => {
                        if (item.id == req.params.id) {
                            return { ...item, isComplite: !item.isComplite }
                        } else return item;
                    });
                    fs.writeFile('data/tasks.json', JSON.stringify(updateTask), (error) => {
                        if (error) throw error;
                    });
                    const resTask = updateTask.find((item => item.id == req.params.id));
                    console.log(resTask);
                    res({ status: 200, send: resTask });
                } else res({ status: 400, send: 'this not your task' });
            })
        })
    }

    deleteTask(id, req) {
        console.log('deleteTask');

        return new Promise((res, rej) => {
            fs.readFile('data/tasks.json', 'utf8', (error, data) => {
                if (error) throw error;
                const tasks = JSON.parse(data);
                // console.log('idUser: ' + req.params.id);
                const task = tasks.find(item => item.id == req.params.id);
                if (!task) {
                    res({ status: 404, send: 'task not found' });
                } else if (task.idUser == id) {
                    const id = tasks.findIndex(item => item.id == req.params.id);
                    console.log('ID task in array: ' + id);
                    tasks.splice(id, 1);
                    fs.writeFile('data/tasks.json', JSON.stringify(tasks), (error) => {
                        if (error) throw error;
                    });
                    res({ status: 200, send: 'task deleted' });
                } else res({ status: 400, send: 'this not your task' });
            })
        })
    }

    static makeId() {
        let array = fs.readFileSync('data/tasks.json', { encoding: "utf-8" });
        let lastId = (JSON.parse(array)).length + 1;
        return lastId;
    }

}

module.exports = new ToDosServices();