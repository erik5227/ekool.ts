import axios, { AxiosResponse } from 'axios';
import {
    personData,
    queryBase,
    familyData,
    premiumPackage,
    tasks,
    lessons,
    timetable,
    gradeDetails,
    feedItem,
    lesson,
    privateTaskQuery,
    refreshTokenResponse,
    absence,
    eventUpdateQuery,
    task
} from './interfaces';
import {
    ekoolDate,
    feed
} from './types';
import ImageCharts from 'image-charts';
import md5 from 'md5';
import { taskPriorityLevels } from './enums';

const API_URL = 'https://postikana.ekool.eu/rest/json';
const SERVER_ROOT_URL = 'https://ekool.eu/';

export class EKool {
    accessToken: string = null;
    refreshToken: string = null;
    personData: personData = null;
    studentID: number = null;
    family: familyData = null;
    static accessToken: any;

    /**
     * Create new EKool object
     * @param accessToken provide pre-retreived access token
     * @param refreshToken provide pre-retreived refresh token
     */
    public constructor(tokens: string[]) {
        this.accessToken = tokens[0];
        this.refreshToken = tokens[1];
    }

    /**
     * Retreives access token
     * @param email eKool email
     * @param password eKool password
     */
    public static async login(email: string, password: string): Promise < string[] > {
        var result;
        const url = SERVER_ROOT_URL + 'auth/oauth/token';

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic bUtvb2w6azZoOTdoYWZzcnZvbzNzZDEzZ21kdXE4YjZ0YnM1czE2anFtYTZydThmajN0dWVhdG5lOGE4amxtN2Jt'
        };

        let loginData = new URLSearchParams();
        loginData.append('grant_type', 'password');
        loginData.append('client_id', 'mKool');
        loginData.append('username', email);
        loginData.append('password', password);

