def read_file_to_dict(file_path):
    result = {}
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for index, line in enumerate(lines):
            result[index] = [int(item) for item in line.strip().split()]
    return result


# Start
file_path = 'test_input.txt'
data = read_file_to_dict(file_path)
print(data)