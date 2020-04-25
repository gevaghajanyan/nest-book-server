import { Document } from 'mongoose';

import { CategoriesInterface } from '../../categories/interfaces/categories.interface';

export interface BookInterface extends Document {
  title: string;
  pageCount: number;
  published: string;
  rate: number;
  categories: CategoriesInterface[];
  authors: string[]
  shortDescription: string;
  longDescription: string;
}