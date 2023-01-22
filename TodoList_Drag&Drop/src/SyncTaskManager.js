import { request } from "./API.js"

export default function SyncTasksManager() {
    let tasks = []

    this.addTask = (task) => {
        tasks.push(task)
        console.log(task)
    }

    this.run = async () => {
        while(tasks.length) {
            const task = tasks.shift();
            await request(task.url, {
                method: task.method || 'GET'
            })
        }
    }

    this.removeTasks = (urlPattern) => {
        tasks = tasks.filter(task => !task.url.includes(urlPattern))
        console.log(tasks)
    }
}