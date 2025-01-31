# https://adventofcode.com/2024/day/4
import os
searchTerm1 = 'XMAS'
searchTerm2 = 'SAMX'

def init(inputFile):
    totalCount = 0
    data = getInputData(inputFile)
    totalCount += countXmasHorizontal(data)
    totalCount += countXmasVertical(data)
    totalCount += countXmasAcrossLeft(data)
    totalCount += countXmasAcrossRight(data)

    print('Total for #1', totalCount)

def getInputData(inputFile):
    fileName = inputFile + '.txt'
    filePath = os.getcwd() + "\\2024-04\\" + fileName

    data = []
    with open(filePath, 'r') as file:
        for line in file:
            data.append(line.rstrip())
    
    return data

def countXmasHorizontal(data):
    count = 0
    for line in data:
        count += line.count(searchTerm1) + line.count(searchTerm2)
    print('Horizontal', count)
    return count

def countXmasVertical(data):
    count = 0
    posY = 0
    posX = 0
    lengthY = len(data)

    i = 0
    while i < lengthY:
        if(posY + 3 < lengthY):
            firstChar  = data[posY][posX]
            secondChar = data[posY + 1][posX]
            thirdChar  = data[posY + 2][posX]
            fourthChar = data[posY + 3][posX]

            potentialString = firstChar + secondChar + thirdChar + fourthChar
            if(potentialString == searchTerm1 or potentialString == searchTerm2):
                count += 1

            posY += 1
        else:
            lengthX = len(data[posY])
            if(posX < lengthX - 1):
                posX += 1
                posY = 0
                i = 0
            else:
                print('Vertical', count)
                return count

def countXmasAcrossLeft(data):
    count = 0
    posX = 0
    posY = 0
    lengthX = len(data[0])
    lengthY = len(data)
    
    i = 0
    while i < lengthY:
        if(posY + 3 < lengthY and posX + 3 < lengthX):
            firstChar  = data[posY][posX]
            secondChar = data[posY + 1][posX + 1]
            thirdChar  = data[posY + 2][posX + 2]
            fourthChar = data[posY + 3][posX + 3]

            potentialString = firstChar + secondChar + thirdChar + fourthChar
            if(potentialString == searchTerm1 or potentialString == searchTerm2):
                count += 1

            posY += 1
        else:
            if(posX < lengthX - 1):
                posX += 1
                posY = 0
                i = 0
            else:
                print('Across left', count)
                return count

def countXmasAcrossRight(data):
    count = 0
    lengthX = len(data[0])
    lengthY = len(data)
    posX = lengthX - 1
    posY = 0
    
    i = 0
    while i < lengthY:
        if(posX - 3 >= 0):
            firstChar  = data[posY][posX]
            secondChar = data[posY + 1][posX - 1]
            thirdChar  = data[posY + 2][posX - 2]
            fourthChar = data[posY + 3][posX - 3]

            potentialString = firstChar + secondChar + thirdChar + fourthChar
            if(potentialString == searchTerm1 or potentialString == searchTerm2):
                count += 1
            
            posX -= 1
        else: 
            if(posY < lengthY - 4):
                posY += 1
                posX = lengthX - 1
                i = 0
            else:
                print('Across right', count)
                return count

    
init('input')