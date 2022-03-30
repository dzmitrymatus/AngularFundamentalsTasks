import { AuthorStoreModel } from "../authors/authors.models";

export interface CourseStoreModel {
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: AuthorStoreModel[];
    id: string;
  }