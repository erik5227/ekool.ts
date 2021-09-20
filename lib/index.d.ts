import { personData, familyData, premiumPackage, tasks, lessons, timetable, gradeDetails, feedItem, lesson, refreshTokenResponse } from './interfaces';
import { ekoolDate, feed } from './types';
import { taskPriorityLevels } from './enums';
export declare class EKool {
    accessToken: string;
    refreshToken: string;
    personData: personData;
    studentID: number;
    family: familyData;
    static accessToken: any;
    /**
     * Create new EKool object
     * @param accessToken provide pre-retreived access token
     * @param refreshToken provide pre-retreived refresh token
     */
    constructor(tokens: string[]);
    /**
     * Retreives access token
     * @param email eKool email
     * @param password eKool password
     */
    static login(email: string, password: string): Promise<string[]>;
    /**
     * Retreives data about person. Necessary if `EKool.studentId` is not set explicitly
     * @returns Person data payload
     */
    getPersonData(): Promise<personData>;
    /**
     * Retreives data about person's family
     * @returns Family data
     */
    getFamily(): Promise<familyData>;
    /**
     * Retreives data about available premium packages
     * @returns Premium packages
     */
    getPremiumPackages(): Promise<premiumPackage>;
    /**
     * Retreives data about student's abscences for last 90 days
     * @returns Student absences
     */
    getAbsencesForStudent(): Promise<unknown[]>;
    /**
     * Retreives data about student's tasks in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns tasks
     */
    getTasksForStudent(start: ekoolDate, end: ekoolDate): Promise<tasks>;
    /**
     * Retreives data about student's lessons in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns lessons
     */
    getLessonsForStudents(start: ekoolDate, end: ekoolDate): Promise<lessons>;
    /**
     * Retreives data about student's timetable in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns timetable
     */
    getTimetableForStudents(start: ekoolDate, end: ekoolDate): Promise<timetable>;
    /**
     * Retreives data about lessons student skipped by absence ID
     * @param absenceID absence ID
     * @returns lessons
     */
    getLessonWithDescriptionForAbsenceId(absenceID: string | number): Promise<lesson>;
    /**
     * Retreives grade's details by its ID
     * @param gradeID grade ID
     * @returns grade details
     */
    getGradeDetailData(gradeID: string | number): Promise<gradeDetails>;
    /**
     * Retreives data about subject grade by subject ID
     * @param subjectID subject id
     * @returns subject grade
     */
    getSubjectGradeForStudentSubject(subjectID: string | number): Promise<unknown>;
    /**
     * Retreives feed item details by event ID
     * @param eventId event ID
     * @returns feed item
     */
    getFeedItem(eventId: string | number): Promise<feedItem>;
    /**
     * Retreives feed for student
     * @returns student feed
     */
    getFeedForStudent(): Promise<feed>;
    /**
     * Retreives data about thread by its ID
     * @param threadId thread id
     * @returns thread data
     */
    getThread(threadId: string | number): Promise<unknown>;
    /**
     * Retreives diligence and behaviour grades by type ID
     * @param typeId type ID
     * @returns diligence and behaviour grades
     */
    getDilBehGradesForTypeId(typeId: string | number): Promise<unknown>;
    /**
     * Retreives student gradesheet
     * @returns gradesheet
     */
    getSubjectWithCoursesAndJournals(): Promise<unknown>;
    /**
     * Retreives student term grades by journal ID
     * @param selectedJournalId ID of a journal
     * @param gradeId ID of a grade from the required term
     * @returns grades for term
     */
    getGradesForTermByJournal(selectedJournalId: string | number, gradeId: string | number): Promise<unknown>;
    /**
     * Retreives student grades by journal ID
     * @param journalId ID of a journal
     * @returns grades
     */
    getConsolidatedGradesByJournal(journalId: string | number): Promise<unknown>;
    /**
     * Converts student ID to a string
     * @returns student ID
     */
    private getStudentId;
    /**
     * Returns eKool-formatted date for provided day after today
     * @param days how many days to skip
     * @returns ekoolDate day
     */
    getDaysFromNow(days: number): ekoolDate;
    /**
     * Remove advertisements from eKool feed
     * @param feed feed to clean
     * @returns clean feed
     */
    cleanFeed(feed: feed): feed;
    /**
     * Converts date into a eKool-friendly format
     * @param timestamp time in milliseconds
     * @returns time in eKool-friendly format
     */
    formatDate(timestamp: number | Date | string): ekoolDate;
    /**
     * Creates a new personal task visible by student only
     * @param name Title for the task
     * @param content Description of the task
     * @param isDone Whether or not to mark the task
     * @param deadline Deadline to set for the task
     * @param priority Priority for the task
     * @returns true if task was added successfully
     */
    createPersonalTask(name: string, content: string, isDone: boolean, deadline: Date, priority: taskPriorityLevels): Promise<Boolean>;
    getNewToken(): Promise<refreshTokenResponse>;
    /**
     * Generates a URL for a chart image representing provided grade's statistics.
     * Requires active eKool premium
     * @param gradeId ID of a grade
     * @returns chart image URL
     */
    getChartForGrade(gradeId: string | number): Promise<string>;
    /**
     * Retreives data from eKool's API
     * @param pathElements API URL path elements
     */
    private _dataMiner;
    /**
     * Creates an md5 hash of a query base and returns a base with it in it
     * @param queryBase base to stamp
     * @returns stamped base
     */
    private _getStampedBase;
    /**
     * Generate default query base for a request
     * @returns query base
     */
    private _getQueryBase;
}
//# sourceMappingURL=index.d.ts.map