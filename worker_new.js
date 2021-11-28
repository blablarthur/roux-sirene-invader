import * as fs from 'fs';
import { csv_to_json_bulk } from './csv_to_json.js';

export const job = async (nbDirPath) => {
    const dirPath = TEXT_OUTPUT_DIRPATH + nbDirPath + "/";
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
            console.log(`got ${job.length} jobs to do`);
            absoluteFilePath = dirPath + job.shift();
            await csv_to_json_bulk(absoluteFilePath);
            //fs.rmSync(absoluteFilePath);
            console.log('job done');
        } catch (error) {
            console.log(error);
        }
    }

}

const TEXT_OUTPUT_DIRPATH = "/home/arthur/EPITA/roux-sirene-invader/tests/testFiles/";

job(1);