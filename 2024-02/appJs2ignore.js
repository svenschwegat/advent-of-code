// https://adventofcode.com/2024/day/2
var functions = {
    partToExecute: 0,

    readData: function(fileType, partToExecute){
        var inputFile = fileType === 'test' ? 'test_input2.txt' : 'input.txt';
        functions.partToExecute = partToExecute;
        
        const fs = require('fs'); // Require Node.js as a File Server
        fs.readFile('./' + inputFile, (error, data) => {
            if(error) throw error;

            this.transformData(data.toString());
        });
    },

    transformData: function(data){
        var reports = data.split('\r\n');
        reports = reports.map(report => {
            return report.split(' ').map(Number);
        });

        this.checkSafety(reports);
    },

    checkSafety: function(reports){
        var safeCount = 0, notSafeCount = 0, checkSum = 0, checkSum2 = 0, 
        safeCountWithDampener = 0, notSafeCountWithDampener = 0; 

        reports.forEach(function(report){
            if(functions.checkNumbers(report)){
                safeCount++;
            } else {
                notSafeCount++;
            }

            if(functions.checkNumbersWithDampener(report)){
                console.log('Safe Report', report);
                safeCountWithDampener++;
            } else {
                console.log('Not safe Report', report);
                notSafeCountWithDampener++;
            }
        });
        checkSum = safeCount + notSafeCount;
        checkSum2 = safeCountWithDampener + notSafeCountWithDampener;
        console.log('Safety Count Part 1', safeCount, 'total', checkSum);
        console.log('Safety Count Part 2', safeCountWithDampener, 'total', checkSum2);
    },

    checkNumbers: function(report){ 
        let isSafe = true, isDecreasing = true, isIncreasing = true;
        var value0, value1, difference;

        for(let i = 0; i < report.length - 1; i++){
            value0 = report[i];
            value1 = report[i + 1];
            difference = Math.abs(value0 - value1);

            if(value0 === value1){
                return isSafe = false;
            } else if(value0 > value1 && difference > 3 && isDecreasing){
                return isSafe = false;
            } else if(value0 > value1 && difference <= 3 && isDecreasing){
                isIncreasing = false;
                continue;
            }else if(value0 < value1 && difference > 3 && isIncreasing){
                return isSafe = false;
            }else if(value0 < value1 && difference <= 3 && isIncreasing){
                isDecreasing = false;
                continue;
            }else if((!isDecreasing && isIncreasing) || (isDecreasing && !isIncreasing)){
                return isSafe = false;
            }
        }

        return isSafe = true;
    },

    checkNumbersWithDampener: function(report){ 
        let isSafe = false, isDecreasing = true, isIncreasing = true;
        var value0, value1, difference;
        var newReport = [];

        for(let i = 0; i < report.length; i++){
            value0 = report[i];
            value1 = report[i + 1];
            difference = Math.abs(value0 - value1);
            console.log('damp main', i, report, value0, value1);
            if(value0 === value1){
                newReport = functions.removeItem(report, value0);
                isSafe = functions.checkNumbersWithNewReport(newReport);
            } else if(value0 > value1 && difference > 3 && isDecreasing){
                newReport = functions.removeItem(report, value0);
                isSafe = functions.checkNumbersWithNewReport(newReport);
            } else if(value0 > value1 && difference <= 3 && isDecreasing){
                isIncreasing = false;
                isSafe = true;
            }else if(value0 < value1 && difference > 3 && isIncreasing){
                newReport = functions.removeItem(report, value0);
                isSafe = functions.checkNumbersWithNewReport(newReport);
            }else if(value0 < value1 && difference <= 3 && isIncreasing){
                isDecreasing = false;
                isSafe = true;
            }else if((!isDecreasing && isIncreasing) || (isDecreasing && !isIncreasing)){
                newReport = functions.removeItem(report, value0);
                isSafe = functions.checkNumbersWithNewReport(newReport);
            }
        }

        return isSafe;
    },
    
    // Doesnt work
    checkNumbersWithNewReport: function(report){
        let isSafe = true, isDecreasing = true, isIncreasing = true;
        var value0, value1, difference, newReport = [];

        for(let i = 0; i < report.length; i++){
            value0 = report[i];
            value1 = report[i + 1];
            difference = Math.abs(value0 - value1);

            if(value0 === value1){
                return isSafe = false;
            } else if(value0 > value1 && difference > 3 && isDecreasing){
                newReport = functions.removeItem(report, value0);
                console.log('what', report, newReport, value0);
                isSafe = functions.checkNumbers(newReport);
                //isSafe = false;
            } else if(value0 > value1 && difference <= 3 && isDecreasing){
                isIncreasing = false;
                continue;
            }else if(value0 < value1 && difference > 3 && isIncreasing){
                return isSafe = false;
            }else if(value0 < value1 && difference <= 3 && isIncreasing){
                isDecreasing = false;
                continue;
            }else if((!isDecreasing && isIncreasing) || (isDecreasing && !isIncreasing)){
                return isSafe = false;
            }
        }

        return isSafe = true;
    },

    removeItem(array, itemToRemove){
        const index = array.indexOf(itemToRemove);

        if (index !== -1) {
            array.splice(index, 1);
        }

        return array;
    }
};

functions.readData('test');