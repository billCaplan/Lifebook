# Lifebook

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.lifebook.tech/

## Minimum Viable Product

Lifebook is a web application inspired by Facebook built using Ruby on Rails
and React.js. Lifebook allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create a profile for themselves, businesses, or other media products
- [ ] Post photos and updates to their profiles
- [ ] Follow other users and keep up to date on their activities
- [ ] Contact other users directly
- [ ] Engage in discussion with other users on profile pages


## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Posts Model and JSON API (1 day)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page that allows for you to either sign up / sign in.  Upon success, the user will be taken to a News stream which will be fully implemented at a later time.  This will be located on a page with the application's root React component. Before building out the front end, I will begin by setting up a full JSON API for Posts.

[Details][phase-one]

### Phase 2: Flux Architecture and Post CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Post store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Posts `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Posts can be created, read, edited and destroyed in the browser.

[Details][phase-two]

### Phase 3: Comments, Follows, and Likes (2 days)

Phase 3 is focused on how the users will interact.  I will be creating a CommentsController to be able to get requests for all of a posts comments.  It would also allow for every comment a user has made to be visible on their personal profile.  The likes and follows will not need controllers, but will have to be reflected on individual comments, and on the "Following" tab in the users personal profile.


[Details][phase-three]

### Phase 4: Implement notifications and likes.  (2 day)
Phase 4 integrates Cloudinary to allow users to upload profile pics and pictures to their profile.  I will also be implementing the News stream view on the root page.  The news stream will load the posts of all the users followed by the current user.  I will also create the custom templates for each user, based on their user type.  Each user type will have a slightly different view, all rendered in the User show page, through react.  From the news stream, I also will have the ability for users to search for other users using a live search style search bar.


[Details][phase-four]

### Phase 5: Notification(1 day)

Phase 5 introduces the notification feature.  When someone leaves a comment on or likes a current users post or message, a notification will be sent to the current user letting them know it has occurred.  This will be done using event listeners waiting to create a notification object and push it into the current users notifications.  

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

The site will be build with bootstrap to keep it looking nice, so at this point I will need to clean it up.  Adding smooth transitions when possible and making sure my styling and layouts are matching my wireframes.  I will also have to generate the seed data.  Ideally, I will have 100 users, being a mix of People, Movies, TV Shows, Bands, and Games.  Each user will be following at least 25 other users, have left 25 comments, and made 25 unique posts.  Each user will have at least 4 pictures uploaded as well.

### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] More unique profile pages based on user type
- [ ] Maps integration into businesses pages
- [ ] Pagination / infinite scroll for Posts Index


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
