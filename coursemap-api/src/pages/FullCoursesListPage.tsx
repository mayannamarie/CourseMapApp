import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import FullCoursesList from '../components/FullCoursesList';
import './FullCoursesListPage.css';

const FullCoursesListPage: React.FC = () => {


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Full Courses List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen><br /><br />
                <FullCoursesList />
            </IonContent>
        </IonPage>
    );
};

export default FullCoursesListPage;
