# DAT076-Schedule
Hosted at: [schedule-f6ba8.firebaseapp.com]

To deploy on localhost:

Requires npm (get from [https://www.npmjs.com/get-npm])

1. Clone this repo (git clone https://github.com/oscarnnn/DAT076-Schedule.git) to prefered location

2. Go to [https://console.firebase.google.com] and sign in or create an account.

3. Add project

    -   Click "Add project"
    -   Give the project a name
    -   Choose the "Analytics location"
    -   Choose the "Cloud Firestore location"
    -   Tick all the boxes
    -   Click "Create project"

4. Set up project in Firebase

    Set up Authentication
    -   Click "Develop" and then "Authentication" in the navigation menu
    -   Click "Set up sign-in method"
    -   Click the "Email/Password" bar, click the "Enable" switch and then the "Save" button

    Set up Firestore(Database)
    -   Click "Database" in the navigation menu
    -   Click the "Create database" button, select "Start in test mode" and press "Enable"
    
    Create settings file
    -   Click "Project Overview" in the navigation menu
    -   Click the "</>" button on the page
    -   Copy everything inside the curly brackets 
        (this information should not be made public and dev.js is therefore in the .gitignore)
    -   Create a file "dev.js" in "Projectname"\src\config
    -   In dev.js write:
        
            export const FirebaseConfig = { PASTE_HERE };
        
        and inside the brackets paste what you copied from Firebase(and remove "PASTE_HERE")

5. Install and Run
    -   In a terminal that can access npm, cd to the project base
    -   Execute the following commands:
    
        npm install

        npm start

    -   The application should now be hosted on localhost (usually [http://localhost:3000])
