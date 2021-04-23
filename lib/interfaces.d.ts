import { ekoolDate, gradeType, something } from "./types";
interface adData {
    gender: string[];
    cities: string[];
    roles: string[];
    ip: string[];
    language: string[];
    isInTallinn: string[];
    countries: string[];
    institution: string[];
    environment: string[];
    rolesWithClasses: string[];
    hasPremium: string[];
    counties: string[];
    age: string[];
}
interface role {
    personId: number;
    studentId: number;
    firstName: string;
    lastName: string;
    schoolName: string;
    curriculumTypeId: number;
    newNotificationsAmount: number;
    isMe: boolean;
    gender: string;
    allowedPersonId: number;
    newGrades: number;
    newAbsences: number;
    newTodos: number;
    newFeedEvents: number;
    mKoolActivated: boolean;
    userProfileImhFn: something;
    timetableUrl: string;
}
interface person {
    name1: string;
    name2: string;
    profileImgFn: something;
}
interface task {
    authorName: string;
    title: string;
    orderTimestampLong: number;
    content: string;
    comments: something[];
    id: number;
    teacherAttachments: something[];
    studentAttachments: something[];
    institutionId: number;
    todoRolePersonId: something;
    isHot: something;
    subjectName: string;
    deadLine: ekoolDate;
    added: string;
    isDone: something[];
    isTest: boolean;
    isGraded: boolean;
    allowStudentSubmission: boolean;
    commentIsPublic: something;
    typeId: number;
}
interface lesson {
    id: number;
    courseName: string;
    subjectName: string;
    lessonNumber: number;
    eventDate: number;
    events: Array<any>;
    authorName: string;
    name: string;
}
interface statElement {
    count: number;
    abbr: string;
    cutoff: number;
}
export interface personData {
    id: number;
    name1: string;
    name2: string;
    profileImgFn: something;
    premium: boolean;
    premiumPackageType: something;
    expirationDate: something;
    recurring: something;
    adData: adData;
    roles: role[];
}
export interface queryBase {
    langCode: string;
    version: string;
    deviceId: string;
    userAgent: string;
    checksum: string;
    pushType: string;
    localTime: string;
    gradePush: boolean;
    absencePush: boolean;
    noticePush: boolean;
    todoPush: boolean;
    messagePush: boolean;
}
export interface familyData {
    students: person[];
    parents: person[];
}
export interface premiumPackage {
    id: number;
    name: string;
    price: number;
    currency: string;
    durationUnit: string;
    planType: number;
    recurring: boolean;
}
export interface tasks {
    startDate: string;
    endDate: string;
    weekNo: number;
    eventList: task[];
    orderTimestampLong: number;
}
export interface lessons {
    startDate: string;
    endDate: string;
    weekNo: number;
    eventList: lesson[];
    orderTimestampLong: something;
}
export interface timetable {
    eventList: something[];
    weekNo: number;
}
export interface gradeDetails {
    id: number;
    orderSeq: something;
    lastModified: ekoolDate;
    itemType: something;
    actionType: something;
    hot: boolean;
    gradeTypeId: gradeType;
    gradeTypeAdditionalDesc: something;
    abbr: string;
    authorName: string;
    lessonDate: ekoolDate;
    subjectName: string;
    subjectId: something;
    termName: something;
    textContent: string;
    hasStatistics: boolean;
    gradeInPoints: something;
    maxPoints: something;
    journalEventDescription?: string;
    journalEventName?: string;
    fileName?: something;
    statistics?: statElement[];
    published: boolean;
    test: boolean;
    amendment: boolean;
}
export interface eventDetails {
    id: number;
    orderSeq: something;
    lastModified: ekoolDate;
    itemType: something;
    actionType: something;
    hot: boolean;
    gradeTypeId: gradeType;
    gradeTypeAdditionalDesc: something;
    abbr: string;
    authorName: string;
    lessonDate: ekoolDate;
    subjectName: string;
    subjectId: something;
    termName: something;
    textContent: string;
    hasStatistics: boolean;
    gradeInPoints: something;
    maxPoints: something;
    published: boolean;
    test: boolean;
    amendment: boolean;
}
export interface feedItem {
    lastEvent: eventDetails;
    dbGrade?: gradeDetails;
    previousEvents?: eventDetails[];
    statistics?: statElement[];
}
export {};
//# sourceMappingURL=interfaces.d.ts.map