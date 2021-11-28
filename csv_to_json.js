import * as fs from 'fs';
import * as readline from 'readline';
import { insertMongoose } from './insert_mongoose.js';

const csv_to_json = (csvData) => {
    var res = csvData.split(',');
    
    const json_from_csv = 
    {
        "siren": Number(res[0]) || undefined,
        "nic": Number(res[1]) || undefined,
        "siret": Number(res[2]) || undefined,
        "dateCreationEtablissement": res[4] || undefined,
        "dateDernierTraitementEtablissement": res[8] || undefined,
        "typeVoieEtablissement": res[14] || undefined,
        "libelleVoieEtablissement": res[15] || undefined,
        "codePostalEtablisssement": Number(res[16]) || undefined,
        "dateDebut": res[39] || undefined,
        "etatAdministratifEtablisssement": res[40] || undefined
    }
    //console.log(json_from_csv);
    return json_from_csv;
}

export const csv_to_json_bulk = (csvDataFilePath) => {
    const start = Date.now()
    if (!fs.existsSync(csvDataFilePath))
        throw "filePath don't exist in csv to json.";
    const readableStream = fs.createReadStream(csvDataFilePath);
    const rl = readline.createInterface({
        input: readableStream
    });
    var jsonArray = [];
    let i = 0;
    rl.on('line', (input) => {
        jsonArray.push(csv_to_json(input))
        i++;
    })
    
    rl.on('close', () => {
        //log time to convert csv to json
        console.log("csv to json convert finish");
        const millis = Date.now() - start;
        console.log(`seconds elapsed to convert csv to json = ${Math.round(millis / 1000)} for ${i} lines`);

        //insert in bulk in mongodb
        insertMongoose(jsonArray);
    }) 
}

const INPUT_STRING = "000325175,00016,00032517500016,O,2000-09-26,,,3212ZZ,2015-03-18T00:58:59,false,3,,,,,MANIHI COTE MONTAGNE TUAMOTU,98770,MANIHI,,,98727,,,,,,,,,,,,,,,,,,,2009-05-27,F,,,,,32.12Z,NAFRev2,N"
const CSV_INPUT_PATH = "/home/arthur/EPITA/roux-sirene-invader/tests/testFiles/testOutput1.csv";
