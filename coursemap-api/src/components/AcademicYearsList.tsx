import { IonItem, 
        IonLabel, 
        IonList, 
        IonRefresher, 
        IonRefresherContent, 
        RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import './AcademicYearsList.css';
import axios from 'axios';

interface AcademicYearsListItem {
    Id: string;
    Title: string;
}
const AcademicYearsList: React.FC = () => {

    const [academicYears, setAcademicYears] = useState<AcademicYearsListItem[]>([]);

    const getAcademicYearsData: () => Promise<AcademicYearsListItem[]> = async () => {
        try {
            const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/academicyears`);
            return response.data
        } catch (error) {
            console.log("error " + error);         
        }
    }

    useEffect(() => {
        (async () => {
            const data = await getAcademicYearsData()
            console.log(data)
            setAcademicYears(data)
        })()
    }, [])

    //called on every pull-to-refresh
    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        const data = await getAcademicYearsData()
        setAcademicYears(data)
        event.detail.complete()
    }

    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                {
                    academicYears.map(academicYear => {
                        return (
                            <IonItem
                                button
                                detail
                                key={academicYear.Id + academicYear.Title}
                                routerLink={`/academicyears/${academicYear.Id}`}>
                                <IonLabel>{academicYear.Title}</IonLabel>
                            </IonItem>
                        )
                    })
                }
            </IonList>
        </>
    );
};

export default AcademicYearsList;
