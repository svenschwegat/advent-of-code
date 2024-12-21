// https://adventofcode.com/2024/day/1
var functions = {
    partToExecute: 0,

    readData: function(fileType, partToExecute){
        var inputFile = fileType === 'test' ? 'test_input.txt' : 'input.txt';
        functions.partToExecute = partToExecute;
        
        const fs = require('fs'); // Require Node.js as a File Server
        fs.readFile('./' + inputFile, (error, data) => {
            if(error) throw error;

            this.transformData(data.toString());
        });
    },

    transformData: function(data){
        var initialList = [], leftList = [], rightList = [], value;
        data = data.replaceAll("   ", "\r\n");
        initialList = data.split("\r\n");

        var pushNextToLeft = true;
        for(var i = 0; i < initialList.length; i++){
            value = parseInt(initialList[i], 10);
            if(pushNextToLeft){
                leftList.push(value);
                pushNextToLeft = false;
            } else {
                rightList.push(value);
                pushNextToLeft = true;
            }
        }

        switch(this.partToExecute){
            case 1:  this.sortLists(leftList, rightList); break;
            case 2:  this.getCounts(leftList, rightList); break;
            default: 
                this.sortLists(leftList, rightList);
                this.getCounts(leftList, rightList);
            break;
        }         
    },

    sortLists: function(leftList, rightList){
        var sortedLeftList = leftList.sort(function(a,b){
            return a - b;
        });

        var sortedRightList = rightList.sort(function(a,b){
            return a - b;
        });

        this.calculateDifference(sortedLeftList, sortedRightList);
        
    },

    calculateDifference: function(sortedLeftList, sortedRightList){
        var differences = 0;
        for(var i = 0; i < sortedLeftList.length; i++){
            differences += Math.abs(sortedLeftList[i] - sortedRightList[i]);
        }

        console.log('Sum total of differences for part 1', differences);
    },

    getCounts: function(leftList, rightList){
        var rightCounts = {}, leftCounts = {}, data = [];
        for(var i = 0; i < rightList.length; i++){
            rightCounts[rightList[i]] = rightCounts[rightList[i]] ? rightCounts[rightList[i]] + 1 : 1;
        }

        for(var j = 0; j < leftList.length; j++){
            data = [leftList[j], rightCounts[leftList[j]]]; // [locationId, count]
            leftCounts[j] = rightCounts[leftList[j]] ? data : [leftList[j] , 0];
        }

        this.calculateWeight(leftCounts);
    },

    calculateWeight: function(counts){
        var weightedTotal = 0, locationId, count;
        for(let [key, data] of Object.entries(counts)){
            locationId = data[0];
            count = data[1];
            weightedTotal += locationId * count;
        }

        console.log('Weighted Total for part 2: ', weightedTotal);
    }
};

// First param = 'test' for test file and second param for either part 1 or part 2 of the question
functions.readData('test');