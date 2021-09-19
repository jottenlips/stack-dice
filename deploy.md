# Build the application

rollup -c

# Commit and push the changes

git add .
git commit -m "gh-pages commit"
git push origin gh-pages

# Deploy the code with the gh-pages module

node ./gh-pages.js
