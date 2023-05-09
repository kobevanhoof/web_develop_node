
# Function to generate the CSV file
generate_csv_file() {
    # Your code to generate the CSV file here
    echo "Generating CSV file..."
    # Example command to generate the CSV file
    ./csv_ID_generator.sh
}

# Run the CSV generator every 5 seconds
while true; do
    generate_csv_file
    sleep 5
done