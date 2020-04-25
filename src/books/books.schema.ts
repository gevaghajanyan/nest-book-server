import * as mongoose from 'mongoose';

export const BooksSchema = new mongoose.Schema({
  title: String,
  pageCount: Number,
  published: Date,
  image: Object,
  rate: Number,
  categories: Array,
  authors: Array,
  shortDescription: String,
  longDescription: String,
});