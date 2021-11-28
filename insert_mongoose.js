import mongoose from 'mongoose';
import { SireneModel } from './mongooseModel.js';

export const insertMongoose = (documents) => {
  const start = Date.now()
  mongoose.connect('mongodb://localhost:27017/', { dbName: "sireneDb" });

  SireneModel.insertMany(documents)
  .then(() => {
    //disconnect from db + log time to insert in db + delete file
    mongoose.disconnect()
    const millis = Date.now() - start;
    console.log(`seconds elapsed to insert = ${Math.round(millis / 1000)}`);
  })
}