const fs = require('fs');
const readline = require('readline');
const { insertMongoose } = require('./insert_mongoose.js');

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

    return json_from_csv;
}

const csv_to_json_bulk = async (csvDataFilePath) => {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        if (!fs.existsSync(csvDataFilePath))
            throw `filePath ${csvDataFilePath} don't exist in csv to json.`;
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
        
        rl.on('close', async () => {
            //log time to convert csv to json
            console.log("csv to json convert finish");
            const millis = Date.now() - start;
            console.log(`seconds elapsed to convert csv to json = ${Math.round(millis / 1000)} for ${i} lines`);
    
            //insert in bulk in mongodb
            await insertMongoose(jsonArray);
        })
    })
}

module.exports = { csv_to_json_bulk };