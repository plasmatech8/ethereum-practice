set -e  # abort on error

rsync -r ./ ../docs/
rsync ../token_sale/build/contracts/* ../docs/

git add -A
git commit -m "Compiles website for Github Pages"
git push
