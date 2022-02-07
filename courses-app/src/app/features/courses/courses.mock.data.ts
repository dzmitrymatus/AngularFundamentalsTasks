import { CourseCardModel } from "./models/course-card.model";

export class CoursesMockData {
    courseCardAuthors: Array<string> = ["First Author", "Second Author"];
    courseCardDescription: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
    courseCardTitle: string = "Example card";
    courseCardDate: Date = new Date();
    courseCardDuration: number = 120;

    courses: CourseCardModel[] = [
        { 
            id : 1, 
            title : this.courseCardTitle + " 1", 
            description : this.courseCardDescription,
            creationDate : this.courseCardDate,
            duration : this.courseCardDuration,
            authors : this.courseCardAuthors
        },
        { 
            id : 2, 
            title : this.courseCardTitle + " 2", 
            description : this.courseCardDescription,
            creationDate : this.courseCardDate,
            duration : this.courseCardDuration + 100,
            authors : this.courseCardAuthors
        },
        { 
            id : 3, 
            title : this.courseCardTitle + " 3", 
            description : this.courseCardDescription,
            creationDate : this.courseCardDate,
            duration : this.courseCardDuration + 100,
            authors : this.courseCardAuthors
        }
  ];
}