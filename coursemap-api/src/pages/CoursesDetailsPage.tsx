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
import CoursesDetails from '../components/CoursesDetails';
import './CoursesDetailsPage.css';

interface RouteParams {
    Id: string;
}

const CoursesDetailsPage: React.FC<RouteComponentProps<RouteParams>> = props => {
    console.log(props)
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" />
                    </IonButtons>
                    <IonTitle>Course details<br /> for Selected Course</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <CoursesDetails Id={props.match.params.Id} />
            </IonContent>
        </IonPage>
    );
};

export default CoursesDetailsPage;
