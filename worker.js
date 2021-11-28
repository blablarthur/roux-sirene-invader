import * as fs from 'fs';
import { csv_to_json_bulk } from './csv_to_json.js';

export const job = async (nbDirPath) => {
    const dirPath = TEXT_OUTPUT_DIRPATH + nbDirPath + "/";
    console.log(dirPath);
    var job = [];
    let active = false;
    fs.watch(dirPath, (evenType, fileName) => {
        if (evenType === 'rename') {
            //file created ==> csv to json + insert and delete file
            console.log(dirPath + fileName);
            job.push(dirPath + fileName);
            active = true;
        }
    });

    while(1) {
        if (active && job.length === 0) {
            return;
        }
        else if (active) {
            try {
                console.log(`got ${job.length} jobs to do`);
                await csv_to_json_bulk(job.shift());
                console.log('job done');
            } catch (error) {
                console.log(error);
            }
        }
    }

}

const TEXT_OUTPUT_DIRPATH = "/home/arthur/EPITA/roux-sirene-invader/tests/testFiles/";

job(1);