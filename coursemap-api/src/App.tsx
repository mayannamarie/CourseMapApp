import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendarOutline, laptopOutline, schoolOutline, personOutline } from 'ionicons/icons';
import AcademicYearsPage from './pages/AcademicYearsPage';
import SemestersListperAcademicYearPage from './pages/SemestersListperAcademicYearPage';
import CoursesTaughtperSemesterPage from './pages/CoursesTaughtperSemesterPage';
import CoursesDetailsPage from './pages/CoursesDetailsPage';
import FullCoursesListPage from './pages/FullCoursesListPage';
import FullDiplomasListPage from './pages/FullDiplomasListPage';
import AdvisorListforDiplomaPage from './pages/AdvisorListforDiplomaPage';
import FullInstructorsListPage from './pages/FullInstructorsListPage';
import CoursesTaughtByInstructorListPage from './pages/CoursesTaughtByInstructorListPage';
import AdvisingAssignmentsforAdvisorPage from './pages/AdvisingAssignmentsforAdvisorPage';
import CoursesDetailsInstructorPage from './pages/CoursesDetailsInstructorPage';
import CoursesDetailsAcademicPage from './pages/CoursesDetailsAcademicPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

setupIonicReact();
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* NAVIGATION PATH 1 */}
            <Route exact path="/academicyears" component={AcademicYearsPage} />
            <Route exact path="/academicyears/:Id" component={SemestersListperAcademicYearPage} />
            <Route exact path="/academicyears/semesters/:Name" component={CoursesTaughtperSemesterPage} />
            <Route exact path="/academicyears/semesterscourses/:Id" component={CoursesDetailsAcademicPage} />
          {/* NAVIGATION PATH 2 */}
            <Route exact path="/courses" component={FullCoursesListPage} />
            <Route exact path="/courses/:Id" component={CoursesDetailsPage} />
          {/* NAVIGATION PATH 3 */}
            <Route exact path="/diplomas" component={FullDiplomasListPage} />
            <Route exact path="/diplomas/:Id" component={AdvisorListforDiplomaPage} />
            <Route exact path="/diplomas/advisingassignments/:Name" component={AdvisingAssignmentsforAdvisorPage} />
          {/* NAVIGATION PATH 4 */}
            <Route exact path="/instructors" component={FullInstructorsListPage} />
            <Route exact path="/instructors/:Id" component={CoursesTaughtByInstructorListPage} />
            <Route exact path="/instructors/coursedetails/:Id" component={CoursesDetailsInstructorPage} />

            <Route exact path="/academicyears">
              <AcademicYearsPage />
            </Route>

            <Route exact path="/">
              <Redirect to="/academicyears" />
            </Route>
          </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="academicyearsTab" href="/academicyears">
            <IonIcon aria-hidden="true" icon={calendarOutline} />
            <IonLabel>Academic Years</IonLabel>
          </IonTabButton>
          <IonTabButton tab="coursesTab" href="/courses">
            <IonIcon aria-hidden="true" icon={laptopOutline} />
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="diplomaprogramsTab" href="/diplomas">
            <IonIcon aria-hidden="true" icon={schoolOutline} />
            <IonLabel>Diploma Programs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="instructorsTab" href="/instructors">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Instructors</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
