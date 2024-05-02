export interface Irradiation {
    "latitude": number,
    "longitude": number,
    "generationtime_ms": number,
    "utc_offset_seconds": number,
    "timezone": string,
    "timezone_abbreviation": string,
    "elevation": number,
    "hourly_units": {
        "time": string,
        "direct_radiation": string
    },
    "hourly": {
        "time": string[],
        "direct_radiation": number[]
    }
}