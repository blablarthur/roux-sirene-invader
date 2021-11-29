const fs = require('fs');
const { FILE_OUTPUT_DIRPATH } = require('./config.js');
const { csv_to_json_bulk } = require('./csv_to_json.js');

const job = async (nbDirPath) => {
    const dirPath = FILE_OUTPUT_DIRPATH + nbDirPath + "/";
    console.log(dirPath);
    var job = fs.readdirSync(dirPath);
    let absoluteFilePath = "";
    while(1) {
        if (job.length === 0) {
            job = fs.readdirSync(dirPath);
            if (job.length === 0)
                return;
        }

        try {
            absoluteFilePath = dirPath + job.shift();
            await csv_to_json_bulk(absoluteFilePath)
            fs.rmSync(absoluteFilePath);
        } catch (error) {
            console.log(error);
        }
    }
}

job(process.argv[2]);