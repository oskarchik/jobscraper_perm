
# JOBFINDR Web Scraper Application













[![CodeFactor](https://www.codefactor.io/repository/github/oskarchik/jobscraper_perm/badge)](https://www.codefactor.io/repository/github/oskarchik/jobscraper_perm)

Built with the PERN stack(PostgreSQL, Express, React and NodeJS)  

![App Screenshot](https://res.cloudinary.com/oscloud/image/upload/v1654707371/jobfindr/light_latests_px2opd.jpg)


-  [Introduction](#Introduction)
-  [Screenshots](#Screenshots)
-  [Key Features](#Key_Features)
   -  [Client](#Client)
   -  [Server](#Server)
   -  [Database](#Database)
-  [Project Status](#Project_Status)
-  [Author](#Author)

## Introduction

This is a side project I've been working on. A full stack web scraper made using the **PERN** stack that helps me finding a job in tech industry.

This application collects jobs from www.ticjob.es, two times per day, under some requirements that suit my interests, stores only new jobs into a database.
After collecting the jobs sends me an email with the new jobs.

In my side projects I always try to introduce some new features or technologies that helps me improve my coding skills. This time I used
**refresh token rotation strategy** for authentication, **React Context** to handle the state and **Styled Components** for the UI.
The app is deployed into **AWS EC2** instance with **SSL certificate**.

Currently I'm working in several personal projects at the same and I would like to add roles to the app so I can let people work with it without any worries.
This project is something I've been working on in my free time so I cannot be sure that everything will work out correctly. But I'll appreciate you if can report any issue.


I wanted to avoid the typical side projects like todo's app, JS calcualtor and create something useful at the same time with some technologies that I've never used before.
That's why I decided to try with **JWT** and the most secure strategy I found on internet (refresh token rotation).

One of the biggest problems I found is to manage **AWS EC2** instances and it continuos access problems until I found the solution creating alarms in **AWS CloudWatch**
That's why I find challenging to manage **EC2** instances and the problems I had with status checks failures. Also when I have everything working Google decided to eliminate the less secure apps and made me research the best way to handle Gmail account with **Nodemailer**.
## Screenshots

![App Screenshot](https://res.cloudinary.com/oscloud/image/upload/v1654707371/jobfindr/light_login_wzondo.jpg)

![App Screenshot](https://res.cloudinary.com/oscloud/image/upload/v1654707371/jobfindr/dark_login_ug4dvl.jpg)

![App Screenshot](https://res.cloudinary.com/oscloud/image/upload/v1654707371/jobfindr/light_latests_px2opd.jpg)

![App Screenshot](https://res.cloudinary.com/oscloud/image/upload/v1654710782/jobfindr/dark_filter_cz05sh.jpg)

![App Screenshot](https://res.cloudinary.com/oscloud/image/upload/v1654711689/jobfindr/mail_pixel_ieidyx.jpg)
## Key Features

-  Web scraper.
-  Email cron job.
-  List all jobs, latests jobs, and filter by name, technologies, company and applied jobs.
-  Dark theme.
-  Authentication with jsonwebtoken (jwt) with refresh token rotation strategy
## Technologies used

This project was created using the following technologies.

Client

  -  React JS
  -  React Context API and useReducer Hook for managing state
  -  React-router-dom to handle routing
  -  Styled-Components for User Interface
  -  Axios for making API calls

Server

  -  Express
  -  Sequelize ORM
  -  JWT for authentication
  -  Bcryptjs for hashing passwords
  -  Nodemailer for sending everyday jobs
  -  Express-expedotious for caching

Database

  -  PostgreSQL
## Project Status

The app is still in development with some features that I'd like to include like:
    
- Testing
- Toast messages
- Roles
- UI

So if you like it, please give it a star, that will encourage me to to keep improving the project.



## Author

- Github: [@oskarchik](https://github.com/oskarchik)
- Linkedin: [@oskarchik](https://www.linkedin.com/in/oscarsanzcepero/)

