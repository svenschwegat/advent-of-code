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
        var leftList = [], rightList = [], sortedLeftList, sortedRightList;
        var lines = data.split("\r\n");
        lines.forEach(line => {
            if(line.trim() !== ''){
                const[left, right] = line.split("   ");
                leftList.push(Number(left));
                rightList.push(Number(right));
            }
        });

        switch(this.partToExecute){
            case 1:  
                sortedLeftList = this.sortLists(leftList); 
                sortedRightList = this.sortLists(rightList); 
                this.calculateDifference(sortedLeftList, sortedRightList);
            break;
            case 2:  
                this.getCounts(leftList, rightList); 
            break;
            default:
                sortedLeftList = this.sortLists(leftList); 
                sortedRightList = this.sortLists(rightList); 
                this.calculateDifference(sortedLeftList, sortedRightList);
                this.getCounts(leftList, rightList);
            break;
        }       
    },

    sortLists: function(list){
        var sortedList = list.sort(function(a,b){
            return a - b;
        });

        return sortedList;
    },

    calculateDifference: function(sortedLeftList, sortedRightList){
        var differences = 0;
        for(var i = 0; i < sortedLeftList.length; i++){
            differences += Math.abs(sortedLeftList[i] - sortedRightList[i]);
        }

        console.log('Sum total of differences for part 1', differences);
    },

    getCounts: function(leftList, rightList){
        var rightCounts = {}, leftCounts = {}, data = [], weightedTotal = 0;
        for(var i = 0; i < rightList.length; i++){
            rightCounts[rightList[i]] = rightCounts[rightList[i]] ? rightCounts[rightList[i]] + 1 : 1;
        }

        this.calculateWeight(leftList, rightCounts);
    },

    calculateWeight: function(leftList, rightCounts){
        var weightedTotal = 0, count = 0;
        for(var i = 0; i < leftList.length; i++){
            count = rightCounts[leftList[i]] ? rightCounts[leftList[i]] : 0;
            weightedTotal += leftList[i] * count;
        }

        console.log('Weighted Total for part 2: ', weightedTotal);
    }
};

// First param = 'test' for test file and second param for either part 1 or part 2 of the question
functions.readData('');