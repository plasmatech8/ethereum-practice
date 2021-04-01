set -e  # abort on error

rsync ./ ../docs/
rsync ../token_sale/build/contracts/ ../docs/

git add .
git commit -m "updated website"
git push
