import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { OPEN_WEATHER } from "../env.tsx"
async function fetchWeather(cityName: string) {
  const api = OPEN_WEATHER;
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`
  ).then((res) => {
    const d = res.json();

    // console.log("Weather", d);
    return d;
  });
}
function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState<any>();
  return (
    <div className="h-auto">
      <Row>
        <Form>
          <FormGroup className="d-flex flex-column align-items-center justify-content-center">
            <Label for="cityName">City</Label>
          </FormGroup>
          <FormGroup className="d-flex justify-content-center gap-3">
            <Input
              id="cityName"
              name="city"
              placeholder="Ex:Maputo"
              maxLength={60}
              className="w-25"
              type="text"
              value={cityName}
              onChange={(text) => setCityName(text.currentTarget.value)}
            />
            <Button
              onClick={() =>
                fetchWeather(cityName).then((data) => {
                  console.log(data);
                  setWeather(data);
                })
              }
            >
              Search
            </Button>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        <h2 className="text-center">City Name: {weather?.name}</h2>
        <Row
          className="align-items-center "
        >

          <Col
            className="d-flex gap-2 align-items-center justify-content-center text-center"
          >
            {
              weather &&
              <img src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`} alt="Visual feedback" />}

            <p
              className="d-flex gap-2 align-items-center justify-content-center text-center"

            >

              <span>
                Minimum {weather?.main?.temp_min}

              </span>
              <span>

                Maximum {weather?.main?.temp_max}
              </span>
            </p>

          </Col>
        </Row>
      </Row>
      <Row>
        <Col className="bg-dark text-center text-white">
          Designed By Osv aldo Cuambe
        </Col>
      </Row>
    </div>
  );
}

export default App;

// function useWeather(cityName: string) {
//   return useQuery({
//     queryKey: ["weather", cityName],
//     queryFn: () =>
//       fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPEN_WEATHER}`
//       ).then((res) => {
//         const d = res.json();

//         // console.log("Weather", d);
//         return d;
//       }),
//   });
// }
