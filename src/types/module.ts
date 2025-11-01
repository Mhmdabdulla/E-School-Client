import type { Lesson } from "./lessons";

export interface Module {
    _id: string;
    courseId: string;
    title: string;
    description?: string;
    order: number;
    lessons?: Lesson[];
    createdAt?: Date;
    updatedAt?: Date;
  }

 export interface Lecture {
  id: string;
  name: string;
  description: string;
  type: "video" | "file";
  content?: File | string;
  isExpanded: boolean;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  lectures: Lecture[];
}

export interface CurriculumData {
  sections: Section[];
}

export interface ModuleData {
  courseId?: string;
  title?: string;
  description?: string;
  order?: string;
}

