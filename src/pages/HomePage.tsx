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
import { supplyDeterminants, demandDeterminants } from "../shift-calc/AllDeterminants";
import { Determinant } from "../shift-calc/Determinant";
import { createElement } from "react";

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

var selectedDeterminant: Determinant;

function subDeterminantOpen()
{
  if (selectedDeterminant)
  {
    if (selectedDeterminant.subDeterminants.length > 0)
    {
      return {selectedDeterminant.subDeterminants.map(det => (
        <IonSelectOption value={det}> {det.shortName} </IonSelectOption>
      ))}
    }
    else
    {
      return createElement("div", {}, "No sub-determinants");
    }
  }
  else
  {
    return <></>;
  }
}

function SubDeterminantDropdown()
{
  {/* sub-determinant */}
  return (
    <IonRow>

    <IonCol style={{"flex-grow": "0", "white-space": "nowrap"}}>
      <IonText> Sub-Determinant: </IonText>
    </IonCol>

    <IonCol class="ion-align-items-stretch max-content">
      {/* TODO: do the open thing()?? */}
      <IonSelect placeholder="Select One" interface="alert" interfaceOptions={{ header: 'Supply Determinants', subHeader: 'Select your determinant'}} mode="ios" onIonChange={e => console.log(e)} open={subDeterminantOpen()}>
        <IonSelectOption value={selectedDeterminant?.subDeterminants[0]}> {selectedDeterminant?.subDeterminants[0].shortName} </IonSelectOption>
        <IonSelectOption value={selectedDeterminant?.subDeterminants[1]}> {selectedDeterminant?.subDeterminants[1].shortName} </IonSelectOption>
        {this.events.subscr}
      </IonSelect>
    </IonCol>

    </IonRow>
  )
}

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
                  <IonCol style={{"flex-grow": "0", "white-space": "nowrap"}}>
                      <IonText> Select Determinant: </IonText>
                  </IonCol>

                  <IonCol class="ion-align-items-stretch max-content">
                    <IonSelect placeholder="Select One" interface="alert" interfaceOptions={{ header: 'Supply Determinants', subHeader: 'Select your determinant'}} mode="ios" onIonChange={e => this.events.publish("asd")}>
                      {supplyDeterminants.map(det => (
                        <IonSelectOption value={det}> {det.shortName} </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonCol>
                </IonRow>

                {/* {SubDeterminantDropdown()} */}
                <SubDeterminantDropdown />

                {/* sub-determinant */}
                <IonRow>

                  <IonCol style={{"flex-grow": "0", "white-space": "nowrap"}}>
                    <IonText> Sub-Determinant </IonText>
                  </IonCol>

                  <IonCol class="ion-align-items-stretch max-content">
                    <IonSelect value="PINET" okText="Okay" cancelText="Dismiss">
                      <IonSelectOption value="Complementary"> {selectedDeterminant?.shortName} </IonSelectOption>
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
                  </IonCol>
                  <IonCol>
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
