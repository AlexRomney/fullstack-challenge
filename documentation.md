************************************
CHALLENGE 1
************************************

- Added the accounts table keeping it simple and matching the organizations
table columns. I decided to leave organization_id out of the accounts table and leave them both as stand alones, but they have a has-many-through relationship when deals are made.

- Added the deals table with the columns that were stated in the instructions. The table also has an organization_id and account_id since a deal belongs to both. I made the value column an INTEGER instead of a REAL so I can store the value in cents and do the manipulation/division to USD on the backend to avoid any rounding issues. I am making the status default to active and making sure it's only one of three options - active, paused or cancelled.

- Added seeder and logic to run or not run based on organizations count for ease of viewing the app as I intended. Added dayjs package for easy date fields in the deals seeder.

- Added a helpers folder and file to host shared functions used in multiple spots. I'm used sure what the norm is with express/typescript but the concept of dry code and extracting is the same.

- Added a types.ts file to store all the type interfaces.

- Added all the endpoints I will need for how I plan to structure the frontend views.

************************************
CHALLENGE 2
************************************



************************************
CHALLENGE 3
************************************