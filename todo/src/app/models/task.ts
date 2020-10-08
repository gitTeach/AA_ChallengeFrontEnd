import { List } from './list';

export class Task {
    id: number;
    idList: number;
    description: string;
    remindDate: Date;
    dueDate: Date;
    myDayDate: Date;
    notes : Date;
    isCompleted : boolean;
    isImportant : boolean;
    constructor(){};
}