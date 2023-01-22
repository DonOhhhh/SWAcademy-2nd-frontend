export default function TaskQueue() {
    this.tasks = [];

    this.addTasks = (task) => {
        this.tasks.push(task)
        console.log(task)
    }

    this.run = async () => {
        while(this.tasks.length) {
            const task = this.tasks.shift()
            await task()
            this.run();
        }
    }

    this.hasTask = () => this.tasks.length
}