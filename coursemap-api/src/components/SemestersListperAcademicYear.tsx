import { 
    IonItem, 
    IonLabel, 
    IonList, 
    IonRefresher, 
    IonRefresherContent, 
    RefresherEventDetail } from '@ionic/react';
import React from 'react';
import { useEffect, useState } from 'react';
import './SemestersListperAcademicYear.css';
import axios from 'axios';

interface SemesterListperAcademicYearProps {
    Id: string;
}

interface SemesterListperAcademicYear {
    Id: string;
    Semesters: {
        Name: string;
    }[]
}
const SemesterListperAcademicYear: React.FC<SemesterListperAcademicYearProps> = ({ Id }) => {

    const [semestersperAcademicYear, setSemestersperAcademicYear] = useState<SemesterListperAcademicYear[]>([]);

    //  async function to fetch Semester list data and update the state
    const getSemestersForAcademicYearData = async () => {
        try {
            const response = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/academicyears/${Id}`);
            const semesters = response.data.Semesters.map((semester: { Id: string; Name: string; }) => ({
                Id: semester.Id,
                Name: semester.Name
            }));
            setSemestersperAcademicYear([{ Id: response.data.Id, Semesters: semesters }]);
        } catch (error) {
            console.log("error" + error);
        }
    }

    useEffect(() => {
        getSemestersForAcademicYearData();
    }, [])

    // The handleRefresh function
    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await getSemestersForAcademicYearData();
        event.detail.complete();
    }

    console.log(">>>>>>>>>>>>>>>>>>>...."+ Id)
    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                {semestersperAcademicYear.map((academicyear) => {
                    return academicyear.Semesters.map((semester) => {
                        return (
                            <IonItem key={semester.Name} 
                            routerLink={`/academicyears/semesters/${semester.Name}`}>
                                <IonLabel>{semester.Name}</IonLabel>
                            </IonItem>
                        );
                    });
                })}
            </IonList>
        </>
    );
};

export default SemesterListperAcademicYear;