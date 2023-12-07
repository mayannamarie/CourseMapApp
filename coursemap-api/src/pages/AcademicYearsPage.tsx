import { 
        IonContent,
        IonHeader, 
        IonPage, 
        IonTitle, 
        IonToolbar } from '@ionic/react';
import  AcademicYearsList from '../components/AcademicYearsList';
import './AcademicYearsPage.css';

const AcademicYearsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List of Academic Years</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen><br/>
        <AcademicYearsList />
      </IonContent>
    </IonPage>
  );
};

export default AcademicYearsPage;
