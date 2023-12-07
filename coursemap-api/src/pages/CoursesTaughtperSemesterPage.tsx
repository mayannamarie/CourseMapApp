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
import CoursesTaughtperSemester from '../components/CoursesTaughtperSemester';
import './CoursesTaughtperSemesterPage.css';

interface RouteParams {
    Name: string;
}

const CoursesTaughtperSemesterPage: React.FC<RouteComponentProps<RouteParams>> = props => {
    console.log(props)
    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text="Back" />
                    </IonButtons>
                    <IonTitle>Courses Taught <br/>this Semester</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen><br/><br/>
                <CoursesTaughtperSemester Name={props.match.params.Name} />
            </IonContent>
        </IonPage>
    );
};

export default CoursesTaughtperSemesterPage;
