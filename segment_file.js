import * as fs from 'fs';


export const segment_file = (filePath) => {
    if (typeof filePath !== "string")
        throw 'filePath is not correct.';
    if (!fs.existsSync(filePath))
        throw "filePath don't exist.";

    const start = Date.now();
    var indexStop = 1000000;
    var fileNb = 1;
    const readableStream = fs.createReadStream(filePath, { start: START_TO_SKIP_FIRST_LINE });
    let writeStream = fs.createWriteStream(TEXT_OUTPUT_DIRPATH + (fileNb % WORKER_NB) + "/" + FILENAME_OUTPUT + fileNb + EXTENSION);
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
                    writeStream = fs.createWriteStream(TEXT_OUTPUT_DIRPATH + (fileNb % WORKER_NB) + "/" + FILENAME_OUTPUT + fileNb + EXTENSION);
                    
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

const TEXT_INPUT_PATH = "/home/arthur/EPITA/roux-sirene-invader/tests/testFiles/testOutput.txt";
//const TEXT_OUTPUT_PATH = "/home/arthur/workspace/EPITA/roux-sirene-invader/tests/testFiles/testOutput.txt";
const TEXT_OUTPUT_DIRPATH = "/home/arthur/EPITA/roux-sirene-invader/tests/testFiles/";
const FILENAME_OUTPUT = "testOutput";
const EXTENSION = '.csv';
const STOCK_ESTABLISHEMENT_PATH = "/mnt/c/Users/User/Downloads/StockEtablissement_utf8/StockEtablissement_utf8.csv";
const CHUNK = 10000000;
const WORKER_NB = 2;
const START_TO_SKIP_FIRST_LINE = 1305;

segment_file(TEXT_INPUT_PATH);