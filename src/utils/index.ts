import { initTime } from "../constants";
import { questionsData } from "../data";
import { ChangeHandlerType, FormQuestion } from "../types";

// This function decrements one second from the timer
export const decrementTimer = (time: string) => {
    let [min, sec] = time.split(" : ");
    let newTime = "";
    let secToNum = parseInt(sec);

    // If the countdown has not finished.
    if (time !== "00 : 00") {
        if (secToNum <= 10) {
            if (secToNum === 0) {
                if (min !== "00") {
                    sec = '59';
                    let minToNum = parseInt(min);

                    if (minToNum < 10) {
                        minToNum--;
                        min = `0${minToNum}`;
                    }
                }
            } else {
                secToNum--;
                sec = `0${secToNum}`;
            }
        } else {
            secToNum--;
            sec = `${secToNum}`;
        }
    }

    if (time === "00 : 00") {
        newTime = time;
    } else {
        newTime = `${min} : ${sec}`;
    }

    return newTime;
}

// This function increments the time taken to solve the quiz
export const addTime = (totalTime: string, timeToAdd: string = "") => {
    let newTime = [0, 0, 0];

    let [tHours, tMins, tSecs] = totalTime.split(" : ").map(t => parseInt(t));
    let [initMins, initSecs] = initTime.split(" : ").map(t => parseInt(t));
    let [mins, secs] = timeToAdd.split(" : ").map(t => parseInt(t));

    let initial = new Date().setHours(0, initMins, initSecs, 0);
    let current = new Date().setHours(0, mins, secs, 0);

    let diff = (initial - current) / 1000;      // Number of seconds taken to solve a question.

    // Adding seconds
    let addedSecs = tSecs + diff;
    let carryMins = 0;

    newTime[2] = addedSecs % 60;
    if (addedSecs >= 60) {
        carryMins += Math.floor(addedSecs / 60);
    }

    // Adding minutes
    let addedMins = tMins + carryMins;
    let carryHours = 0;

    newTime[1] = addedMins % 60;
    if (addedMins >= 60) {
        carryHours += Math.floor(addedMins / 60);
    }

    // Adding hours
    newTime[0] = tHours + carryHours;

    return newTime.map(t => `${t}`).join(" : ");
}

// This function generates non repeated random indexes
const generateRandomIndexes = (range: number) => {
    const indx: number[] = [];

    for (let i = 0; i < range;) {
        const num: number = Math.floor(Math.random() * (range + 1));

        if (indx.indexOf(num) === -1) {
            indx.push(num);
            i++;
        }
    }

    return indx;
}

// This function generates random questions
export const generateRandomQuestions = (range: number) => {
    const indx = generateRandomIndexes(range);

    return indx.map(ind => questionsData[ind]);
}

// This function updates the specified data in the form state.
export const changeFormState = (questions: FormQuestion[], qIndex: number, type: ChangeHandlerType, value: string = "", index: number = 0) => {
    const newQuestions: FormQuestion[] = [...questions];

    if (type === "ques") {
        newQuestions[qIndex].question = value;
    } else if (type === "option") {
        newQuestions[qIndex].options[index] = value;
    } else if (type === "correctOpt") {
        newQuestions[qIndex].correctOption = value;
    } else if (type === "incrementOption") {
        newQuestions[qIndex].numOfOptions += 1;
        newQuestions[qIndex].options = [...newQuestions[qIndex].options, ""];
    }

    return newQuestions;
}