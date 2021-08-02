# Planetside  2 Query Editor

A web app providing a GUI for querying the Planetside 2 REST API. Check it out [here](https://eating-coleslaw.github.io/ps2-visual-query/).

The official API documentation can be found [here](https://census.daybreakgames.com/).

## Features

The app supports the majority of the `ps2:v2` namespace query features:

- Set your Service ID
- Collection selection
- Language selection
- Limit results
- Search conditions
- Show/Hide fields
- Resolves
- Joins, including nested joins
- Tree views

Other app features include:

- Save queries to the browser's local IndexedDB storage
- Toggleable light & dark themes
- Run the query and view the response in-app
- Save your Service ID to the browser
- View the generated query URL
- Copy the query URL to your clipboard
- Copy an anonymized query URL to your clipboard (replaces the Service ID replace with 'example')
- Run the query in a new tab
- Copy the entire query response to your clipboard

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses many components from the [Material-UI](https://material-ui.com/) framework.

Query URLs are generated using the [`dbgcensus`](https://www.npmjs.com/package/dbgcensus) npm package.

The app is hosted on GitHub Pages using the [`gh-pages`](https://www.npmjs.com/package/gh-pages?activeTab=readme) npm package.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deploy to GitHub Pages

Deploying to GitHub Pages is performed via [`gh-pages`](https://www.npmjs.com/package/gh-pages?activeTab=readme).

The repo is configured to deploy my own GitHub Pages. To deploy a fork to your own pages, follow these steps:

1. In `package.json`, update the `homepage` property value to "`https://{username}.github.io/ps2-visual-query`", where `{username}` is your GitHub username.
2. Execute the command `npm run deploy`. This will create a breanch called `gh-pages` and publish it to your remote repository.
3. Open your repository on GitHub, navigate to the __Settings__ tab, then select __Pages__ in the sidebar.

   Under __Source__, change the __Branch__ to `gh-pages`, then click __Save__.

4. Wait for your site to be published and available to visit. This shouldn't take very long.
5. Whenever you want to publish changes to the site, simply execute the command `npm run deploy` again.

### Contributing

Feel free to submit pull requests for fixes or new features. Below is a list of query modifiers that the app currently doesn't support.

#### Missing Query Features

- `c:sort`
- `c:has`
- `c:case`
- `c:limitPerDB`
- `c:start`
- `c:includeNul`
- `c:timing`
- `c:exactMatchFirst`
- `c:distinct`
