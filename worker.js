import * as fs from 'fs';
import { csv_to_json_bulk } from './csv_to_json.js';

export const job = (nbDirPath) => {
    const dirPath = TEXT_OUTPUT_DIRPATH + nbDirPath + "/";
    console.log(dirPath);
    var job = [];

    fs.watch(dirPath, (evenType, fileName) => {
        if (evenType === 'rename') {
            //file created ==> csv to json + insert and delete file
            console.log(dirPath + fileName);
            job.push(dirPath + fileName);
        }
    });

    let isActive = false;
    while(1) {
        if (!isActive) {
            csv_to_json_bulk(job.shift());
            isActive = true;
        }
    }

}

const TEXT_OUTPUT_DIRPATH = "/home/arthur/EPITA/roux-sirene-invader/tests/testFiles/";

job(1);