import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import FullDiplomasList from '../components/FullDiplomasList';
import './FullDiplomasListPage.css';

const FullDiplomasListPage: React.FC = () => {


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Diplomas List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen><br /><br />
                <FullDiplomasList />
            </IonContent>
        </IonPage>
    );
};

export default FullDiplomasListPage;