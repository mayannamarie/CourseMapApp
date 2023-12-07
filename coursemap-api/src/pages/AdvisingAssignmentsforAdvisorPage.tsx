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
import AdvisingAssignmentsforAdvisor from '../components/AdvisingAssignmentsforAdvisor';
import './AdvisingAssignmentsforAdvisorPage.css';

interface RouteParams {
    Name: string;
}

const AdvisingAssignmentsforAdvisorPage: React.FC<RouteComponentProps<RouteParams>> = props => {
    console.log(" ID from routerLink:", props.match.params)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text="Back" />
                    </IonButtons>
                    <IonTitle>Advising Assignments<br/> for Advisor</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen><br/><br/>
            {/* ID  getting passed from the routerlink */}
                <AdvisingAssignmentsforAdvisor Name={props.match.params.Name} />
            </IonContent>
        </IonPage>


    );
};

export default AdvisingAssignmentsforAdvisorPage;
