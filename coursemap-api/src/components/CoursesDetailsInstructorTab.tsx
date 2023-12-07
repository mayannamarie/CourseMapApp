import { useEffect, useState } from 'react';
import './CoursesDetailsInstructorTab.css';
import axios from 'axios';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from '@ionic/react';

interface CourseDetailsProps {
  Id: string;
}

interface CourseDetails {
  Id: string;
  Title: string;
  CourseCode: string;

  CoursePrerequisites: {
    PrerequisiteId: string;
    CourseCode: string;
    Title: string;
  }[];
  isPrerequisiteFor: {
    Id: string;
    CourseCode: string;
    Title: string;
  }[];
}

const CoursesDetailsInstructorTab: React.FC<CourseDetailsProps> = ({ Id }) => {
  const [courseDetails, setCourseDetails] = useState<CourseDetails>();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/courses/${Id}`);
      
      //This useEffect hook maps over the CoursePrerequisites and isPrerequisiteFor  
      //arrays returned by my nscccoursemap-api call then creates new arrays with 
      //only the relevant properties so that the state variable courseDetails has 
      //only the necessary info and can be easily rendered in the component.
      const coursePrerequisites =
        response.data.CoursePrerequisites?.map((prerequisite: CourseDetails['CoursePrerequisites'][0]) => ({
          PrerequisiteId: prerequisite.PrerequisiteId,
          CourseCode: prerequisite.CourseCode,
          Title: prerequisite.Title,
        })) ?? [];
        //if the response data is null then it will return an empty array
        //empty array avoids an error
      const isPrerequisiteFor = response.data.isPrerequisiteFor?.map((prerequisite: CourseDetails['isPrerequisiteFor'][0]) => ({
        Id: prerequisite.Id,
        CourseCode: prerequisite.CourseCode,
        Title: prerequisite.Title,
      })) ?? [];

      setCourseDetails({
        Id: response.data.Id,
        Title: response.data.Title,
        CourseCode: response.data.CourseCode,
        CoursePrerequisites: coursePrerequisites,
        isPrerequisiteFor: isPrerequisiteFor,
      });
    })();
  }, [Id]);

  return (
    <IonCard>
      <IonCardContent>
          <IonCardHeader>
            <IonCardTitle>{courseDetails?.Title}</IonCardTitle>
            <IonCardSubtitle>{courseDetails?.CourseCode}</IonCardSubtitle>
          </IonCardHeader>
        <br/>
        {courseDetails?.CoursePrerequisites.length ? (
          <IonCardSubtitle>
            Course Prerequisites:<br/><br/>
            {courseDetails?.CoursePrerequisites.map((prerequisite) => (
              <div key={prerequisite.PrerequisiteId} >
                {prerequisite.Title} ({prerequisite.CourseCode})
              </div>
            ))}
          </IonCardSubtitle>
        ) : (
          <IonCardSubtitle>Course Prerequisites: None</IonCardSubtitle>
        )}
        {courseDetails?.isPrerequisiteFor.length ? (
          <IonCardSubtitle>
          <br/>
            This Course is a Prerequisite for:
            {courseDetails?.isPrerequisiteFor.map((prerequisite) => (
              <div key={prerequisite.Id}>
                {prerequisite.Title} ({prerequisite.CourseCode})
              </div>
            ))}
          </IonCardSubtitle>
        ) : (
          <IonCardSubtitle><br/>There is no prerequisite for this Course</IonCardSubtitle>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default CoursesDetailsInstructorTab;
