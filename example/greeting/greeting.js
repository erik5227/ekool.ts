// Import library
const { EKool } = require('../lib/index');

// Wrap in async function
const main = async function(){
    // Create new EKool instance
    // It is possible to pass in authentication/refresh token if you have those
    const ekool = new EKool();
    try {
        // Login with our credentials.
        await ekool.login(process.env.EMAIL, process.env.PASSWORD);
        // Retreive person data. This is necessary for running other commands
        await ekool.getPersonData();
        console.log(`Hello, ${ekool.personData.name1} ${ekool.personData.name2}!`);
    } catch (err) {console.error("An error occured")}
}()