import express from "express";
import {weatherApiByCity, weatherApiByCoords} from "../externalApi";

export default () =>
    express.Router()
        .get('/', async (req, res) => {
                if (!req.query.city) {
                    res.json({error: "city is undefined"});
                    return;
                }
                const result = await weatherApiByCity(req.query.city);
                if (result.status === "ok")
                    res.json(result.response);
                else
                    res.status(result.response.cod).json({error: "weather api fail", result: result.response});
            }
        )
        .get('/coordinates', async (req, res) => {
            if (!req.query.lat) {
                res.json({error: "lat is undefined"});
                return;
            }
            if (!req.query.lon) {
                res.json({error: "lon is undefined"});
                return;
            }

            const result = await weatherApiByCoords({latitude: req.query.lat, longitude: req.query.lon});
            if (result.status === "ok")
                res.json(result.response);
            else
                res.status(result.response.cod).json({error: "weather api fail", result: result.response});
        });
