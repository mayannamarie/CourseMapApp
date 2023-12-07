import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonLabel
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import AdvisorListforDiploma from '../components/AdvisorListforDiploma';
import './AdvisorListforDiplomaPage.css';

interface RouteParams {
    Id: string;
}

const AdvisorListforDiplomaPage: React.FC<RouteComponentProps<RouteParams>> = props => {
    console.log(props)
    return (

        <IonPage>
            <IonHeader>
            <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text="Back" />
                    </IonButtons>
                    <IonTitle style={{ whiteSpace: 'normal'}}>
                        Advisors for Diploma
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen><br/>
            {/* ^^ the ID is getting passed from the routerlink */} 
                <AdvisorListforDiploma Id={props.match.params.Id} />
            </IonContent>
        </IonPage>
    );
};

export default AdvisorListforDiplomaPage;
