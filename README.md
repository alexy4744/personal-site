# Personal Site

Steps to run this project:

1. Run `npm i --only=prod` or `yarn install --production` command.
2. Rename `.env.example` to `.env` and fill out `BIRTHDAY` and `GITHUB_SECRET` fields.
3. Setup database settings inside `ormconfig.json` file.
4. Run `node .` command to start the server with prebuilt files.

Steps to build this project:

1. Make sure to have all dev dependencies installed (`npm i`).
2. Run `npm run build` or `yarn build`.
3. Compiled TypeScript files for the backend will be found in the `build` folder and built frontend assets(scss, js) will replace old files in the `public` folder.

To run the project in watch mode for development, run `npm run watch` or `yarn watch`. It will watch all of our assets in the `src/assets` folder and will watch for changes of TypeScript files.
