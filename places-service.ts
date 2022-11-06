import axios, { AxiosError } from "axios";
import { Parser, parseString, parseStringPromise } from "xml2js";

const REMOTE_RESOURCE_PATH =
    "https://storage.googleapis.com/coding-session-rest-api";

enum WeekDayEnum {
    MON = "monday",
    TUE = "tuesday",
    WED = "wednesday",
    THU = "thursday",
    FRI = "friday",
    SAT = "saturday",
    SUN = "sunday",
}

interface HourWindow {
    start: string;
    end: string;
    type: "OPEN" | "CLOSED";
}

interface OpeningHour {
    days: {
        [key in WeekDayEnum]?: HourWindow[];
    };
    closed_on_holidays?: boolean;
    open_by_arrangement?: boolean;
}

interface PlaceInfo {
    id: string;
    displayed_what: string;
    displayed_where: string;
    opening_hours: OpeningHour;
}

const availablePlaceIds: string[] = [
    "GXvPAor1ifNfpF0U5PTG0w",
    "ohGSnJtMIC5nPfYRi_HTAg",
    "xxxxx",
];

const fetchPlaceInfo = async (
    locationId: string
): Promise<PlaceInfo | null> => {
    const url = `${REMOTE_RESOURCE_PATH}/${locationId}`;

    try {
        const response = await axios.get<PlaceInfo>(url);

        return {
            id: locationId,
            displayed_where: response.data.displayed_where,
            displayed_what: response.data.displayed_what,
            opening_hours: response.data.opening_hours,
        };
    } catch (err: unknown) {
        const errorJson = await parseStringPromise(
            (err as AxiosError).response?.data
        );
        console.error(
            `Error while fetching resources for ${locationId}: (${errorJson.Error?.Code}) ${errorJson.Error?.Message}`
        );
        return null;
    }
};

const fetchAllPlaces = async (): Promise<Array<PlaceInfo | null>> => {
    return Promise.all(availablePlaceIds.map((id) => fetchPlaceInfo(id)));
};

export { availablePlaceIds, fetchAllPlaces, fetchPlaceInfo };
