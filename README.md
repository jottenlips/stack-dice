# Stack Dice 🎲

Cannot decide what to build for your next project? Want to make something cool for Hacktoberfest that is all your own? Stack Dice can help! 🎲 Roll the dice and get building.

If you have a favorite stack you would like to add, feel free to open a PR on this repo.

I have specifically left off Angular. 🙃

Not all stacks may be possible, but you can definitely try!

## Get started

Install the dependencies...

```bash
cd stack-dice
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

# Deploy

## Build the application

npm run build

## Commit and push the changes

git add .
git commit -m "gh-pages commit"
git push origin gh-pages
