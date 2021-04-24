const { EKool } = require('../../lib/index');

const main = async function(){
    const ekool = new EKool(await EKool.login(process.env.EMAIL, process.env.PASSWORD));
    await ekool.getPersonData();

    const upcomingTasks = await ekool.getTasksForStudent(
        ekool.getDaysFromNow(0),
        ekool.getDaysFromNow(6)
    )

    upcomingTasks.eventList.forEach(task => {
        console.log(`[${task.deadLine}] [${task.isDone?'X':' '}] ${task.title}`)
    })
}()