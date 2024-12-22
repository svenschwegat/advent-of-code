// https://adventofcode.com/2024/day/2
var functions = {
    readData: function(fileType){
        var inputFile = fileType === 'test' ? 'test_input.txt' : 'input.txt';
        
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
        var safeCount = 0, notSafeCount = 0, checkSum = 0;

        reports.forEach(function(report){
            if(functions.checkNumbers(report)){
                safeCount++;
            } else {
                notSafeCount++;
            }
        });
        checkSum = safeCount + notSafeCount;
        console.log('Safety Count Part 1', safeCount, 'total', checkSum);
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

    removeItem(array, itemToRemove){
        const index = array.indexOf(itemToRemove);

        if (index !== -1) {
            array.splice(index, 1);
        }

        return array;
    }
};

functions.readData('');