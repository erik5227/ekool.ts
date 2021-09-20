"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EKool = void 0;
var axios_1 = __importDefault(require("axios"));
var image_charts_1 = __importDefault(require("image-charts"));
var md5_1 = __importDefault(require("md5"));
var API_URL = 'https://postikana.ekool.eu/rest/json';
var SERVER_ROOT_URL = 'https://ekool.eu/';
var EKool = /** @class */ (function () {
    /**
     * Create new EKool object
     * @param accessToken provide pre-retreived access token
     * @param refreshToken provide pre-retreived refresh token
     */
    function EKool(tokens) {
        this.accessToken = null;
        this.refreshToken = null;
        this.personData = null;
        this.studentID = null;
        this.family = null;
        this.accessToken = tokens[0];
        this.refreshToken = tokens[1];
    }
    /**
     * Retreives access token
     * @param email eKool email
     * @param password eKool password
     */
    EKool.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url, headers, loginData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = SERVER_ROOT_URL + 'auth/oauth/token';
                        headers = {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic bUtvb2w6azZoOTdoYWZzcnZvbzNzZDEzZ21kdXE4YjZ0YnM1czE2anFtYTZydThmajN0dWVhdG5lOGE4amxtN2Jt'
                        };
                        loginData = new URLSearchParams();
                        loginData.append('grant_type', 'password');
                        loginData.append('client_id', 'mKool');
                        loginData.append('username', email);
                        loginData.append('password', password);
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: url,
                                data: loginData,
                                headers: headers
                            }).then(function (res) {
                                if (res.status != 200) {
                                    console.log(res.status);
                                    throw new Error('Unable to login');
                                }
                                else {
                                    result = [res.data.access_token, res.data.refresh_token];
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Retreives data about person. Necessary if `EKool.studentId` is not set explicitly
     * @returns Person data payload
     */
    EKool.prototype.getPersonData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._dataMiner("person")];
                    case 1:
                        _a.personData = _b.sent();
                        this.studentID = this.personData.roles[0].studentId;
                        return [2 /*return*/, this.personData];
                }
            });
        });
    };
    /**
     * Retreives data about person's family
     * @returns Family data
     */
    EKool.prototype.getFamily = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._dataMiner("family")];
                    case 1:
                        _a.family = _b.sent();
                        return [2 /*return*/, this.family];
                }
            });
        });
    };
    /**
     * Retreives data about available premium packages
     * @returns Premium packages
     */
    EKool.prototype.getPremiumPackages = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner("premiumPackages")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives data about student's abscences for last 90 days
     * @returns Student absences
     */
    EKool.prototype.getAbsencesForStudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('absences90Days', this.getStudentId())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives data about student's tasks in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns tasks
     */
    EKool.prototype.getTasksForStudent = function (start, end) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('todolist', this.getStudentId(), start, end)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives data about student's lessons in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns lessons
     */
    EKool.prototype.getLessonsForStudents = function (start, end) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('lessons', this.getStudentId(), start, end)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives data about student's timetable in given timeframe
     * @param start timeframe beginning in ekoolDate format
     * @param end timeframe end in ekoolDate format
     * @returns timetable
     */
    EKool.prototype.getTimetableForStudents = function (start, end) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('timetable', this.getStudentId(), start, end)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives data about lessons student skipped by absence ID
     * @param absenceID absence ID
     * @returns lessons
     */
    EKool.prototype.getLessonWithDescriptionForAbsenceId = function (absenceID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('lessonEventByAbsence', this.getStudentId(), String(absenceID))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives grade's details by its ID
     * @param gradeID grade ID
     * @returns grade details
     */
    EKool.prototype.getGradeDetailData = function (gradeID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('grades', this.getStudentId(), String(gradeID))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives data about subject grade by subject ID
     * @param subjectID subject id
     * @returns subject grade
     */
    EKool.prototype.getSubjectGradeForStudentSubject = function (subjectID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('subjGrade', this.getStudentId(), String(subjectID))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives feed item details by event ID
     * @param eventId event ID
     * @returns feed item
     */
    EKool.prototype.getFeedItem = function (eventId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('feeditem', this.getStudentId(), String(eventId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives feed for student
     * @returns student feed
     */
    EKool.prototype.getFeedForStudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('feed', this.getStudentId())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EKool.prototype.updateTask = function (isDone, a, b) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deadLine, queryBase, oDate, startingDate, endingDate, startDateString, endDateString, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (b && typeof a == 'number') {
                            id = a, deadLine = b;
                        }
                        else {
                            id = a.id;
                            deadLine = a.deadLine;
                        }
                        queryBase = this._getStampedBase(this._getQueryBase());
                        queryBase.studentId = this.studentID;
                        queryBase.todo = isDone;
                        queryBase.todoId = id;
                        oDate = this.getDateFromEkoolDate(deadLine);
                        startingDate = new Date(oDate.setDate(oDate.getDate() - oDate.getDay() + (oDate.getDay() == 0 ? -6 : 1)));
                        endingDate = new Date(oDate.setDate(oDate.getDate() - oDate.getDay() + 7));
                        startDateString = this.formatDate(startingDate);
                        endDateString = this.formatDate(endingDate);
                        headers = {
                            "Authorization": "Bearer " + this.accessToken,
                            'Content-Type': 'application/json;charset=UTF-8'
                        };
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: API_URL + '/todoChange/' + startDateString + '/' + endDateString,
                                data: queryBase,
                                headers: headers
                            })];
                    case 1: return [2 /*return*/, (_a.sent()).status == 200];
                }
            });
        });
    };
    /**
     * Retreives data about thread by its ID
     * @param threadId thread id
     * @returns thread data
     */
    EKool.prototype.getThread = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('thread', String(threadId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives diligence and behaviour grades by type ID
     * @param typeId type ID
     * @returns diligence and behaviour grades
     */
    EKool.prototype.getDilBehGradesForTypeId = function (typeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('grades/dilbeh', this.getStudentId(), String(typeId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives student gradesheet
     * @returns gradesheet
     */
    EKool.prototype.getSubjectWithCoursesAndJournals = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('gradesheet', this.getStudentId())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives student term grades by journal ID
     * @param selectedJournalId ID of a journal
     * @param gradeId ID of a grade from the required term
     * @returns grades for term
     */
    EKool.prototype.getGradesForTermByJournal = function (selectedJournalId, gradeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('gradesheet', this.getStudentId(), 'consolidated', String(selectedJournalId), 'term', String(gradeId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retreives student grades by journal ID
     * @param journalId ID of a journal
     * @returns grades
     */
    EKool.prototype.getConsolidatedGradesByJournal = function (journalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('gradesheet', this.getStudentId(), 'consolidated', String(journalId))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Converts student ID to a string
     * @returns student ID
     */
    EKool.prototype.getStudentId = function () {
        return String(this.studentID);
    };
    /**
     * Returns eKool-formatted date for provided day after today
     * @param days how many days to skip
     * @returns ekoolDate day
     */
    EKool.prototype.getDaysFromNow = function (days) {
        return this.formatDate(new Date().getTime() + (days++ * 86400000));
    };
    /**
     * Remove advertisements from eKool feed
     * @param feed feed to clean
     * @returns clean feed
     */
    EKool.prototype.cleanFeed = function (feed) {
        feed.forEach(function (feedEntry) {
            // Advertisement item type is 20
            if (feedEntry.itemType === 20) {
                feed.splice(feed.indexOf(feedEntry), 1);
            }
        });
        return feed;
    };
    /**
     * Converts date into a eKool-friendly format
     * @param timestamp time in milliseconds
     * @returns time in eKool-friendly format
     */
    EKool.prototype.formatDate = function (timestamp) {
        var dateObj = new Date(timestamp);
        return String(dateObj.getDate()).padStart(2, "0") + "." + String((dateObj.getMonth()) + 1).padStart(2, "0") + "." + String(dateObj.getFullYear());
    };
    /**
     * Converts ekoolDate string to Date object
     * @param ekoolDate ekoolDate string
     * @returns Date object of the date
     */
    EKool.prototype.getDateFromEkoolDate = function (ekoolDate) {
        return new Date(ekoolDate.split('.').reverse().join('-'));
    };
    /**
     * Creates a new personal task visible by student only
     * @param name Title for the task
     * @param content Description of the task
     * @param isDone Whether or not to mark the task
     * @param deadline Deadline to set for the task
     * @param priority Priority for the task
     * @returns true if task was added successfully
     */
    EKool.prototype.createPersonalTask = function (name, content, isDone, deadline, priority) {
        return __awaiter(this, void 0, void 0, function () {
            var queryBase, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBase = this._getStampedBase(this._getQueryBase());
                        queryBase.personId = this.personData.id;
                        queryBase.isDone = isDone;
                        queryBase.todoPerson = {
                            content: content,
                            deadline: new Date(deadline.getTime() - (deadline.getTimezoneOffset() * 60000)).toISOString().split("T")[0],
                            name: name
                        };
                        queryBase.todoPriority = {
                            id: priority
                        };
                        headers = {
                            "Authorization": "Bearer " + this.accessToken,
                            'Content-Type': 'application/json;charset=UTF-8'
                        };
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: API_URL + '/addNewPersonalTask',
                                data: queryBase,
                                headers: headers
                            })];
                    case 1: return [2 /*return*/, (_a.sent()).status == 200];
                }
            });
        });
    };
    /**
     * Updates personal task
     * @param rolePersonId Usually the same as task id
     * @param name New title for the task
     * @param content New description for the task
     * @returns true if task was successfully updated
     */
    EKool.prototype.updatePersonalTask = function (rolePersonId, name, content) {
        return __awaiter(this, void 0, void 0, function () {
            var queryBase, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBase = this._getStampedBase(this._getQueryBase());
                        queryBase.personId = this.personData.id;
                        queryBase.todoPerson = {
                            content: content,
                            name: name
                        };
                        queryBase.todoPriority = {};
                        headers = {
                            "Authorization": "Bearer " + this.accessToken,
                            'Content-Type': 'application/json;charset=UTF-8'
                        };
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: API_URL + '/updatePersonalTask/' + rolePersonId,
                                data: queryBase,
                                headers: headers
                            })];
                    case 1: return [2 /*return*/, (_a.sent()).status == 200];
                }
            });
        });
    };
    /**
     * Removes specified personal task
     * @param taskId ID of a task to remove
     * @returns true if task was removed successfully
     */
    EKool.prototype.removePersonalTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var queryBase, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryBase = this._getStampedBase(this._getQueryBase());
                        queryBase.personId = this.personData.id;
                        headers = {
                            "Authorization": "Bearer " + this.accessToken,
                            'Content-Type': 'application/json;charset=UTF-8'
                        };
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: API_URL + '/removePersonalTask/' + taskId,
                                data: queryBase,
                                headers: headers
                            })];
                    case 1: return [2 /*return*/, (_a.sent()).status == 200];
                }
            });
        });
    };
    EKool.prototype.getNewToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshTokenData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshTokenData = new URLSearchParams();
                        refreshTokenData.append('grant_type', 'refresh_token');
                        refreshTokenData.append('client_id', 'mKool');
                        refreshTokenData.append('refresh_token', this.refreshToken);
                        return [4 /*yield*/, axios_1.default.post(SERVER_ROOT_URL + 'auth/oauth/token', refreshTokenData, {
                                headers: {
                                    'Authorization': 'Basic bUtvb2w6azZoOTdoYWZzcnZvbzNzZDEzZ21kdXE4YjZ0YnM1czE2anFtYTZydThmajN0dWVhdG5lOGE4amxtN2Jt',
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        this.refreshToken = data.refresh_token;
                        this.accessToken = data.access_token;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Generates a URL for a chart image representing provided grade's statistics.
     * Requires active eKool premium
     * @param gradeId ID of a grade
     * @returns chart image URL
     */
    EKool.prototype.getChartForGrade = function (gradeId) {
        return __awaiter(this, void 0, void 0, function () {
            var gradeDetailData, gradesT_1, amounts_1, grades, thisGradeChart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGradeDetailData(String(gradeId))];
                    case 1:
                        gradeDetailData = _a.sent();
                        if (gradeDetailData.statistics) {
                            gradesT_1 = [];
                            amounts_1 = [];
                            gradeDetailData.statistics.forEach(function (row) {
                                gradesT_1.push(row.abbr);
                                amounts_1.push(String(row.count));
                            });
                            grades = gradesT_1.join("|");
                            thisGradeChart = new image_charts_1.default()
                                .cht("bvs")
                                .chd("a:" + amounts_1.toString())
                                .chxt("x,y")
                                .chxl("0:|" + grades)
                                .chco("90EE90")
                                .chs("700x290")
                                .chof(".png")
                                .chtt(gradeDetailData.subjectName)
                                .toURL();
                            return [2 /*return*/, thisGradeChart];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retreives data from eKool's API
     * @param pathElements API URL path elements
     */
    EKool.prototype._dataMiner = function () {
        var pathElements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pathElements[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var url, defaultPayload, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = API_URL;
                        pathElements.forEach(function (pathElement) {
                            url = url + '/' + pathElement;
                        });
                        defaultPayload = this._getStampedBase(this._getQueryBase());
                        headers = {
                            "Authorization": "Bearer " + this.accessToken,
                            'Content-Type': 'application/json;charset=UTF-8'
                        };
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: url,
                                data: defaultPayload,
                                headers: headers
                            })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Creates an md5 hash of a query base and returns a base with it in it
     * @param queryBase base to stamp
     * @returns stamped base
     */
    EKool.prototype._getStampedBase = function (queryBase) {
        var checksumString = '';
        checksumString += queryBase.langCode;
        checksumString += queryBase.version.split('').reverse().join("");
        checksumString += queryBase.deviceId;
        checksumString += queryBase.userAgent;
        checksumString += queryBase.pushType;
        checksumString += queryBase.version;
        checksumString += queryBase.localTime;
        queryBase.checksum = String(md5_1.default(checksumString));
        return queryBase;
    };
    /**
     * Generate default query base for a request
     * @returns query base
     */
    EKool.prototype._getQueryBase = function () {
        return {
            langCode: 'et',
            version: "4.6.6",
            deviceId: "1234567",
            userAgent: "Google Chrome",
            checksum: null,
            pushType: '1',
            localTime: String(new Date().getTime()),
            gradePush: true,
            absencePush: true,
            noticePush: true,
            todoPush: true,
            messagePush: true
        };
    };
    return EKool;
}());
exports.EKool = EKool;
//# sourceMappingURL=index.js.map