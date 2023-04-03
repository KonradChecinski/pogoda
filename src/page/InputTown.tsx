import {
    Box,
    Button,
    ButtonGroup,
    Card,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

const InputTown = ({
    setCityOutside,
    setGeolocalizationOutside,
    lang,
}: any) => {
    const [city, setCity] = useState("");

    function saveCity() {
        setCityOutside(city);
        setCityOutside(city);
    }
    async function saveGeo() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setGeolocalizationOutside({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        });
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Card sx={{ p: 5, width: 500 }}>
                <Typography variant="h3" sx={{ mb: 5, textAlign: "center" }}>
                    {lang == "pl" ? "Lokalizacja" : "Localization"}
                </Typography>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={lang == "pl" ? "Miasto" : "City"}
                    variant="outlined"
                    value={city}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCity(event.target.value);
                    }}
                />
                <ButtonGroup
                    fullWidth
                    variant="outlined"
                    aria-label="outlined primary button group"
                    orientation="vertical"
                    size="large"
                    sx={{ mt: 5 }}
                >
                    <Button onClick={saveCity}>
                        {lang == "pl" ? "Zapisz" : "Save"}
                    </Button>
                    <Button color="success" onClick={saveGeo}>
                        {lang == "pl" ? "Autolokalizacja" : "Autolocation"}
                    </Button>
                </ButtonGroup>
            </Card>
        </Grid>
    );
};

export default InputTown;
