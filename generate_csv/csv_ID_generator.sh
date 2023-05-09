#!/bin/bash

# Function to generate a random number between a given range
function generate_random_number() {
  echo $((RANDOM % 10))
}


  prefixes=("John" "David" "Michael" "Christopher" "James" "Robert" "Daniel" "Matthew" "Joseph" "William" "Andrew" "Benjamin" "Charles" "Donald" "Edward" "Frank" "George" "Henry" "Isaac" "Jacob" "Kevin" "Larry" "Mark" "Nathan" "Oscar" "Patrick" "Quentin" "Richard" "Stephen" "Thomas" "Ulysses" "Vincent" "Walter" "Xavier" "Yousef" "Zachary" "Adam" "Brandon" "Caleb" "Derek" "Ethan" "Felix" "Gavin" "Hector" "Ian" "Jason" "Kyle" "Liam" "Mason" "Noah" "Oliver" "Peter" "Quinn" "Ryan" "Samuel" "Tyler" "Victor" "Wyatt" "Xander" "Yan" "Zion" "Albert" "Brian" "Carl" "Davidson" "Eric" "Frederick" "Gregory" "Harold" "Isaiah" "Jonathan" "Kenneth" "Landon" "Marcus" "Nolan" "Owen" "Percy" "Quincy" "Robertson" "Sebastian" "Travis" "Uriel" "Vernon" "Wesley" "Xylon" "Yale" "Zander" "Aaron" "Brent" "Colin" "Dante" "Emmett" "Finn" "Gage" "Hunter" "Isiah" "Jared" "Kaden" "Landon" "Maxwell" "Nash" "Orlando" "Parker" "Quinn" "Raymond" "Seth" "Trevor" "Ulrich" "Valentino" "Weston" "Xerxes" "Yandel" "Zaid")
  suffixes=("Smith" "Johnson" "Brown" "Taylor" "Miller" "Wilson" "Moore" "Anderson" "Clark" "Lewis" "Martin" "Lee" "Garcia" "Davis" "Rodriguez" "Martinez" "Hernandez" "Lopez" "Gonzalez" "Perez" "Jackson" "Thomas" "Thompson" "Robinson" "White" "Harris" "Martin" "Jackson" "Phillips" "King" "Johnson" "Hill" "Green" "Baker" "Campbell" "Carter" "Clark" "Collins" "Edwards" "Foster" "Gomez" "Gray" "Hall" "James" "Jenkins" "Kelly" "Kim" "Long" "Morgan" "Murphy" "Nelson" "Perry" "Rivera" "Russell" "Simmons" "Stewart" "Wright" "Young" "Adams" "Allen" "Bailey" "Bell" "Brooks" "Butler" "Cruz" "Diaz" "Flores" "Hayes" "Howard" "James" "Jones" "Khan" "Lopez" "Marshall" "Murray" "Myers" "Nelson" "Nguyen" "Ortega" "Patel" "Powell" "Ramirez");
  
# Function to generate a random color
function generate_random_color() {
  colors=("red" "green" "blue" "yellow" "orange" "purple" "pink" "brown")
  echo ${colors[$((RANDOM % ${#colors[@]}))]}
}

# Generate table headers
echo -e "Number,Name,FName,Image,Color,RandomN"> output.csv

# Generate table rows


  # Generate 100 columns
  for ((j=1; j<=100; j++))
  do
    echo -ne "$j,">> output.csv
    echo -ne "${suffixes[$((RANDOM % ${#suffixes[@]}))]},">> output.csv
    echo -ne "${prefixes[$((RANDOM % ${#prefixes[@]}))]},">> output.csv
    echo -ne "img$((RANDOM % 10)).jpeg,">> output.csv
    echo -ne "$(generate_random_color),">> output.csv
    echo -e "$(generate_random_number 1 100)">> output.csv
  done

  echo  # Move to the next row
