import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/socialNetworkDB';

mongoose.connect(connectionString, {});

export default mongoose.connection;
