import { personData, familyData, premiumPackage, tasks, lessons, timetable, gradeDetails, feedItem } from './interfaces';
import { ekoolDate, feed, something } from './types';
export declare class EKool {
    accessToken: string;
    refreshToken: string;
    personData: personData;
    studentID: number | string;
    family: familyData;
    constructor(accessToken?: string, refreshToken?: string);
    login(username: string, password: string): Promise<void>;
    getPersonData(): Promise<personData>;
    getFamily(): Promise<familyData>;
    getPremiumPackages(): Promise<premiumPackage>;
    getAbsencesForStudent(): Promise<any[]>;
    getTasksForStudent(start: ekoolDate, end: ekoolDate): Promise<tasks>;
    getLessonsForStudents(start: ekoolDate, end: ekoolDate): Promise<lessons>;
    getTimetableForStudents(start: ekoolDate, end: ekoolDate): Promise<timetable>;
    getLessonWithDescriptionForAbsenceId(absenceID: string | number): Promise<something>;
    getGradeDetailData(gradeID: string | number): Promise<gradeDetails>;
    getSubjectGradeForStudentSubject(subjectID: string | number): Promise<something>;
    getFeedItem(eventId: string | number): Promise<feedItem>;
    getFeedForStudent(): Promise<feed>;
    getThread(threadId: string | number): Promise<something>;
    getDilBehGradesForTypeId(typeId: string | number): Promise<something>;
    getSubjectWithCoursesAndJournals(): Promise<something>;
    getGradesForTermByJournal(selectedJournalId: string | number, gradeId: string | number): Promise<something>;
    getConsolidatedGradesByJournal(journalId: string | number): Promise<something>;
    private getStudentId;
    formatDate(timestamp: number | Date | string): ekoolDate;
    getChartForGrade(gradeId: string | number): Promise<string>;
    private _dataMiner;
    private _getStampedBase;
    private _getQueryBase;
}
//# sourceMappingURL=index.d.ts.map