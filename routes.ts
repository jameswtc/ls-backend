import { Router } from "express";
import { fetchAllPlaces } from "./places-service";

const routes = Router();

routes.get("/places", async (req, res) => {
    console.log(`Fetching all places from remote API...`);

    const places = await fetchAllPlaces();

    res.json(places.filter(place => place !== null));
});

export default routes;
