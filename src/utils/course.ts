import type { AdvancedInformationSchemaType } from "@/schemas/course/advanced-information.schema";
import type { BasicInformationSchemaType } from "@/schemas/course/basic-information.schema";
// import type { CurriculumSchemaType } from "@/schemas/course";
import type { PublishSchemaType } from "@/schemas/course";
import type {  Lecture, Section } from "@/types/module";

export const createLessonData = (lesson:Lecture, courseId?:string,moduleId?:string ) => {
    const lessonData = new FormData();
  if(courseId)lessonData.append("courseId", courseId)
  if(moduleId)lessonData.append("moduleId", moduleId);
  if(lesson.id)lessonData.append("order",lesson.id)
  if(lesson.name)lessonData.append("title", lesson.name);
  if(lesson.description)lessonData.append("description", lesson.description);
  if(lesson.type)lessonData.append("contentType", lesson.type);


  if (lesson.content) {
    lessonData.append("content", lesson.content);
  }

  return lessonData
  }

 export const createModuleData = (section:Partial<Section>, courseId?:string) => {
  const moduleData: {
    courseId?: string;
    title?: string;
    description?: string;
    order?: string;
  } = {};

  if (courseId) {
    moduleData.courseId = courseId;
  }

  if (section.name) moduleData.title = section.name;
  if (section.description) moduleData.description = section.description;
  if (section.id) moduleData.order = section.id;

  return moduleData;
  }

 export const createCourseData = (basicInformation:Partial<BasicInformationSchemaType>,
    advancedInformation:Partial<AdvancedInformationSchemaType>
    ,publish:PublishSchemaType) => {
    const courseData = new FormData()
    if(publish && Object.keys(publish).length > 0){
      if(publish.welcomeMessage)courseData.append("welcomeMessage", publish.welcomeMessage)
      if(publish.congratulationsMessage)courseData.append("congratulationsMessage", publish.congratulationsMessage)
      if(publish.price)courseData.append("price", publish.price)
      if(publish.isPublic)courseData.append("isPublic", publish.isPublic ? "true" : "false")
      if(publish.isFree)courseData.append("isFree", publish.isFree ? "true" : "false")
    }

    if(basicInformation && Object.keys(basicInformation).length > 0){
      if(basicInformation.title)courseData.append("title", basicInformation.title || "")
      if(basicInformation.subtitle)courseData.append("subtitle", basicInformation.subtitle || "")
      if(basicInformation.category)courseData.append("categoryId", basicInformation.category || "")
      if(basicInformation.subCategory)courseData.append("subCategoryId", basicInformation.subCategory || "")
      if(basicInformation.topic)courseData.append("topic", basicInformation.topic || "")
      if(basicInformation.language)courseData.append("language", basicInformation.language || "")
      if(basicInformation.level)courseData.append("level", basicInformation.level || "")
    }
    
    if(advancedInformation && Object.keys(advancedInformation).length > 0){
      if(advancedInformation.description)courseData.append("description", advancedInformation.description)
      if (advancedInformation.thumbnail)
        courseData.append("thumbnail", advancedInformation.thumbnail) 
      if (advancedInformation.trailer) 
        courseData.append("trailer", advancedInformation.trailer)
      if (advancedInformation.teachItems) {
        advancedInformation.teachItems.forEach((item) => {
          courseData.append("whatYouWillLearn[]", JSON.stringify(item)) 
        })
      }
    }

    return courseData
  }


   export const createPublishData = (data: PublishSchemaType): PublishSchemaType => {
      return {
          welcomeMessage: data.welcomeMessage,
          congratulationsMessage: data.congratulationsMessage,
          isPublic: data.isPublic,
          ...(data.isFree ? { isFree: true } : { isFree: false, price: data.price.toString() }),
      };
  }
  
  
//   export const createCurriculumData = (data: any): CurriculumSchemaType => {
//       return {
//           sections: data.modules.map((module: any) => ({
//               description: module.description,
//               id: module._id,
//               name: module.title,
//               lectures: module.lessons.map((lesson: any) => ({
//                   type: lesson.contentType,
//                   description: lesson.description || "default course description",
//                   id: lesson._id,
//                   name: lesson.title,
//                   isExpanded: true,
//                   duration: lesson.duration,
//                   content: `http://localhost:5000/api/lessons/${lesson._id}/stream`,
//               })),
//           })),
//       };
//   }
  
  
// export const createBasicInformationData = (data: any): BasicInformationSchemaType => {
//       return {
//           title: data.title,
//           subtitle: data.subtitle,
//           category: data.categoryId,
//           subCategory: data.subCategoryId,
//           topic: data.title, 
//           language: data.language,
//           level: data.level,
//       };
//   }
  
// export const createAdvancedInformationData = (data: any): AdvancedInformationSchemaType => {
//       return {
//           description: data.description,
//           teachItems: data.whatYouWillLearn.map((item: string, index: number) => ({
//               id: index + 1, 
//               content: JSON.parse(item).content,
//           })),
//           thumbnail: data.thumbnail,
//           trailer:data.trailer,
//       };
//   }