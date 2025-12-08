def init(file_path):
    ranges = read_file(file_path)
    identify_false_ids(ranges)

def read_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        ranges = lines[0].split(',')
        return ranges
    
def identify_false_ids(ranges):
    solution_sum = 0
    for index, id_range in enumerate(ranges):
        numbers = str(id_range).split('-')
        start_range = int(numbers[0])
        end_range = int(numbers[1])

        for id in range(start_range, end_range + 1):
            if(is_invalid_id(id)):
                solution_sum += int(id)
    
    print(f"Sum of invalid IDs {solution_sum}")
            
        
def is_invalid_id(id):
    id_string = str(id)
    length = len(id_string)
    if(length % 2 > 0 or id_string[0] == '0'):
        return False
    
    half_len = int(length / 2)    
    is_invalid = id_string[0:half_len] == id_string[half_len:]
    return is_invalid

init('input.txt')