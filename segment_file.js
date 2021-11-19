import * as fs from 'fs';
import * as readline from 'readline';

export const segment_file = (filePath) => {
    if (typeof filePath !== "string")
        throw 'filePath is not correct.';
    if (!fs.existsSync(filePath))
        throw "filePath don't exist.";
    const start = Date.now();
    const readableStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(TEXT_OUTPUT_PATH);
    const rl = readline.createInterface({
        input: readableStream
    });
    let i = 0;
    rl.on('line', (input) => {
        if (i - 1 >= CHUNK_LINE_READ * CHUNK_TO_READ_FOR_100M_FILE) {
            writeStream.write(input + "\n");
            if (i >= CHUNK_LINE_READ * CHUNK_TO_READ_FOR_100M_FILE * 2) {
                rl.removeAllListeners();
                rl.close();
                writeStream.end();
                readableStream.destroy();
                const millis = Date.now() - start;
                console.log(`seconds elapsed = ${Math.round(millis / 1000)}`);
            }
        }
        i++;
    });
}

const TEXT_INPUT_PATH = "/home/arthur/workspace/EPITA/roux-sirene-invader/tests/testFiles/test.txt";
const TEXT_OUTPUT_PATH = "/home/arthur/workspace/EPITA/roux-sirene-invader/tests/testFiles/testOutput.txt";
const STOCK_ESTABLISHEMENT_PATH = "/mnt/c/Users/EDF/Downloads/StockEtablissement_utf8/StockEtablissement_utf8.csv";
const CHUNK_LINE_READ = 429;
const CHUNK_TO_READ_FOR_100M_FILE = 1449;

segment_file(STOCK_ESTABLISHEMENT_PATH);