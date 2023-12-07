import { 
    IonContent,
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar 
  } from '@ionic/react';
import  FullInstructorList from '../components/FullInstructorsList';
import './FullInstructorsListPage.css';

const FullInstructorListPage: React.FC = () => {
return (
<IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Instructor's List</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent fullscreen><br/><br/>
    <FullInstructorList />
  </IonContent>
</IonPage>
);
};

export default FullInstructorListPage;
