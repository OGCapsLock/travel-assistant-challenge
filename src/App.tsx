import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { NINJA_API, OPEN_WEATHER } from "../env.tsx";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./context/AuthContext.tsx";
import LoginForm from "./components/login.tsx";
import { Link } from "react-router-dom";
// import "./App.css"
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
async function fetchCountry(cityName: string) {
  return await fetch(`https://api.api-ninjas.com/v1/country?name=${cityName}`, {
    headers: {
      "X-Api-Key": NINJA_API,
    },
  }).then((res) => {
    const d = res.json();
    // console.log("Weather", d);
    return d;
  });
}
function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [rates, setRates] = useState<any>();
  const { authenticated, logout } = useAuth();
  // console.log(authenticated);
  return (
    <div
      className="w-100"
      style={{
        backgroundColor: "#242424",
        color: "rgba(255, 255, 255, 0.871)",
        height: "100vh",
      }}
    >
      <Row>
        <Col className="text-center my-5"
        style={{
          fontWeight:"600"
        }}
        >WELCOME TO OSVALDO's TRAVELL AGENCY!</Col>
      </Row>

      {/* Content */}
      <Row className="d-flex justify-content-center align-items-center ">
        <Form className="">
          {/* <FormGroup className="d-flex flex-column align-items-center justify-content-center">
            <Label for="cityName">City</Label>
          </FormGroup> */}
          <FormGroup className="d-flex justify-content-center gap-3">
            <Input
              id="cityName"
              name="city"
              placeholder="Type city name Ex:Maputo"
              maxLength={60}
              className="w-25 my-3"
              type="text"
              value={cityName}
              onChange={(text) => setCityName(text.currentTarget.value)}
            />
            <Button
              color="primary"
              style={{
                fontSize: "14px",
              }}
              onClick={() => {
                fetchWeather(cityName).then((data) => {
                  console.log("weather", data);
                  setWeather(data);
                });

                fetchCountry(cityName).then((data) => {
                  console.log("country", data);
                  setCountry(data?.[0]);
                  fetchExchangeRates(data?.[0]?.currency?.code).then((res) => {
                    console.log("rates", res);
                    setRates(res);
                  });
                });
              }}
            >
              Search
            </Button>
          </FormGroup>
        </Form>
        <Card
          className="w-50 m-3 d-flex flex-row"
          style={{
            border: "none",
          }}
        >
          <CardHeader
            className="text-start gap-2 px-5 d-flex flex-column justify-content-center align-items-center"
            tag={"h5"}
            style={{
              fontSize: "1.225rem",
            }}
          >
            <Row>{weather?.name || "City"},</Row>
            <Row>{country?.name || "Country"}</Row>
          </CardHeader>
          <CardBody className="">
            <Row className="text-center d-flex align-items-center">
              <Col
                style={{
                  fontSize: "0.825rem",
                }}
                md="8"
              >
                <p className="text-start">
                  Temp. Minimum: {weather?.main?.temp_min} Celcius
                </p>
                <p className="text-start">
                  Temp. Maximum: {weather?.main?.temp_max} Celcius
                </p>
              </Col>
              <Col
                md="3"
                className="text-center d-flex align-items-center mx-1"
              >
                {weather && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
                    alt="Visual feedback"
                  />
                )}
              </Col>
            </Row>

            {/* Data that should render conditionally */}
            {!authenticated ? (
              <>Some information was hidden from you...</>
            ) : (
              <div
                className="d-flex flex-column gap-3"
                style={{
                  fontSize: "0.825rem",
                }}
              >
                <Row className="justify-content-between d-flex flex-row">
                  <Col className="" sm="9">
                    Population (in Millions) :{" "}
                  </Col>
                  <Col className="text-end" sm="3">
                    <strong className="text-end">{country?.population}</strong>
                  </Col>
                </Row>
                <Row className="">
                  <Col sm="9">GDP per capita :</Col>
                  <Col sm="3" className="text-end ">
                    <strong className="text-end">
                      {country?.gdp_per_capita}
                    </strong>
                  </Col>
                </Row>
                <Row>
                  <Col sm="5">Exchange Rate :</Col>
                  <Col sm="7" className="text-end">
                    {country && (
                      <>
                        <strong className="text-end">
                          1{" "}
                          {country?.currency.code == "MZN"
                            ? "USD"
                            : country?.currency.code}
                        </strong>{" "}
                        buys{" "}
                        <strong className="text-end">
                          {rates?.new_amount} MZN
                        </strong>
                      </>
                    )}
                  </Col>
                </Row>
              </div>
            )}
          </CardBody>
        </Card>
      </Row>

      <Row>
        {authenticated ? (
          <Col className="d-flex justify-content-center">
            <Button color="danger" onClick={() => logout()}>
              Sair da conta
            </Button>
          </Col>
        ) : (
          <Col className="text-center">
            You are not logged in{" "}
            <Link to={"/login"}> click here to log in</Link> and see more
            details
          </Col>
        )}
      </Row>

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          marginInline: "0",
          width: "100%",
        }}
      >
        <Col className="bg-dark text-center text-white">
          Designed By Osvaldo Cuambe
        </Col>
      </footer>
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
async function fetchExchangeRates(targetCurrency: string) {
  return await fetch(
    `https://api.api-ninjas.com/v1/convertcurrency?have=${
      targetCurrency == "MZN" ? "USD" : targetCurrency
    }&want=MZN&amount=1`
  )
    .then((response) => response.json())
    .then((data) => data);
}

function useCountry(cityName: string) {
  return useQuery({
    queryKey: ["weather", cityName],
    queryFn: () =>
      fetch(`https://api.api-ninjas.com/v1/country?name=${cityName}`, {
        headers: {
          "X-Api-Key": NINJA_API,
        },
      }).then((res) => {
        const d = res.json();
        // console.log("Weather", d);
        return d;
      }),
  });
}
