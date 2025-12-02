def init(file_path):
    lines = read_file(file_path)
    solve_password(lines)

def read_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        return lines

def solve_password(lines):
    pointer_position = 50
    zero_counter = 0
    max_value = 100

    for index, line in enumerate(lines):
        item = line.strip()
        direction = item[0]
        value = item[1:]
        movement = int(value[-2:]) 

        if(direction == 'L'):
            new_position = pointer_position - movement
            if(new_position < 0):
                pointer_position = max_value - abs(new_position)
            else:
                pointer_position = new_position
        else: # = R
            new_position = pointer_position + movement
            if(new_position > 99):
                pointer_position = abs(new_position) - max_value
            else:
                pointer_position = new_position
        
        if(pointer_position == 0):
            zero_counter += 1

    print('Zero counter', zero_counter)

init('input.txt')