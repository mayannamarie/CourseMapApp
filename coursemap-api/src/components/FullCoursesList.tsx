import {
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    IonSearchbar
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './FullCoursesList.css';
import axios from 'axios';

interface FullCoursesListItem {
    Id: string;
    Title: string;
}

const FullCoursesList: React.FC = () => {

    const [coursesList, setCoursesList] = useState<FullCoursesListItem[]>([]);
    const [filterCourses, setFilterCourses] = useState('');

    const getCoursesData: () => Promise<FullCoursesListItem[]> = async () => {
        const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/courses`);
        return response.data
    }

    useEffect(() => {
        (async () => {
            const data = await getCoursesData()
            setCoursesList(data)
        })()
    }, [])

    //called on every pull-to-refresh
    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        const data = await getCoursesData()
        setCoursesList(data)
        event.detail.complete()
    }
    //Creating a new array - filteredCourses
    // Filters and includes only the courses whose titles start with
    // the search text entered in the search bar. 
    const filteredCourses = coursesList.filter((course) => {
        return course.Title.toLowerCase().startsWith(filterCourses.toLowerCase());
    });
    //to check if no filtered courses are found
    const noCoursesAreFound = filteredCourses.length === 0;

    //I used onIonInput event which gets fired for every keystroke, 
    //and I used the e.detail.value to update the courses for every keystroke. 
    return (
        <>
            <IonSearchbar value={filterCourses} onIonInput={(e) => setFilterCourses(e.detail.value!)}></IonSearchbar>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            {noCoursesAreFound ? (
                <div className="no-courses-found">Sorry, No courses found :(</div>
            ) : (
                <IonList>
                    {
                        filteredCourses.map(course => {
                            return (
                                <IonItem
                                    button
                                    detail
                                    key={course.Id}
                                    routerLink={`/courses/${course.Id}`}>
                                    <IonLabel>{
                                        course.Title}</IonLabel>
                                </IonItem>
                            )
                        })
                    }
                </IonList>
            )}
        </>
    );
};

export default FullCoursesList;
