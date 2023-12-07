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
import CoursesTaughtByInstructorList from '../components/CoursesTaughtByInstructorList';
import './CoursesTaughtByInstructorListPage.css';

interface RouteParams {
    Id: string;
}

const CoursesTaughtByInstructorListPage: React.FC<RouteComponentProps<RouteParams>> = props => {
    // console.log("props "+ props.match.params.Id)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text="Back" />
                    </IonButtons>
                    <IonTitle>Courses Taught<br/>By Instructor</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen><br/><br/>
                       {/* ID is getting passed from the routerlink */}
                <CoursesTaughtByInstructorList Id={props.match.params.Id} />
            </IonContent>
        </IonPage>
    );
};

export default CoursesTaughtByInstructorListPage;
