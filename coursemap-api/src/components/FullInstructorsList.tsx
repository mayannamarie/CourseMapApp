import {
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './FullInstructorsList.css';
import axios from 'axios';

interface InstructorsListItem {
    Id: string;
    FirstName: string;
    LastName: string;
}


const FullInstructorsList: React.FC = () => {

    const [instructors, setInstructors] = useState<InstructorsListItem[]>([]);

    const getInstructorsData: () => Promise<InstructorsListItem[]> = async () => {
        const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/instructors`);
        return response.data
    }

    useEffect(() => {
        (async () => {
            const data = await getInstructorsData()
            console.log(data)
            setInstructors(data)
        })()
    }, [])

    //called on every pull-to-refresh
    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        const data = await getInstructorsData()
        setInstructors(data)
        event.detail.complete()
    }

    return (
        <> 
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                {
                    instructors.map(instructor => {
                        return (
                            <IonItem
                                button
                                detail
                                key={instructor.Id}
                                routerLink={`/instructors/${instructor.Id}`}>
                                <IonLabel>{`${instructor.FirstName} ${instructor.LastName}`}</IonLabel>
                            </IonItem>
                        )
                    })
                }
            </IonList>
        </>
    );
};

export default FullInstructorsList;
