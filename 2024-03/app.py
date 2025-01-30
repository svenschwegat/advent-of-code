# https://adventofcode.com/2024/day/3
import os
import re

def init(inputFile):
    data = getInputData(inputFile)
    calculateSumOfProducts(data)


def getInputData(inputFile):
    fileName = inputFile + '.txt'
    filePath = os.getcwd() + "\\2024-03\\" + fileName
    with open(filePath, 'r') as file:
        data = file.read()
    
    return data   


def calculateSumOfProducts(data):
    pattern = r'mul\((\d+),(\d+)\)'
    matches = re.findall(pattern, data)

    total = 0
    for match in matches:
        int1 = int(match[0])
        int2 = int(match[1])
        total += int1 * int2
    
    print('final total #1', total)

init('input')