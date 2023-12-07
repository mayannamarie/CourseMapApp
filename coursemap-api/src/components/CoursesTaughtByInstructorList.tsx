import React from 'react';
import {
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './CoursesTaughtByInstructorList.css';
import axios from 'axios';

interface CoursesTaughtByInstructorProps {
    Id: string;
}

interface CoursesTaughtByInstructorData {
    Id: string;
    CoursesTaught: {
        Id: string;
        Title: string;
    }[];
}

const CoursesTaughtByInstructorList: React.FC<CoursesTaughtByInstructorProps> = ({ Id }) => {
    console.log("SHOW ME THE ID " + Id)
    //Defining the state variable, its initial state is undefined.
    const [courses, setCourses] = useState<CoursesTaughtByInstructorData[]>([]);

    const getCoursesTaughtByInstructorData = async () => {
        try {
            console.log("1");
            const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/instructors/${Id}`)
            console.log("2");
            const coursesTaught = response.data.CoursesTaught.map((course: { Id: string; Title: string; }) => ({
                Id: course.Id,
                Title: course.Title
            }));
            console.log("3");
            setCourses([{ Id: response.data.Id, CoursesTaught: coursesTaught }]);
            console.log("4");
        } catch (error) {
            console.log("error" + error);
        }
    }

    useEffect(() => {
        getCoursesTaughtByInstructorData()
    }, [Id]);

    // The handleRefresh function
    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await getCoursesTaughtByInstructorData();
        event.detail.complete();
    }
    console.log(">>" + Id);
    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                {courses.map((instructor) => {
                    return instructor.CoursesTaught.map((course) => {
                        console.log("COURSE ID IM GIVING TO INSTRUCTOR-COURSE DETAILS --- " + course.Id)
                        return (
                            <IonItem
                                key={course.Id}
                                routerLink={`/instructors/coursedetails/${course.Id}`}>
                                <IonLabel>{course.Title}</IonLabel>
                            </IonItem>
                        );
                    });
                })}
            </IonList>
        </>
    );
};
export default CoursesTaughtByInstructorList;
