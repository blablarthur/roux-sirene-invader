import * as fs from 'fs';
import { FILE_OUTPUT_DIRPATH, STOCK_ESTABLISHEMENT_PATH } from './config.js';

export const segment_file = (filePath) => {
    if (typeof filePath !== "string")
        throw 'filePath is not correct.';
    if (!fs.existsSync(filePath))
        throw "filePath don't exist.";

    const start = Date.now();
    initDirectories();
    var indexStop = CHUNK;
    var fileNb = 1;
    const readableStream = fs.createReadStream(filePath, { start: START_TO_SKIP_FIRST_LINE });
    let writeStream = fs.createWriteStream(FILE_OUTPUT_DIRPATH + (fileNb % WORKER_NB) + "/" + FILENAME_OUTPUT + fileNb + EXTENSION);
    let i = 0;

    readableStream.on('data', (chunk) => {
        if (i >= indexStop) {
            for (var j = 0; j < chunk.length; j++) {
                if (chunk[j] === 10) {
                    //fermer fichier, reinit indexes et rouvrir writestream et écrire le reste du chunk dans le nouveau fichier
                    const startOfChunk = chunk.slice(0, j);
                    writeStream.write(startOfChunk);

                    indexStop = i + chunk.length + CHUNK;
                    writeStream.close();
                    fileNb++;
                    writeStream = fs.createWriteStream(FILE_OUTPUT_DIRPATH + (fileNb % WORKER_NB) + "/" + FILENAME_OUTPUT + fileNb + EXTENSION);
                    
                    const endOfChunk = chunk.slice(j + 1);
                    writeStream.write(endOfChunk);
                    break;
                }
            }
        } else {
            writeStream.write(chunk);
        }
        
        i += chunk.length;
    });

    readableStream.on('end', () => {
        writeStream.close();
        const millis = Date.now() - start;
        console.log(`seconds elapsed = ${Math.round(millis / 1000)} for ${i} bytes`);
    });
}

const initDirectories = () => {
    const dirFiles = './files';
    if (!fs.existsSync(dirFiles)){
        fs.mkdirSync(dirFiles);
    }
    for (var i = 0; i < WORKER_NB; i++) {
        if (!fs.existsSync(dirFiles + "/" + i)){
            fs.mkdirSync(dirFiles + "/" + i);
        }
    }
}

const FILENAME_OUTPUT = "testOutput";
const EXTENSION = '.csv';
const CHUNK = 10000000;
const WORKER_NB = 2;
const START_TO_SKIP_FIRST_LINE = 1305;

segment_file(STOCK_ESTABLISHEMENT_PATH);