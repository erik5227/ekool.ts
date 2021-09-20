# eKool

**Asynchronous API wrapper for eKool**

```
Work in progress. The class names, methods and API may be changed before initial realease
```

## Methods

`login()` - retreives eKool access token

`getPersonData()` - retreives data about person

`getFamily()` - Retreives data about person's family

`getPremiumPackages()` - Retreives data about available premium packages

`getAbsencesForStudent()` - Retreives data about student's abscences for last 90 days

`getTasksForStudent()` - Retreives data about student's tasks in given timeframe

`updateTask()` - Mark task as done/not done

`getLessonsForStudents()` - Retreives data about student's lessons in given timeframe

`getTimetableForStudents()` - Retreives data about student's timetable in given timeframe

`getLessonWithDescriptionForAbsenceId()` - Retreives data about lessons student skipped by absence ID

`getGradeDetailData()` - Retreives grade's details by its ID

`getSubjectGradeForStudentSubject()` - Retreives data about subject grade by subject ID

`getFeedItem()` - Retreives feed item details by event ID

`getFeedForStudent()` - Retreives feed for student

`getThread()` - Retreives data about thread by its ID

`getDilBehGradesForTypeId()` - Retreives diligence and behaviour grades by type ID

`getSubjectWithCoursesAndJournals()` - Retreives student gradesheet

`getGradesForTermByJournal()` - Retreives student term grades by journal ID

`getConsolidatedGradesByJournal()` - Retreives student grades by journal ID

`getDaysFromNow()` - Returns eKool-formatted date for provided day after today

`cleanFeed()` - Removes advertisements from eKool feed

`formatDate()` - Turns timestamp into ekool-friendly format

`getDateFromEkoolDate()` - Turns ekool-friendly date into Date object

`getChartForGrade()` - Returns chart image url for provided grade id

`createPersonalTask()` - Creates a new personal task

`updatePersonalTask()` - Updates personal task

`removePersonalTask()` - Removes personal task

`getNewToken()` - Obtains a new access token

## Example

```js
// Import library
const { EKool } = require("../../lib/index");

// Wrap in async function
(async function () {
  try {
    // Create new EKool instance
    // It is possible to pass in authentication/refresh token if you have those
    const ekool = new EKool(
      await EKool.login(process.env.EMAIL, process.env.PASSWORD)
    );
    // Retreive person data. This is necessary for running other commands
    await ekool.getPersonData();
    console.log(`Hello, ${ekool.personData.name1} ${ekool.personData.name2}!`);
  } catch (err) {
    console.error(err);
  }
})();
```
