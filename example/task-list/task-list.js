const { EKool } = require('../../lib/index');

const main = async function(){
    const ekool = new EKool(await EKool.login(process.env.EMAIL, process.env.PASSWORD));
    await ekool.getPersonData();

    const todayTimestamp = new Date();
    const upcomingTasks = await ekool.getTasksForStudent(
        ekool.formatDate(todayTimestamp.getTime()),
        ekool.formatDate(todayTimestamp.getTime() + 604800000)
    )

    upcomingTasks.eventList.forEach(task => {
        console.log(`[${task.deadLine}] [${task.isDone?'X':' '}] ${task.title}`)
    })
}()