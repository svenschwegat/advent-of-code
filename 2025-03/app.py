def init(file_path):
    batteries = read_file(file_path)
    sum_max_joltages = get_sum_max_joltages(batteries)
    print(f'Sum of max joltages: {sum_max_joltages}')

def read_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        return lines

def get_sum_max_joltages(batteries):
    sum_max_joltages = 0

    for bank in batteries:
        joltages = get_joltages(bank)
        max_joltage = max(joltages)
        sum_max_joltages += max_joltage
    
    return sum_max_joltages

def get_joltages(bank):
    joltages = []
    bank = bank.replace('\n', '')

    for start_pos in range(0, len(bank) - 1):
        for end_pos in range(start_pos + 1, len(bank)):
            joltage = int(str(bank[start_pos]) + str(bank[end_pos]))
            joltages.append(joltage)

    return joltages
    
init('input.txt')