export interface CourseCardModel {
    id: number;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: Array<string>;
}