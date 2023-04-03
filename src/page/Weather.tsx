import {
    Box,
    Button,
    Card,
    Grid,
    SvgIcon,
    Typography,
    Paper,
    Divider,
    Fab,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";

import humidity from "../assets/others/humidity.png";
import wind from "../assets/others/wind.png";
import cloud from "../assets/others/cloud.png";
import pressure from "../assets/others/pressure.png";
import sun from "../assets/others/sun.png";
import clock from "../assets/others/clock.png";

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Weather: React.FC = ({
    weather,
    forecast,
    setCityOutside,
    setGeolocalizationOutside,
    lang,
    accessibilityMode,
}: any) => {
    const [datetime, setDatetime] = useState(
        moment.utc().utcOffset(weather.timezone / 60)
    );

    // setInterval(() => {
    //     setDatetime(moment.utc().utcOffset(weather.timezone / 60));
    // }, 1000);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Card
                    sx={{
                        mt: 2,
                        mb: 2,
                        p: 4,
                        pb: 12,
                        width: 500,
                        minHeight: "90%",
                        maxHeight: "100%",
                        overflowY: "auto",
                    }}
                >
                    <Grid
                        container
                        columns={2}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: "100%", mb: 2 }}
                    >
                        <Grid item>
                            <Typography
                                variant="h2"
                                sx={{ mb: 1, textAlign: "left" }}
                            >
                                {Math.round(weather.main.temp)}&deg; {/*C */}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{ mb: 1, textAlign: "left", maxWidth: 130 }}
                            >
                                {capitalizeFirstLetter(
                                    weather.weather[0].description
                                )}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ mb: 1, textAlign: "left" }}
                            >
                                {weather.name}
                                <LocationOnIcon sx={{ fontSize: 18, ml: 1 }} />
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ mb: 1, textAlign: "left" }}
                            >
                                {Math.round(weather.main.temp_max)}&deg;
                                {" / "}
                                {Math.round(weather.main.temp_min)}&deg;{" "}
                                {lang == "pl" ? "Odczucie" : "Feeling"}{" "}
                                {Math.round(weather.main.feels_like)}&deg;
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={`/icons/weather/${weather.weather[0].icon}.svg`}
                                    alt="ikona"
                                    loading="lazy"
                                    className="weather-icon"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Paper
                        variant="elevation"
                        elevation={4}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            p: 2,
                            mb: 2,
                        }}
                    >
                        <img
                            src={clock}
                            alt="clock"
                            style={{
                                width: "50px",
                                marginBottom: "5px",
                            }}
                        />
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            {lang == "pl" ? "Data i czas" : "Date and time"}
                        </Typography>
                        <Typography variant="body1">
                            {datetime.format("DD.MM.YYYY HH:mm:ss")}
                        </Typography>
                    </Paper>

                    <Paper
                        variant="elevation"
                        elevation={4}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            p: 2,
                            mb: 2,
                        }}
                    >
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            alignContent="stretch"
                            wrap="nowrap"
                            sx={{
                                overflowX: "auto",
                                p: 0,
                                scrollSnapType: "x mandatory",
                            }}
                        >
                            {console.log(forecast)}
                            {forecast.list.map((el: any, index: number) => {
                                return (
                                    <Grid
                                        item
                                        sx={{
                                            p: 0,
                                            m: 0,
                                            scrollSnapAlign: "start",
                                        }}
                                        justifyContent="center"
                                    >
                                        <Paper
                                            variant="elevation"
                                            elevation={1}
                                            sx={{
                                                p: 1,
                                                m: 0,
                                                width: accessibilityMode
                                                    ? 150
                                                    : 100,
                                                display: "flex",
                                                justifyContent: "center",
                                                // alignItems: "center",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{ textAlign: "center" }}
                                            >
                                                {moment
                                                    .unix(el.dt)
                                                    .format("DD.MM")}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{ textAlign: "center" }}
                                            >
                                                {moment
                                                    .unix(el.dt)
                                                    .format("HH:mm")}
                                            </Typography>
                                            <img
                                                src={`/icons/weather/${el.weather[0].icon}.svg`}
                                                alt="ikona"
                                                // loading="lazy"
                                            />
                                            <Typography
                                                variant="body1"
                                                sx={{ textAlign: "center" }}
                                            >
                                                <ThermostatIcon
                                                    fontSize="small"
                                                    sx={{ mb: "-1px" }}
                                                />
                                                {Math.round(el.main.temp)}&deg;
                                                (
                                                {Math.round(el.main.feels_like)}
                                                &deg; )
                                            </Typography>
                                            {/* <Typography
                                                variant="body1"
                                                sx={{ textAlign: "center" }}
                                            >
                                                {el.wind.speed} m/s
                                            </Typography> */}
                                            <Typography
                                                variant="body1"
                                                sx={{ textAlign: "center" }}
                                            >
                                                <OpacityIcon
                                                    fontSize="small"
                                                    sx={{ mb: "-1px" }}
                                                />
                                                {el.pop * 100}%
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Paper>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{ mb: 2 }}
                    >
                        <Grid item xs={accessibilityMode ? 12 : 6}>
                            <Paper
                                variant="elevation"
                                elevation={4}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                }}
                            >
                                <img
                                    src={humidity}
                                    alt="humidity"
                                    style={{
                                        width: "50px",
                                        marginBottom: "5px",
                                    }}
                                />
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {lang == "pl" ? "Wilgotność" : "Humidity"}
                                </Typography>
                                <Typography variant="body1">
                                    {weather.main.humidity}%
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={accessibilityMode ? 12 : 6}>
                            <Paper
                                variant="elevation"
                                elevation={4}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                }}
                            >
                                <img
                                    src={wind}
                                    alt="wind"
                                    style={{
                                        width: "50px",
                                        marginBottom: "5px",
                                    }}
                                />
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {lang == "pl" ? "Wiatr" : "Wind"}
                                </Typography>
                                <Typography variant="body1">
                                    {weather.wind.speed} m/s
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={accessibilityMode ? 12 : 6}>
                            <Paper
                                variant="elevation"
                                elevation={4}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                }}
                            >
                                <img
                                    src={pressure}
                                    alt="pressure"
                                    style={{
                                        width: "50px",
                                        marginBottom: "5px",
                                    }}
                                />
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {lang == "pl" ? "Ciśnienie" : "Pressure"}
                                </Typography>
                                <Typography variant="body1">
                                    {weather.main.pressure} hPa
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={accessibilityMode ? 12 : 6}>
                            <Paper
                                variant="elevation"
                                elevation={4}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: 2,
                                }}
                            >
                                <img
                                    src={cloud}
                                    alt="cloud"
                                    style={{
                                        width: "50px",
                                        marginBottom: "5px",
                                    }}
                                />
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {lang == "pl" ? "Zachmurzenie" : "Clouds"}
                                </Typography>
                                <Typography variant="body1">
                                    {weather.clouds.all}%
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Paper
                        variant="elevation"
                        elevation={4}
                        sx={{ width: "100%", p: 2, mb: 2 }}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            sx={{ mb: 2 }}
                        >
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    sx={{ textAlign: "left" }}
                                >
                                    {lang == "pl" ? "Wschód słońca" : "Sunrise"}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ textAlign: "left" }}
                                >
                                    {moment
                                        .unix(weather.sys.sunrise)
                                        .utcOffset(weather.timezone / 60)
                                        .format("HH:mm")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    sx={{ textAlign: "right" }}
                                >
                                    {lang == "pl" ? "Zachód słońca" : "Sunset"}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ textAlign: "right" }}
                                >
                                    {moment
                                        .unix(weather.sys.sunset)
                                        .utcOffset(weather.timezone / 60)
                                        .format("HH:mm")}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={sun}
                                    alt="sunrise and sunset"
                                    style={{
                                        width: "100px",
                                        marginBottom: "-30px",
                                        marginTop: "-30px",
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Typography
                        variant="body2"
                        sx={{ mb: 1, textAlign: "right" }}
                    >
                        {lang == "pl" ? "Ostatnia aktualizacja" : "Last update"}
                        {": "}
                        {moment.unix(weather.dt).format("DD.MM.YYYY HH:mm")}
                    </Typography>

                    <Fab
                        color="primary"
                        aria-label="edit"
                        sx={{ position: "fixed", bottom: "2%", left: 20 }}
                        onClick={() => {
                            setCityOutside("");
                            setGeolocalizationOutside({ lat: "", lon: "" });
                        }}
                    >
                        <ArrowBackIcon sx={{ fontSize: 30 }} />
                    </Fab>
                </Card>
            </Grid>
        </>
    );
};

export default Weather;
