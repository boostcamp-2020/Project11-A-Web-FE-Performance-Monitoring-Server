import { Document, PaginateModel } from 'mongoose';

type IPagination<T extends Document> = PaginateModel<T>;

export default IPagination;
