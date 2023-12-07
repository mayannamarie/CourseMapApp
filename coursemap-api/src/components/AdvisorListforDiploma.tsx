import {
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail
} from '@ionic/react';
import React from 'react';
import { useEffect, useState } from 'react';
import './AdvisorListforDiploma.css';
import axios from 'axios';

interface AdvisorListforDiplomaProps {
    Id: string;
}

interface AdvisorListforDiploma {
    Id: string;
    Advisors: {
        AcademicYear: string;
        Advisors: string;
        Year: string;
    }[]
}
const AdvisorListforDiploma: React.FC<AdvisorListforDiplomaProps> = ({ Id }) => {

    const [advisorList, setAdvisorList] = useState<AdvisorListforDiploma[]>([]);

    //  async function to fetch Advisor list data and update the state
    const getAdvisorsForDiplomaData = async () => {
        try {
            const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/diplomas/${Id}`);
            const advisors = response.data.Advisors.map((advisor: {AcademicYear: string; Advisors: string; Year: string;}) => ({
                AcademicYear: advisor.AcademicYear,
                Advisors: advisor.Advisors,
                Year: advisor.Year
            }));
            setAdvisorList([{ Id: response.data.Id, Advisors: advisors }]);
        } catch (error) {
            console.log("error" + error);
        }
    }

    useEffect(() => {
        getAdvisorsForDiplomaData();
    }, [])

    // The handleRefresh function
    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await getAdvisorsForDiplomaData();
        event.detail.complete();
    }

    
    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                {advisorList.map((diploma) => {
                    return diploma.Advisors.map((advisor) => {
                        return (
                            <IonItem key={advisor.AcademicYear + advisor.Advisors}
                                routerLink={`/diplomas/advisingassignments/${advisor.Advisors}`}>
                                <IonLabel>{`${advisor.AcademicYear} -- ${advisor.Advisors}  -- ${advisor.Year}`}</IonLabel>
                            </IonItem>
                        );
                    });
                })}
            </IonList>
        </>
    );
};

export default AdvisorListforDiploma;