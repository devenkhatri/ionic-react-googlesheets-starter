import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent, IonRefresher, IonRefresherContent, IonItem, IonLabel, IonToast, IonProgressBar } from '@ionic/react';
import { refreshPage, useDataFromGoogleSheet } from '../utils';
import * as _ from "lodash";
import ListLoadingSkeleton from '../components/ListLoadingSkeleton';
import PhysioReportDaywise from '../components/PhysioReportDaywise';
import PhysioReportMonthwise from '../components/PhysioReportMonthwise';


const PhysioReports: React.FC = () => {
  const title = "Physio Reports"

  const { status, data, error, isFetching } = useDataFromGoogleSheet(
    process.env.REACT_APP_GOOGLE_API_KEY || "",
    process.env.REACT_APP_GOOGLE_SHEETS_ID || "",
    [],
  );
  const loading = (status === "loading");

  const sessionsData = _.filter(data, { id: "Sessions" });

  return (
    <IonPage id="main-content">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          {isFetching && <IonProgressBar type="indeterminate"></IonProgressBar>}
          <IonButtons slot="start">
            <IonMenuButton color="primary"></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <>
        <IonRefresher slot="fixed" onIonRefresh={refreshPage}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {loading &&
          <ListLoadingSkeleton />
        }
        <IonToast
          isOpen={!!error}
          position={'top'}
          color={'danger'}
          message="Error occurred while fetching the details. Please try again !!!"
          duration={1500}
        />
        {error &&
          <IonItem color={'light'}>
            <IonLabel color={'danger'}>Error loading data. Please refresh the page to try again !!!</IonLabel>
          </IonItem>
        }
        <PhysioReportMonthwise data={sessionsData} />
        <br/>
        <PhysioReportDaywise data={sessionsData} />
        </>
      </IonContent>
    </IonPage>
  );
};

export default PhysioReports;
