# my-portfolio_project
End of foundations ALX

The Glog



                      
![Screenshot 2024-07-11 021425](https://github.com/gidemho/my-portfolio_project/assets/135678932/add484a6-f672-424b-b876-fd5c23512c22)



   
Features

User-friendly Interface: Intuitive and clean UI for an enhanced user experience.

Customizable Design: Users can personalize their blog's appearance.

Content Control: Users have full ownership of their content and data.

Scalable Architecture: Designed to handle a growing user base and increased traffic.

Responsive Design: Optimized for both desktop and mobile devices.

Technologies Used

Frontend
React
Tailwind CSS
Axios

Backend
Express.js
MongoDB

Infrastructures 
Branching and merging strategy 
GitHub Flow 
Main Branch: main branch is the production-ready branch that always contains the most stable and tested code.
feature Branches: for each new feature or bug fixed create a new branch from main
Pull requests:once a feature or fix is completed,open a pull request to merge the changes back into the main branch. Then do a code review and delete the feature branch after merging has been approved to keep a clean repository.
Deployment Stategy
Staging Environment:Before deploying to production, deploy the code to a staging environment to test new features and fixes in a production-like setting. This helps identify any issues that might not be apparent in a development environment.
co Deployment (CD):We will use GitHub Actions for CD. Set up workflows to automatically run tests and deploy to the staging environment on every push to the ‘main’ branch.Once changes are verified in the staging environment, manually trigger a workflow to deploy to production
Hosting:Use DigitalOcean for hosting the application. Set up a virtual private server(VPS) to run the backend and Frontend services 
Utilize Docker to containerize the application, ensuring consistency across different environments
Testing strategy 
We will use jest for unit testing JavaScript code and a combination of jest and tools like super test for integration testing.and for end-to-end testing we will use Cypress and then automate running of tests using GitHub Actions.

Reimplementing Solutions
Glog aims to strike a balance between simplicity, control, and customization, addressing the limitations of existing solutions like WordPress and Medium.
Team:
Frontend: Idemho Glory
Backend: Iwegbu Jeddy
Frontend: Develops and implement user interface and user experience for the platform 
Backend:setup the server,create APIs,manage database interactions

