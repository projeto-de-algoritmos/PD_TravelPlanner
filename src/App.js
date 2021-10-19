import { useState } from "react";
import { Button, TextField, Modal, Box } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import gateway from "./utils/TravelPlanner";

import { timeWillSpend, pointTouristStop } from "./const";
import "./App.css";

function App() {
  const [selectedTime, setSelectedTime] = useState(timeWillSpend[0].value);
  const [selectedPoint, setSelectedPoint] = useState(pointTouristStop[0].value);
  const [touristSpotName, setTouristSpotName] = useState("");
  const [touristSpots, setTouristSpots] = useState([]);
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState(false);

  const handleTimeWillSpend = (e) => {
    setSelectedTime(parseInt(e.target.value));
  };

  const handlePointTouristStop = (e) => {
    setSelectedPoint(parseInt(e.target.value));
  };

  const handleAddNewTouristSpot = () => {
    if (!touristSpotName) {
      console.log("Caralho viado preenche esse negócio");
      return;
    }
    setTouristSpots([
      ...touristSpots,
      [touristSpotName, selectedTime, selectedPoint],
    ]);
  };

  const handleRemoveSpot = (name) => {
    const filter = touristSpots.filter((spots) => spots[0] !== name);
    setTouristSpots(filter);
  };

  const handleResult = () => {
    if (touristSpots.length === 0) {
      console.log("Caralho viado preenche esse negócio");
      return;
    }
    setResult(gateway(touristSpots));
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const QuestionWithButtons = ({
    title,
    scope = [],
    handler,
    dispatchValue,
  }) => (
    <div className="wrapperInput">
      <h4 className="inputLabel">{title}</h4>
      <div className="contentInputButton">
        {scope.map((interator, id) => (
          <Button
            variant={
              dispatchValue === interator.value ? "contained" : "outlined"
            }
            value={interator.value}
            key={id}
            onClick={handler}
            className="button"
            style={{ minWidth: "initial" }}
          >
            {interator.text}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="contentForm">
        <div className="wrapperInput">
          <h4 className="inputLabel">Nome do local turístico</h4>
          <TextField
            id="standard-basic"
            variant="standard"
            className="textInput"
            onChange={(e) => setTouristSpotName(e.target.value)}
          />
        </div>
        <QuestionWithButtons
          title="Dê uma nota de 0 a 10, Quanto você deseja ir a esse ponto turístico?"
          scope={pointTouristStop}
          handler={handlePointTouristStop}
          dispatchValue={selectedPoint}
        />
        <QuestionWithButtons
          title="Aproximadamente, quantas horas você gastará no ponto tuístico?"
          scope={timeWillSpend}
          handler={handleTimeWillSpend}
          dispatchValue={selectedTime}
        />
        <div className="wrapperInput">
          <Button
            variant="contained"
            className="button"
            style={{ minWidth: "initial" }}
            onClick={handleAddNewTouristSpot}
          >
            Adicionar Ponto Turístico
          </Button>
        </div>
      </div>
      <div className="Sidebar">
        {touristSpots.length === 0 ? (
          <div className="withoutTouristSpot">
            <p>Adicione um ponto turístico</p>
          </div>
        ) : (
          <div className="touristSpots">
            <div className="boxContainer">
              {touristSpots.map((spots) => (
                <Box className="boxTouristSpot">
                  <div className="boxContent">
                    <p>{spots[0]} - </p>
                    <p>{spots[1]}h - </p>
                    <p>{spots[2]}</p>
                  </div>
                  <Close onClick={() => handleRemoveSpot(spots[0])} />
                </Box>
              ))}
            </div>
            <div className="wrapperInput buttonTouristSpot">
              <Button
                variant="contained"
                className="button"
                style={{ minWidth: "initial" }}
                onClick={() => setModal(true)}
              >
                Calcular melhores atrações
              </Button>
            </div>
          </div>
        )}
      </div>
      <Modal open={modal} onClose={handleModalClose} className="modal">
        <div>
          <Box className="box">
            <div className="wrapperInput">
              <h4 className="inputLabel">
                Tempo disponível da viagem para as atrações (em Horas)
              </h4>
              <TextField
                id="standard-basic"
                type="number"
                defaultValue="5"
                variant="standard"
                className="textInput"
                onChange={(e) => setTouristSpotName(e.target.value)}
              />
            </div>
            <div className="wrapperInput">
              <Button
                variant="contained"
                className="button"
                style={{ minWidth: "initial" }}
                onClick={handleResult}
              >
                Calcular
              </Button>
            </div>
          </Box>
          {result.length !== 0 && (
            <Box className="box boxBottom">
              <h4 style={{ margin: 0, marginTop: 10 }}>Resultado</h4>
              <div className="resultContent">
                {result.map((value, id) => (
                  <p key={id}>{value}</p>
                ))}
              </div>
            </Box>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;
