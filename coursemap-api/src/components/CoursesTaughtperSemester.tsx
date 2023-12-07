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
import './CoursesTaughtperSemester.css';
import axios from 'axios';

interface CoursesTaughtperSemesterProps {
    Name: string;
}

interface CoursesTaughtperSemesterData {
    id: string;
    coursesTaught: {
        Id: string;
        Title: string;
    }[];
}
//Defining the state variable,
    //Then the error state variable is initialized as an empty string, 
    //and the setError will update the state with an error message,
    //If error is truthy, then the component will display a message,
    //Otherwise, the list of courses will be displayed.
const CoursesTaughtperSemester: React.FC<CoursesTaughtperSemesterProps> = ({ Name }) => {
    console.log("Getting name from parent " + Name)
    const [courses, setCourses] = useState<CoursesTaughtperSemesterData[]>([]);
    const [error, setError] = useState<string>('');

    const getCoursesTaughtperSemesterData = async () => {
        try {
            const semesterResponse = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/semesters/`)
            const filteredData = semesterResponse.data.filter((semesterName: { id: string; Name: string; }) => {
                console.log(">^^^>>" + semesterName.id)
                return semesterName.Name === Name && semesterName.id;
            })
            const semesterId = filteredData[0].id; //Semester id
            console.log("ID CLicked "+semesterId)
            const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/semesters/${semesterId}`)
            const coursesTaught = response.data.coursesTaught.map((course: { Id: string; Title: string; }) => ({
                Id: course.Id,
                Title: course.Title
            }));
            setCourses([{ id: response.data.Id, coursesTaught: coursesTaught }]);
            setError(coursesTaught.length === 0 ? 'No courses were taught this semester.' : '');
        } catch (error) {
            console.log("error ->" + error);
        }
    }
    
    useEffect(() => {
        getCoursesTaughtperSemesterData()
    }, []);

    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await getCoursesTaughtperSemesterData()
        event.detail.complete();
    }
    //If error is not an empty string, it means that there were no courses taught in the given semester,
    //so we're gonna render  either an error msg or a list of coursestaught
    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            {error !== '' ?
                <div className="error">{error}</div> :
                <IonList>
                    {courses.map((semester) => {
                        return semester.coursesTaught.map((course) => {
                            // console.log("course ID being sent to course details" +  course.Id)
                            return (
                                <IonItem key={course.Id}
                                    routerLink={`/academicyears/semesterscourses/${course.Id}`}>
                                    <IonLabel>{course.Title}</IonLabel>
                                </IonItem>
                            );
                        });
                    })}
                </IonList>
            }
        </>
    );
};
export default CoursesTaughtperSemester;
