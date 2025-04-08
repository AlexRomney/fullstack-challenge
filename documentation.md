************************************
CHALLENGE 1
************************************

- Added .env file to store important variable and enviorment specific values.

- Added the accounts table keeping it simple and matching the organizations
table columns. I decided to leave organization_id out of the accounts table and leave them both as stand alones, but they have a has-many-through relationship when deals are made.

- Added the deals table with the columns that were stated in the instructions. The table also has an organization_id and account_id since a deal belongs to both. I made the value column an INTEGER instead of a REAL so I can store the value in cents and do the manipulation/division to USD on the backend to avoid any rounding issues. I am making the status default to active and making sure it's only one of three options - active, paused or cancelled.

- Added seeder and logic to run or not run based on organizations count for ease of viewing the app as I intended. Added dayjs package for easy date fields in the deals seeder.

************************************
CHALLENGE 2
************************************



************************************
CHALLENGE 3
************************************