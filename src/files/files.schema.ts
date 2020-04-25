import * as mongoose from 'mongoose';

export const FilesSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  buffer: Buffer,
  size: Number,
});