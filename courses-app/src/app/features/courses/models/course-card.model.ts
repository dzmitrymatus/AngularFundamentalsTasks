export interface CourseCardModel {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: Array<string>;
}