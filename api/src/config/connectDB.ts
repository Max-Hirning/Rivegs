/* eslint-disable no-console */

import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		mongoose.set(`strictQuery`, true);
		if(process.env.URL) {
			await mongoose.connect(process.env.URL);
			console.log(`Connected to DB`);
		} else {
			console.log(`You forgot add dotenv's variables`);
		}
	} catch(e: unknown) {
		console.log(e);
	}
};

export default connectDB;