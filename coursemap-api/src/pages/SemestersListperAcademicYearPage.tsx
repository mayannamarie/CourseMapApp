import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import SemestersListperAcademicYear from '../components/SemestersListperAcademicYear';
import './SemestersListperAcademicYearPage.css';

interface RouteParams {
    Id: string;
}

const SemestersListperAcademicYearPage: React.FC<RouteComponentProps<RouteParams>> = props => {
    console.log(props)
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text="Back" />
                    </IonButtons>
                    <IonTitle>Semesters per <br/>Academic Year</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            {/* <IonTitle>{props.match.params.Id}</IonTitle>*/}
            {/* ^^ Verifying the ID is getting passed from the routerlink */} 
                <SemestersListperAcademicYear Id={props.match.params.Id} />
            </IonContent>
        </IonPage>
    );
};

export default SemestersListperAcademicYearPage;
