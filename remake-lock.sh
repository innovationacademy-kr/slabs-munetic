#/bin/bash
cd munetic_admin
rm -f package-lock.json
npm i
cd ..
cd munetic_app
rm -f package-lock.json
npm i
cd ..
cd munetic_express
rm -f package-lock.json
npm i
