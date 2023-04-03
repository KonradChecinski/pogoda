import {
    createTheme,
    Fab,
    ThemeProvider,
    Typography,
    Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputTown from "./page/InputTown";
import Weather from "./page/Weather";
import LanguageIcon from "@mui/icons-material/Language";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CssBaseline from "@mui/material/CssBaseline";
// import InputTown from "./page/inputTown";

const apiKey = "04d17285ab8ef463daa39bc709f7c313";

function App() {
    const [city, setCity] = useState("");
    const [geolocalization, setGeolocalization] = useState({
        lat: 0,
        lon: 0,
    });
    const [weatherReady, setWeatherReady] = useState(false);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [lang, setLang] = useState("pl");
    const [accessibilityMode, setAccessibilityMode] = useState(false);

    let fontSizeInt;
    if (accessibilityMode) fontSizeInt = 16;
    else fontSizeInt = 13;
    const theme = createTheme({
        palette: {
            mode: "dark",
        },
        shape: {
            borderRadius: 16,
        },
        typography: {
            fontSize: fontSizeInt,
        },
    });

    function setCityFromComponent(cityName: string) {
        setCity(cityName);
    }

    function setGeolocalizationFromComponent(geo: {
        lat: number;
        lon: number;
    }) {
        setGeolocalization(geo);
    }

    const getWeatherWithGeo = async (
        lat: number,
        lon: number,
        lang: string
    ) => {
        let returnedData = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${apiKey}`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setWeather(data);
            })
            .catch((error) => {
                console.error(error);
            });
        let forecastFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${apiKey}`
        )
            .then((response) => response.json())
            .then((forecast) => {
                console.log(forecast);
                setForecast(forecast);
                setWeatherReady(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getWeatherCity = async (city: string, lang: string) => {
        let weatherFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setWeather(data);
            });
        let forecastFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`
        )
            .then((response) => response.json())
            .then((forecast) => {
                console.log(forecast);
                setForecast(forecast);
                setWeatherReady(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function getWeather() {
        setWeatherReady(false);
        if (city != "") {
            getWeatherCity(city, lang);
        } else if (geolocalization.lat != 0 && geolocalization.lon != 0) {
            getWeatherWithGeo(geolocalization.lat, geolocalization.lon, lang);
        }
    }

    useEffect(() => {
        getWeather();
    }, [city, geolocalization, lang]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {weatherReady ? (
                    <Weather
                        weather={weather}
                        forecast={forecast}
                        setCityOutside={setCityFromComponent}
                        setGeolocalizationOutside={
                            setGeolocalizationFromComponent
                        }
                        lang={lang}
                        accessibilityMode={accessibilityMode}
                    ></Weather>
                ) : (
                    <InputTown
                        setCityOutside={setCityFromComponent}
                        setGeolocalizationOutside={
                            setGeolocalizationFromComponent
                        }
                        lang={lang}
                    ></InputTown>
                )}
                <Fab
                    color="primary"
                    aria-label="edit"
                    sx={{ position: "fixed", bottom: "2%", right: 20 }}
                    onClick={() => {
                        if (lang == "pl") setLang("en");
                        if (lang == "en") setLang("pl");
                    }}
                >
                    <LanguageIcon sx={{ fontSize: 30 }} />
                </Fab>
                <Fab
                    color="primary"
                    aria-label="edit"
                    sx={{ position: "fixed", bottom: "2%", right: 90 }}
                    onClick={() => {
                        setAccessibilityMode(!accessibilityMode);
                    }}
                >
                    {accessibilityMode ? (
                        <ZoomOutIcon sx={{ fontSize: 30 }} />
                    ) : (
                        <ZoomInIcon sx={{ fontSize: 30 }} />
                    )}
                </Fab>
            </ThemeProvider>
        </>
    );
}

export default App;
