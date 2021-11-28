import mongoose from 'mongoose';
import { csv_to_json_bulk } from './csv_to_json.js';


export const insertMongoose = (documents) => {
  const start = Date.now()
  const { Schema } = mongoose;
  mongoose.connect('mongodb://localhost:27017/', { dbName: "sireneDb" });

  const sireneSchema = new Schema({
    siren:                                Number,
    nic:                                  Number,
    siret:                                String,
    dateCreationEtablissement:            String,
    dateDernierTraitementEtablissement:   String,
    typeVoieEtablissement:                String,
    libelleVoieEtablissement:             String,
    codePostalEtablisssement:             Number,
    dateDebut:                            String,
    etatAdministratifEtablisssement:      String
  });

  const SireneEntry = mongoose.model('sireneCollection', sireneSchema);

  SireneEntry.insertMany(documents)
  .then(() => {
    mongoose.disconnect()
    const millis = Date.now() - start;
    console.log(`seconds elapsed to insert = ${Math.round(millis / 1000)}`);
  })
}

const CSV_INPUT_PATH = "/home/arthur/EPITA/roux-sirene-invader/tests/testFiles/testOutput2.csv";

/* var jsonArr = csv_to_json_bulk(CSV_INPUT_PATH);
insertMongoose(jsonArr); */