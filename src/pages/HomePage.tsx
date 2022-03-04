import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import faker from "@faker-js/faker";

import "./HomePage.css";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() =>
        faker.datatype.number({ min: -1000, max: 1000 })
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() =>
        faker.datatype.number({ min: -1000, max: 1000 })
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const HomePage: React.FC = () => {
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>

            <IonCol>
              <div>
                <Line data={data} options={options} />
              </div>
            </IonCol>

            <IonCol>
              ion-col2
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
