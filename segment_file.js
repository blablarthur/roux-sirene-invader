import * as fs from 'fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';

export const segment_file = (filePath) => {
    if (typeof filePath !== "string")
        throw 'filePath is not correct.';
    if (!fs.existsSync(filePath))
        throw "filePath don't exist.";
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question('What do you think of Node.js? ');
    console.log(`Thank you for your valuable feedback: ${answer}`);

    rl.close();
}

console.log(segment_file("/home/arthur/workspace/EPITA/roux-sirene-invader/tests/testFiles/test.txt"));