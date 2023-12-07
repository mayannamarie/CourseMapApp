import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import CoursesDetailsInstructorTab from '../components/CoursesDetailsInstructorTab';
import './CoursesDetailsInstructorPage.css';

interface RouteParams {
    Id: string;
}

const CoursesDetailsInstructorPage: React.FC<RouteComponentProps<RouteParams>> = props => {
    console.log(props)
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" />
                    </IonButtons>
                    <IonTitle>Course details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <CoursesDetailsInstructorTab Id={props.match.params.Id} />
            </IonContent>
        </IonPage>
    );
};

export default CoursesDetailsInstructorPage;
