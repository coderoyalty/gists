> changelog [before the development log]

1. **Add Form and Logic for Posting a Gist**

   - Implemented a new form for posting gists and added the underlying logic [commit `7bfc999`, `c842290`](https://github.com/coderoyalty/gist-form/commit/c842290e3d66d4341ade3be89cfcdad75703ad0c).

2. **UI Improvements**

   - Added a profile dropdown menu for authenticated users to enhance the UI [commit `f64144a`](https://github.com/coderoyalty/gist-form/commit/f64144ae7dc22ec887f8b49fda7b373578191d04).
   - Updated the theme switch component to use a button, optimizing space usage [commit `18b004f`](https://github.com/coderoyalty/gist-form/commit/18b004fa2d77f91d7587a04c095a8b3c985fda0c).

3. **Bug Fixes and Refactoring**

   - Removed unused import from `theme.switch.tsx` and added typing animation to gist form [commit `8c6af57`, `1a32796`](https://github.com/coderoyalty/gist-form/commit/8c6af57078d6f815a3f1bb270bfc229ca8effa3c).

4. **Authentication and Dependency Updates**

   - Added auth context for managing user-related data and integrated Supabase for user authentication [commit `d5fb8df`, `e1c17f5`](https://github.com/coderoyalty/gist-form/commit/d5fb8df8815bfc7f4d1132581c19faa7a9e973d5).
   - Updated dependencies and added several UI components like tabs, checkboxes, text areas, and dropdowns [commit `d6bb20e`, `ffedda5`](https://github.com/coderoyalty/gist-form/commit/d6bb20e99052eb1a648593a02b9f06c9c2171078).

5. **Initial Setup and Home Page Refactor**
   - Set up the initial frontend project, added key components, and refactored the home page for better structure and maintainability [commit `fb93665`, `4c8c180`](https://github.com/coderoyalty/gist-form/commit/fb936658d57cdbfa791debedf6f2ca6ca9ade5b8).

## 2024-06-08 - Added Gist Posting Form

### Objective

Implement a form for posting gists to enhance user functionality.

### Work Done

- Created a new form component for posting gists.
- Added logic to handle form submission and data validation.

### Decisions Made

- Chose to use `react-hook-form` for form management due to its simplicity and performance benefits.
- Decided to validate form inputs on the client side to provide immediate feedback to users.

### Challenges

- Encountered issues with form validation logic; resolved by consulting `react-hook-form` documentation and examples.

### Next Steps

- create a page to discover new posted gists
- create a gist preview page, where interactions can take place.
- implement branch protection by preventing failed pull requests to merge unto the main branch.

## 2024-06-11 - Added Discover page

### Objective

Implement a page to explore gists.

### Work Done

- Added a Discover page to explore gists.
- Introduced a NotFound page for 404 errors.
- Simplified App component structure.
- Streamlined import statements and rendering logic in main.tsx.
- Updated rendering logic and data handling in gist discovery to improve performance and reliability.

### Next Steps

- create a page for viewing each gist
- show no. of comments in the Discover page.
- create a page for viewing a user profile.

## 2024-06-14 - Create Gist Preview Page

### Objective

Implement a page for viewing gist. The link used is `/<owner_username>/<gist_id>`.

### Work Done

- create `routes.tsx` for configuring the application routing logic
- add a landing page to the root path for unauthenticated user.
- refactor markdown-renderer styling.

### Next Steps

- show no. of comments in the Discover page.
- create a page for viewing a user profile.
