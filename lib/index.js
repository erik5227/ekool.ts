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
    function EKool(accessToken, refreshToken) {
        if (accessToken) {
            this.accessToken = accessToken;
        }
        if (refreshToken) {
            this.refreshToken = refreshToken;
        }
    }
    EKool.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var url, headers, loginData;
            var _this = this;
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
                        loginData.append('username', username);
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
                                    _this.accessToken = res.data.access_token;
                                    _this.refreshToken = res.data.refresh_token;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    EKool.prototype.getAbsencesForStudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._dataMiner('absences90Days')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
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
    EKool.prototype.getStudentId = function () {
        return String(this.studentID);
    };
    EKool.prototype.formatDate = function (timestamp) {
        var dateObj = new Date(timestamp);
        return String(dateObj.getDate()).padStart(2, "0") + "." + String((dateObj.getMonth()) + 1).padStart(2, "0") + "." + String(dateObj.getFullYear());
    };
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