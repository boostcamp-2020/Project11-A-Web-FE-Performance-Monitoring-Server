import mongoose from 'mongoose';
import db from '@models';
import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("🔒  Couldn't find .env file  🔒");
}

const mongodbUrl = process.env.TEST_DB as string;

export const beforeFunction = async (): Promise<void> => {
  await mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

type Value = 'Comment' | 'Issue' | 'Project' | 'Event' | 'Statistics' | 'User';

export const afterFunction = async (): Promise<void> => {
  Promise.all([
    ...Object.keys(db).map((value) => db[value as Value].remove({}).exec()),
    db.Statistics.deleteMany({}),
  ]);
};
