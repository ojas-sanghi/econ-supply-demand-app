import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
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

const HomePage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home Page</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
      <IonGrid>
        <IonRow>


          <IonCol class="ion-justify-content-start">
            <div>
              <Line data={data} options={options} />
            </div>
          </IonCol>

          {/* suppply and demand column */}
          <IonCol class="ion-justify-content-end">
            {/* suppply row */}
            <IonRow>
              {/* suppply column */}
              <IonCol>
                {/* title */}
                <IonRow>
                  <IonTitle> Supply </IonTitle>
                </IonRow>

                {/* determinant */}
                <IonRow >
                  {/*class="ion-justify-content-between"*/}
                  <IonCol >
                    <IonRow>
                      <IonText> Select Determinant: </IonText>
                      <IonSelect class="ion-align-items-stretch" value="PINET" okText="Okay" cancelText="Dismiss">
                        <IonSelectOption value="Price of Related Goods"> Price of Related Goods </IonSelectOption>
                      </IonSelect>
                    </IonRow>
                  </IonCol>
                </IonRow>

                {/* sub-determinant */}
                <IonRow>
                  <IonCol>
                    <IonText> Sub-Determinant </IonText>
                    <IonSelect value="PINET" okText="Okay" cancelText="Dismiss">
                      <IonSelectOption value="Complementary"> Complementary </IonSelectOption>
                    </IonSelect>
                  </IonCol>
                </IonRow>

                {/* increase/decrease question */}
                <IonRow>
                  <IonCol>
                      <IonItem>
                        <IonLabel>Biff</IonLabel>
                        <IonRadio slot="start" value="biff" />
                      </IonItem>
                      <IonItem>
                        <IonLabel>Biff</IonLabel>
                        <IonRadio slot="start" value="biff" />
                      </IonItem>
                  </IonCol>
                </IonRow>

              </IonCol>
            </IonRow>


            {/* demand row */}
            <IonRow>
              {/* demand column */}
              <IonCol>
                {/* title */}
                <IonRow>
                  <IonTitle> Demand </IonTitle>
                </IonRow>

                {/* determinant */}
                <IonRow>
                  <IonCol>

                  </IonCol>
                </IonRow>

                {/* sub-determinant */}
                <IonRow>
                  <IonCol>

                  </IonCol>
                </IonRow>

                {/* increase/decrease question */}
                <IonRow>
                  <IonCol>

                  </IonCol>
                </IonRow>

              </IonCol>
            </IonRow>


          </IonCol>

        </IonRow>
        {/* <IonRow class="ion-justify-content-between">

          <IonCol class="ion-justify-content-start">
            <div>
              <Line data={data} options={options} />
            </div>
          </IonCol>

          <IonCol class="ion-justify-content-end">
            <IonRow>
              <IonCol>
                asdsad
              </IonCol>
            </IonRow>
            <IonRow>
              asdsad
            </IonRow>
            <IonRow>
              asdsad
            </IonRow>
          </IonCol>

        </IonRow> */}
      </IonGrid>
    </IonContent>
  </IonPage>
);

export default HomePage;
