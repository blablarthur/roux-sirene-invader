# Sirene Invader

Index all SIRET number into NoSQL Database, fastest as possible


# Install

To use my Sirene Invader, you will need to install npm in latest LTS version and git clone this project. Then run, **npm i** and **npm install pm2 -g**. Launch a MongoDB database on htttp://localhost:27017. Finally, configure the **config.js** file.

## Usage

To use my segmentation file script, type **node segment_file.js**. This will segment the Stock Establishement file into smaller ones. If you have a strong machine, use **pm2 start ecosystem.config.js**. Once done, use **npm run clean** to clean up the project. You can also use db.collection.deleteMAny({}).
