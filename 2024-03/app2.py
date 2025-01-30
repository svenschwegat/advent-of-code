# https://adventofcode.com/2024/day/3
import os
import re

def init(inputFile):
    data = getInputData(inputFile)
    data = 'do()' + data + "don't()"
    calculateSumOfProducts(data)


def getInputData(inputFile):
    fileName = inputFile + '.txt'
    filePath = os.getcwd() + "\\2024-03\\" + fileName
    with open(filePath, 'r') as file:
        data = file.read()
    
    return data   


def calculateSumOfProducts(data):
    result = extractBetweenDos(data)
    
    pattern = r'mul\((\d+),(\d+)\)'
    matches = re.findall(pattern, result)
    
    total = 0
    for match in matches:
        int1 = int(match[0])
        int2 = int(match[1])
        total += int1 * int2
    
    print('final total #2', total)

def extractBetweenDos(data):
    start = 'do()'  
    end = "don't()"  
    results = []
    startIndex = 0

    while startIndex < len(data):
        startIndex = data.find(start, startIndex)  
        if startIndex == -1:  
            break   
        startIndex += len(start)  

        endIndex = data.find(end, startIndex)  
        if endIndex == -1:  
            break  
        
        individualString = data[startIndex : endIndex]
        results.append(individualString)    
        startIndex = endIndex + len(end)  
    
    mergedString = ''.join(results)
    return mergedString

init('input')