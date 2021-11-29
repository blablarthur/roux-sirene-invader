const mongoose = require('mongoose');

const { Schema } = mongoose;

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

const SireneModel = mongoose.model('sireneCollection', sireneSchema);

module.exports = { SireneModel }