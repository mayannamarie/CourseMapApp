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
import CoursesDetailsAcademicTab from '../components/CoursesDetailsAcademicTab';
import './CoursesDetailsAcademicPage.css';

interface RouteParams {
    Id: string;
}

const CoursesDetailsAcademicPage: React.FC<RouteComponentProps<RouteParams>> = props => {
    console.log(props)
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton  text="Back" />
                    </IonButtons>
                    <IonTitle>Course details<br/> for Selected Course</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <CoursesDetailsAcademicTab Id={props.match.params.Id} />
            </IonContent>
        </IonPage>
    );
};

export default CoursesDetailsAcademicPage;