        await axios({
            method: 'POST',
            url: url,
            data: loginData,
            headers: headers
        }).then((res) => {
            if (res.status != 200) {
                console.log(res.status)
                throw new Error('Unable to login');
            } else {
                result = [res.data.access_token, res.data.refresh_token];
            }
        });
        return result;
    }

    /**
     * Retreives data about person. Necessary if `EKool.studentId` is not set explicitly
     * @returns Person data payload
     */
    public async getPersonData(): Promise < personData > {
        this.personData = await this._dataMiner("person");
        this.studentID = this.personData.roles[0].studentId;
        return this.personData;
    }

    /**
     * Retreives data about person's family
     * @returns Family data
     */
    public async getFamily(): Promise < familyData > {
        this.family = await this._dataMiner("family");
        return this.family;
    }

    /**
     * Retreives data about available premium packages
     * @returns Premium packages
     */
    public async getPremiumPackages(): Promise < premiumPackage > {
        return await this._dataMiner("premiumPackages");
    }

    /**
     * Retreives data about student's abscences for last 90 days
     * @returns Student absences
     */
    public async getAbsencesForStudent(): Promise < absence[] > {
        return await this._dataMiner('absences90Days', this.getStudentId())
    }

    /**
     * Retreives data about student's tasks in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns tasks
     */
    public async getTasksForStudent(start: ekoolDate, end: ekoolDate): Promise < tasks > {
        return await this._dataMiner('todolist', this.getStudentId(), start, end);
    }

    /**
     * Retreives data about student's lessons in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns lessons
     */
    public async getLessonsForStudents(start: ekoolDate, end: ekoolDate): Promise < lessons > {
        return await this._dataMiner('lessons', this.getStudentId(), start, end);
    }

    /**
     * Retreives data about student's timetable in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns timetable
     */
    public async getTimetableForStudents(start: ekoolDate, end: ekoolDate): Promise < timetable > {
        return await this._dataMiner('timetable', this.getStudentId(), start, end);
    }

    /**
     * Retreives data about lessons student skipped by absence ID
     * @param absenceID absence ID
     * @returns lessons
     */
    public async getLessonWithDescriptionForAbsenceId(absenceID: string | number): Promise < lesson > {
        return await this._dataMiner('lessonEventByAbsence', this.getStudentId(), String(absenceID))
    }

    /**
     * Retreives grade's details by its ID
     * @param gradeID grade ID
     * @returns grade details
     */
    public async getGradeDetailData(gradeID: string | number): Promise < gradeDetails > {
        return await this._dataMiner('grades', this.getStudentId(), String(gradeID))
    }

    /**
     * Retreives data about subject grade by subject ID
     * @param subjectID subject id
     * @returns subject grade
     */
    public async getSubjectGradeForStudentSubject(subjectID: string | number): Promise < unknown > {
        return await this._dataMiner('subjGrade', this.getStudentId(), String(subjectID));
    }

    /**
     * Retreives feed item details by event ID
     * @param eventId event ID
     * @returns feed item
     */
    public async getFeedItem(eventId: string | number): Promise < feedItem > {
        return await this._dataMiner('feeditem', this.getStudentId(), String(eventId));
    }

    /**
     * Retreives feed for student
     * @returns student feed
     */
    public async getFeedForStudent(): Promise < feed > {
        return await this._dataMiner('feed', this.getStudentId());
    }

    public async updateTask (isDone: boolean, task: task): Promise < boolean > ;
    public async updateTask (isDone: boolean, id: number, deadLine: ekoolDate): Promise < boolean > ;
    public async updateTask (isDone: boolean, a: any, b?: any): Promise < boolean > {
        let id, deadLine;
        if (b && typeof a == 'number') {
            id = a, deadLine = b;
        } else {
            id = (a as task).id
            deadLine = (a as task).deadLine
        }
        var queryBase = this._getStampedBase(this._getQueryBase()) as eventUpdateQuery;
		queryBase.studentId = this.studentID;
		queryBase.todo = isDone;
		queryBase.todoId = id;

        const oDate = this.getDateFromEkoolDate(deadLine)

        const startingDate = new Date(oDate.setDate(oDate.getDate() - oDate.getDay() + (oDate.getDay() == 0 ? -6:1)));
		const endingDate = new Date(oDate.setDate(oDate.getDate() - oDate.getDay() + 7));
		const startDateString = this.formatDate(startingDate);
		const endDateString = this.formatDate(endingDate);

        const headers = {
            "Authorization": "Bearer " + this.accessToken,
            'Content-Type': 'application/json;charset=UTF-8'
        };

        return (await axios({
            method: 'POST',
            url: API_URL + '/todoChange/' + startDateString + '/' + endDateString,
            data: queryBase,
            headers: headers
        })).status == 200
    }

    /**
     * Retreives data about thread by its ID
     * @param threadId thread id
     * @returns thread data
     */
    public async getThread(threadId: string | number): Promise < unknown > {
        return await this._dataMiner('thread', String(threadId));
    }

    /**
     * Retreives diligence and behaviour grades by type ID
     * @param typeId type ID
     * @returns diligence and behaviour grades
     */
    public async getDilBehGradesForTypeId(typeId: string | number): Promise < unknown > {
        return await this._dataMiner('grades/dilbeh', this.getStudentId(), String(typeId));
    }

    /**
     * Retreives student gradesheet
     * @returns gradesheet
     */
    public async getSubjectWithCoursesAndJournals(): Promise < unknown > {
        return await this._dataMiner('gradesheet', this.getStudentId());
    }

    /**
     * Retreives student term grades by journal ID
     * @param selectedJournalId ID of a journal
     * @param gradeId ID of a grade from the required term
     * @returns grades for term
     */
    public async getGradesForTermByJournal(selectedJournalId: string | number, gradeId: string | number): Promise < unknown > {
        return await this._dataMiner('gradesheet', this.getStudentId(), 'consolidated', String(selectedJournalId), 'term', String(gradeId));
    }

    /**
     * Retreives student grades by journal ID
     * @param journalId ID of a journal
     * @returns grades
     */
    public async getConsolidatedGradesByJournal(journalId: string | number): Promise < unknown > {
        return await this._dataMiner('gradesheet', this.getStudentId(), 'consolidated', String(journalId));
    }

    /**
     * Converts student ID to a string
     * @returns student ID
     */
    private getStudentId(): string {
        return String(this.studentID);
    }

    /**
     * Returns eKool-formatted date for provided day after today
     * @param days how many days to skip
     * @returns ekoolDate day
     */
    public getDaysFromNow(days: number): ekoolDate {
        return this.formatDate(new Date().getTime() + (days++ * 86400000))
    }

    /**
     * Remove advertisements from eKool feed
     * @param feed feed to clean
     * @returns clean feed
     */
    public cleanFeed(feed: feed): feed {
        feed.forEach(feedEntry => {
            // Advertisement item type is 20
            if (feedEntry.itemType === 20) {
                feed.splice(feed.indexOf(feedEntry), 1);
            }
        })
        return feed;
    }

    /**
     * Converts date into a eKool-friendly format
     * @param timestamp time in milliseconds
     * @returns time in eKool-friendly format
     */
    public formatDate(timestamp: number | Date | string): ekoolDate {
        var dateObj = new Date(timestamp);
        return `${String(dateObj.getDate()).padStart(2, "0")}.${String((dateObj.getMonth())+1).padStart(2, "0")}.${String(dateObj.getFullYear())}`;
    }

    /**
     * Converts ekoolDate string to Date object
     * @param ekoolDate ekoolDate string
     * @returns Date object of the date
     */
    public getDateFromEkoolDate(ekoolDate: string) {
        return new Date(ekoolDate.split('.').reverse().join('-'));
    }
    
    /**
     * Creates a new personal task visible by student only
     * @param name Title for the task
     * @param content Description of the task
     * @param isDone Whether or not to mark the task
     * @param deadline Deadline to set for the task
     * @param priority Priority for the task
     * @returns true if task was added successfully
     */
    public async createPersonalTask(name: string, content: string, isDone: boolean, deadline: Date, priority: taskPriorityLevels): Promise < Boolean > {

        let queryBase = this._getStampedBase(this._getQueryBase()) as privateTaskQuery;
        queryBase.personId = this.personData.id;
        queryBase.isDone = isDone;
        queryBase.todoPerson = {
            content: content,
            deadline: new Date(deadline.getTime() - (deadline.getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
            name: name
        };
	    queryBase.todoPriority = {
            id: priority
        };

        const headers = {
            "Authorization": "Bearer " + this.accessToken,
            'Content-Type': 'application/json;charset=UTF-8'
        };

        return (await axios({
            method: 'POST',
            url: API_URL + '/addNewPersonalTask',
            data: queryBase,
            headers: headers
        })).status == 200
    }

    /**
     * Updates personal task
     * @param rolePersonId Usually the same as task id
     * @param name New title for the task
     * @param content New description for the task
     * @returns true if task was successfully updated
     */
    public async updatePersonalTask (rolePersonId: string | number, name: string, content: string): Promise < boolean > {
        let queryBase = this._getStampedBase(this._getQueryBase()) as privateTaskQuery;
        queryBase.personId = this.personData.id;
        queryBase.todoPerson = {
            content: content,
            name: name
        };
        queryBase.todoPriority = {};

        const headers = {
            "Authorization": "Bearer " + this.accessToken,
            'Content-Type': 'application/json;charset=UTF-8'
        };

        return (await axios({
            method: 'POST',
            url: API_URL + '/updatePersonalTask/' + rolePersonId,
            data: queryBase,
            headers: headers
        })).status == 200

    }

    /**
     * Removes specified personal task
     * @param taskId ID of a task to remove
     * @returns true if task was removed successfully
     */
    public async removePersonalTask(taskId: string | number): Promise < boolean > {
        let queryBase = this._getStampedBase(this._getQueryBase()) as privateTaskQuery;
        queryBase.personId = this.personData.id;

        const headers = {
            "Authorization": "Bearer " + this.accessToken,
            'Content-Type': 'application/json;charset=UTF-8'
        };

        return (await axios({
            method: 'POST',
            url: API_URL + '/removePersonalTask/' + taskId,
            data: queryBase,
            headers: headers
        })).status == 200
    }

    public async getNewToken(): Promise < refreshTokenResponse > {
        let refreshTokenData = new URLSearchParams();
        refreshTokenData.append('grant_type', 'refresh_token');
        refreshTokenData.append('client_id', 'mKool');
        refreshTokenData.append('refresh_token', this.refreshToken);

        const data = (await axios.post(SERVER_ROOT_URL + 'auth/oauth/token', refreshTokenData, {
            headers: {
                'Authorization': 'Basic bUtvb2w6azZoOTdoYWZzcnZvbzNzZDEzZ21kdXE4YjZ0YnM1czE2anFtYTZydThmajN0dWVhdG5lOGE4amxtN2Jt',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })).data as refreshTokenResponse

        this.refreshToken = data.refresh_token;
        this.accessToken = data.access_token;

        return data;

    }

    /**
     * Generates a URL for a chart image representing provided grade's statistics.
     * Requires active eKool premium
     * @param gradeId ID of a grade
     * @returns chart image URL
     */
    public async getChartForGrade(gradeId: string | number): Promise < string > {
        const gradeDetailData = await this.getGradeDetailData(String(gradeId));
        if (gradeDetailData.statistics) {
            let gradesT: string[] = [];
            let amounts: string[] = [];
            gradeDetailData.statistics.forEach(row => {
                gradesT.push(row.abbr);
                amounts.push(String(row.count));
            })
            var grades = gradesT.join("|")
            var thisGradeChart = new ImageCharts()
                .cht("bvs")
                .chd(`a:${amounts.toString()}`)
                .chxt("x,y")
                .chxl(`0:|${grades}`)
                .chco("90EE90")
                .chs("700x290")
                .chof(".png")
                .chtt(gradeDetailData.subjectName)
                .toURL();

            return thisGradeChart;
        }
    }

    /**
     * Retreives data from eKool's API
     * @param pathElements API URL path elements
     */
    private async _dataMiner(...pathElements: string[]): Promise < any > {
        let url = API_URL;
        pathElements.forEach((pathElement) => {
            url = url + '/' + pathElement;
        });

        const defaultPayload = this._getStampedBase(this._getQueryBase());

        const headers = {
            "Authorization": "Bearer " + this.accessToken,
            'Content-Type': 'application/json;charset=UTF-8'
        };

        return (await axios({
            method: 'POST',
            url: url,
            data: defaultPayload,
            headers: headers
        })).data

    }

    /**
     * Creates an md5 hash of a query base and returns a base with it in it
     * @param queryBase base to stamp
     * @returns stamped base
     */
    private _getStampedBase(queryBase: queryBase): queryBase {
        let checksumString = ''
        checksumString += queryBase.langCode;
        checksumString += queryBase.version.split('').reverse().join("");
        checksumString += queryBase.deviceId;
        checksumString += queryBase.userAgent;
        checksumString += queryBase.pushType;
        checksumString += queryBase.version;
        checksumString += queryBase.localTime;
        queryBase.checksum = String(md5(checksumString));
        return queryBase;
    }

    /**
     * Generate default query base for a request
     * @returns query base
     */
    private _getQueryBase(): queryBase {
        return {
            langCode: 'et',
            version: "4.6.6",
            deviceId: "1234567",
            userAgent: "Google Chrome",
            checksum: null as any,
            pushType: '1',
            localTime: String(new Date().getTime()),
            gradePush: true,
            absencePush: true,
            noticePush: true,
            todoPush: true,
            messagePush: true
        }
    }
}