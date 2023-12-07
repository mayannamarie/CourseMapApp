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
import './AdvisingAssignmentsforAdvisor.css';
import axios from 'axios';

interface AdvisingAssignmentsforAdvisorProps {
    Name: string;
}
interface AdvisingAssignmentsforAdvisorData {
    Id: string;
    AdvisingAssignments: {
        AcademicYear: string;
        Diploma: string;
        Year: string;
        Section: string;
    }[];
}

const AdvisingAssignmentsforAdvisor: React.FC<AdvisingAssignmentsforAdvisorProps> = ({ Name }) => {
    console.log("SHOW ME THE NAME " + Name)
    //Defining the state variable, its initial state is undefined.
    const [advisorList, setAdvisorList] = useState<AdvisingAssignmentsforAdvisorData[]>([]);
    const [firstName, lastName] = Name.split(" ");
    //We're using name to get to the ID
    const getAdvisingAssignmentsforAdvisorData = async () => {
        try {
            const instructorListResponse = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/instructors`)
            const filteredData = instructorListResponse.data.filter((person: { FirstName: string; LastName: string; }) => {
                return person.FirstName === firstName && person.LastName === lastName;
            });

            const instructorId = filteredData[0].Id;
            console.log(Name + "'s ID is " + instructorId);

            const advisorsResponse = await axios.get(`https://w0459469-nscccoursemap-api.azurewebsites.net/api/instructors/${instructorId}`)

            const advisingAssignmentsList = advisorsResponse.data.AdvisingAssignments.map((
                advisingAssignments: {AcademicYear: string; Diploma: string; Year: string; Section: string;} ) => ({
                    AcademicYear: advisingAssignments.AcademicYear,
                    Diploma: advisingAssignments.Diploma,
                    Year: advisingAssignments.Year,
                    Section: advisingAssignments.Section
            }));
            setAdvisorList([{ Id: advisorsResponse.data.Id, AdvisingAssignments: advisingAssignmentsList }]);
        } catch (error) {
            console.log("error" + error);
        }
    }

    useEffect(() => {
        getAdvisingAssignmentsforAdvisorData()
    }, []);

    // The handleRefresh function
    const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await getAdvisingAssignmentsforAdvisorData();
        event.detail.complete();
    }
    console.log(">>" + Name);
    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                {advisorList.map((instructor) => {
                    return instructor.AdvisingAssignments.map((advisingAssignment) => {
                        // console.log("COURSE ID ------------------ " + advisingAssignments.Diploma)
                        // console.log("COURSE ID ------------------ " + advisingAssignments.AcademicYear)
                        return (
                            <IonItem
                                key={advisingAssignment.AcademicYear + advisingAssignment.Diploma}>
                                <IonLabel>{advisingAssignment.AcademicYear}</IonLabel>
                                <IonLabel>{advisingAssignment.Diploma}</IonLabel>
                                <IonLabel>{advisingAssignment.Year}</IonLabel>
                                <IonLabel>{advisingAssignment.Section}</IonLabel>
                            </IonItem>
                        );
                    });
                })}
            </IonList>
        </>
    );
};
export default AdvisingAssignmentsforAdvisor;
