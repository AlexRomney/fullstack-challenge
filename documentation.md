************************************
OVERVIEW
************************************

- Clone repo and inside the repo's frontend and server folders run npm install and npm run dev. I stuck with sqlite and created a seeder that should run on the initial run.

- I separated each challenge into its own branch so you could see the work per task if you wanted. If not then you can merge each branch together and view it all.

- The default status for a deal is 'active' so in order to view 'paused' and 'cancelled' I manually changed them in Table Plus.

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

- Added react-router for routing structure, axios for data handling and tailwind css for easy/fast styling.

- Decided to add pages with table data to view all organizations, accounts and deals similar to what you'd see in an admin panel.

- I didn't fully understand all the different values in the screenshot so I went with displaying the numbers as I have them. Decided to go with a simple card display for every deal that an organization has.

************************************
CHALLENGE 3
************************************

- Added a simple filter that shows all the status options and years that are pertaining to the list of deals for the organization. The year filter looks at both start_date and end_date.

************************************
CONCLUSION / THOUGHTS
************************************

- Overall I really enjoyed the challenge! Not knowing React or Node at all beforehand it was a great quickstart to the frameworks and SponsorCX as well. Good job creating this assessment!

- I tried my best to figure out best practices and organization, but I'm sure things that I did aren't the norm. I hope the intent was still shown and I know I can learn that actual ways of this stack with time and more interaction.

- Related to the last point, I'm sure there are much better ways to componentize or setups helper functions or manipulate data, but I did my best with the time I had and tutorials I could review.

- I already did a little more than the challenge asked for with adding table pages for all three tables, but if I had more time to complete the project I would definitely add details pages for accounts and deals similar to organizations except specific to each. I would add functionality to the deals so they could update the status. I would add .env files to store more private data like the endpoint URL's. I figured it would be easier to not send those over so you can just clone and run the app. I assume there is a Faker type package for Node so I would use that to seed more data. I would add images to the organizations and accounts so they could display rather than the SponsorCX logo everywhere.

- Only thing that tripped me up that I can think of was the screenshot on challenge two. A lot of numbers and terms that weren't shared and I wasn't sure how to mimic that so hopefully what I did works haha

- Thank you for letting me do this challenge! I had a good time!