import express from "express";
import * as repo from "../favoritesRepo"

export default () =>
    express.Router()
        .get('/', async (req, res) => {
                try {
                    res.json(await repo.getCities());
                } catch (e) {
                    res.status(400).json({error: e.message})
                }
            }
        )
        .post('/', async (req, res) => {
                try {
                    await repo.addCity(req.body.name);
                    res.json({result: "OK"});
                } catch (e) {
                    res.status(400).json({error: e.message})
                }
            }
        )
        .delete('/', async (req, res) => {
                try {
                    await repo.deleteCity(req.body.name);
                    res.json({result: "OK"});
                } catch (e) {
                    res.status(400).json({error: e.message})
                }
            }
        );
