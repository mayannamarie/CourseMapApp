import {
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './FullDiplomasList.css';
import axios from 'axios';

interface FullDiplomasListItem {
    Id: string;
    Title: string;
}

 
const FullDiplomasList: React.FC = () => {

    const [diplomas, setDiplomas] = useState<FullDiplomasListItem[]>([]);

    const getDiplomasData: () => Promise<FullDiplomasListItem[]> = async () => {
        const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/diplomas`);
        return response.data
    }

    useEffect(() => {
        (async () => {
            const data = await getDiplomasData()
            console.log(data)
            setDiplomas(data)
        })()
    }, [])

    //called on every pull-to-refresh
    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        const data = await getDiplomasData()
        setDiplomas(data)
        event.detail.complete()
    }

    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                {
                    diplomas.map(diploma => {
                        return (
                            <IonItem
                                button
                                detail
                                key={diploma.Id + diploma.Title}
                                routerLink={`/diplomas/${diploma.Id}`}>
                                <IonLabel>{diploma.Title}</IonLabel>
                            </IonItem>
                        )
                    })
                }
            </IonList>
        </>
    );
};

export default FullDiplomasList;
