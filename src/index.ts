import axios from 'axios';
import { personData, queryBase, familyData, premiumPackage, tasks, lessons, timetable, gradeDetails, feedItem } from './interfaces';
import { ekoolDate, feed, something } from './types';
import ImageCharts from 'image-charts';
import md5 from 'md5';

const API_URL = 'https://postikana.ekool.eu/rest/json';
const SERVER_ROOT_URL = 'https://ekool.eu/';

export class EKool {
    accessToken!: string;
    refreshToken!: string;
    personData!: personData;
    studentID!: number | string;
    family!: familyData;

    public constructor(accessToken?: string, refreshToken?: string){
        if (accessToken) { 
            this.accessToken = accessToken;
        }
        if (refreshToken) {
            this.refreshToken = refreshToken;
        }
    }

    public async login(username: string, password: string): Promise<void> {
        const url = SERVER_ROOT_URL + 'auth/oauth/token';

        const headers = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': 'Basic bUtvb2w6azZoOTdoYWZzcnZvbzNzZDEzZ21kdXE4YjZ0YnM1czE2anFtYTZydThmajN0dWVhdG5lOGE4amxtN2Jt'
        };

        let loginData = new URLSearchParams();
        loginData.append('grant_type', 'password');
        loginData.append('client_id', 'mKool');
        loginData.append('username', username);
        loginData.append('password', password);

        await axios({
            method: 'POST',
            url: url,
            data: loginData, 
            headers: headers
        }).then((res) => {
            if(res.status != 200) {
                console.log(res.status)
                throw new Error('Unable to login');
            } else {
                this.accessToken = res.data.access_token;
                this.refreshToken = res.data.refresh_token;
            }
        });
    }

    public async getPersonData(): Promise<personData> {
        this.personData = await this._dataMiner(["person"]);
        this.studentID = this.personData.roles[0].studentId;
        return this.personData;
    }

    public async getFamily(): Promise<familyData> {
        this.family = await this._dataMiner(["family"]);
        return this.family;
    }

    public async getPremiumPackages(): Promise<premiumPackage> {
        return await this._dataMiner(["premiumPackages"]);
    }

    public async getAbsencesForStudent(): Promise<any[]> {
        return await this._dataMiner(['absences90Days'])
    }

    public async getTasksForStudent(start: ekoolDate, end: ekoolDate): Promise<tasks> {
        return await this._dataMiner(['todolist', String(this.studentID), start, end]);
    }

    public async getLessonsForStudents(start: ekoolDate, end: ekoolDate): Promise<lessons> {
        return await this._dataMiner(['lessons', String(this.studentID), start, end]);
    }

    public async getTimetableForStudents(start: ekoolDate, end: ekoolDate): Promise<timetable> {
        return await this._dataMiner(['timetable', String(this.studentID), start, end]);
    }

    public async getLessonWithDescriptionForAbsenceId(absenceID: string | number): Promise<something> {
        return await this._dataMiner(['lessonEventByAbsence', String(this.studentID), String(absenceID)])
    }

    public async getGradeDetailData(gradeID: string | number): Promise<gradeDetails> {
        return await this._dataMiner(['grades', String(this.studentID), String(gradeID)])
    }

    public async getSubjectGradeForStudentSubject(subjectID: string | number): Promise<something> {
        return await this._dataMiner(['subjGrade', String(this.studentID), String(subjectID)]);
    }

    public async getFeedItem(eventId: string | number): Promise<feedItem> {
        return await this._dataMiner(['feeditem', String(this.studentID), String(eventId)]);   
    }

    public async getFeedForStudent(): Promise<feed> {
        return await this._dataMiner(['feed', String(this.studentID)]);
    }

    public async getThread(threadId: string | number): Promise<something> {
        return await this._dataMiner(['thread', String(threadId)]);
    }

    public async getDilBehGradesForTypeId(typeId: string | number): Promise<something> {
        return await this._dataMiner(['grades/dilbeh', String(this.studentID), String(typeId)]);
    }

    public async getSubjectWithCoursesAndJournals(): Promise<something> {
        return await this._dataMiner(['gradesheet', String(this.studentID)]);
    }

    public async getGradesForTermByJournal(selectedJournalId: string | number, gradeId: string | number): Promise<something> {
        return await this._dataMiner(['gradesheet', String(this.studentID), 'consolidated', String(selectedJournalId), 'term', String(gradeId)]);
    }

    public async getConsolidatedGradesByJournal(journalId: string | number): Promise<something> {
        return await this._dataMiner(['gradesheet', String(this.studentID), 'consolidated', String(journalId)]);
    }

    public formatDate(timestamp: number | Date | string): ekoolDate {
        var dateObj = new Date(timestamp);
        return `${String(dateObj.getDate()).padStart(2, "0")}.${String((dateObj.getMonth())+1).padStart(2, "0")}.${String(dateObj.getFullYear())}`;
    }

    public async getChartForGrade(gradeId: string | number): Promise<string> {
        const gradeDetailData = await this.getGradeDetailData(String(gradeId));
        if(gradeDetailData.statistics) {
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

    private async _dataMiner(pathElements: string[]): Promise<any> {
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