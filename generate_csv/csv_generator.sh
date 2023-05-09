#!/bin/bash

# Function to generate a random number between 0 and 9
generate_random_number() {
    echo $((RANDOM % 10))
}
names=("John" "Jane" "Mark" "Emma" "Luke" "Lily" "Alex" "Anna" "Eric" "Kobe")
# Generate the CSV file
generate_csv_file() {
    # Create the CSV file with headers
    echo "-0|name-,-1|name-,-2|name-,-3|name-,-4|name-,-5|name-,-6|name-,-7|name-,-8|name-,-9|name-" > output.csv

    # Generate the content of the CSV file
    for ((i = 1; i <= 100; i++)); do
        line=""
        for ((j = 1; j <= 10; j++)); do
            random_number=$(generate_random_number)
            name_index=$(generate_random_number)
            cell="-${random_number}|${names[name_index]}-"
            line+="${cell},"
        done
        # Remove the trailing comma from the line
        line="${line%,}"
        echo "$line" >> output.csv
    done

    echo "CSV file generated successfully."
}

# Call the function to generate the CSV file
generate_csv_file