import { ekoolDate, gradeType } from "./types";
import { taskPriorityLevels } from "./enums"

/* 
Some fields state "unknown" because they sometimes have a certain value, 
but I couldn't find it because that data is not set up to be shown in my school 
*/

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
    userProfileImhFn: unknown;
    timetableUrl: string;
}

interface person {
    name1: string;
    name2: string;
    profileImgFn: unknown;
}

export interface task {
    authorName: string;
    title: string;
    orderTimestampLong: number;
    content: string;
    comments: unknown[];
    id: number;
    teacherAttachments: unknown[];
    studentAttachments: unknown[]
    institutionId: number;
    todoRolePersonId: unknown;
    isHot: unknown;
    subjectName: string;
    deadLine: ekoolDate;
    added: string;
    isDone: unknown[];
    isTest: boolean;
    isGraded: boolean;
    allowStudentSubmission: boolean;
    commentIsPublic: unknown;
    typeId: number;
}

export interface lesson {
    id: number;
    courseName: string;
    subjectName: string;
    lessonNumber: number;
    eventDate: number;
    events: Array<any>;
    authorName: string;
    name: string;
}

export interface absence {
    id: number;
    lessonDate: ekoolDate;
    lessonNumber: number;
    lessonEventId: number;
    code: string;
    codeExplanation: string;
    subjectName: string;
    orderSeq: number;
    teacherName: string;
    insertedTimestamp: number;
    reason: boolean;
    lateness: boolean;
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
    profileImgFn: unknown;
    premium: boolean;
    premiumPackageType: unknown;
    expirationDate: unknown;
    recurring: unknown;
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

export interface eventUpdateQuery extends queryBase{
    studentId: number;
    todo: boolean;
    todoId: number;
}

export interface privateTaskQuery extends queryBase {
    personId: string | number;
    isDone?: boolean;
    todoPerson?: todoPerson;
    todoPriority?: todoPriority;
}

interface todoPerson {
    content: string;
    deadline?: ekoolDate;
    name: string;
}

interface todoPriority {
    id?: taskPriorityLevels;
}

export interface refreshTokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    scope: string
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
    orderTimestampLong: number;
}

export interface timetable {
    eventList: eventDetails[];
    weekNo: number;
}

export interface gradeDetails {
    id: number;
    orderSeq: unknown;
    lastModified: ekoolDate;
    itemType: unknown;
    actionType: unknown;
    hot: boolean;
    gradeTypeId: gradeType;
    gradeTypeAdditionalDesc: unknown;
    abbr: string;
    authorName: string;
    lessonDate: ekoolDate;
    subjectName: string;
    subjectId: unknown;
    termName: unknown;
    textContent: string;
    hasStatistics: boolean;
    gradeInPoints: unknown;
    maxPoints: unknown;
    journalEventDescription?: string;
    journalEventName?: string;
    fileName?: unknown;
    statistics?: statElement[];
    published: boolean;
    test: boolean;
    amendment: boolean;
}

export interface eventDetails {
    id: number;
    orderSeq: unknown;
    lastModified: ekoolDate;
    itemType: number;
    actionType: number;
    hot: boolean;
    gradeTypeId?: gradeType;
    gradeTypeAdditionalDesc?: unknown;
    abbr?: string;
    authorName: string;
    lessonDate?: ekoolDate;
    subjectName?: string;
    subjectId?: unknown;
    termName?: unknown;
    textContent?: string;
    content?: string
    hasStatistics?: boolean;
    gradeInPoints?: unknown;
    maxPoints?: unknown;
    published?: boolean;
    test?: boolean;
    amendment?: boolean;
}

export interface feedItem {
    lastEvent: eventDetails;
    dbGrade?: gradeDetails;
    previousEvents?: eventDetails[];
    statistics?: statElement[];
}