import * as fs from 'fs';
import { csv_to_json_bulk } from './csv_to_json.js';
import { FILE_OUTPUT_DIRPATH } from './config.js';

export const job = async (nbDirPath) => {
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
            .then(() => {
                fs.rmSync(absoluteFilePath);
                console.log('job done');
            })
        } catch (error) {
            console.log(error);
        }
    }

}

job(1);