import { Injectable } from '@angular/core';
import { Irradiation } from './irradiation';

@Injectable({
    providedIn: 'root'
})
export class IrradiationService {
    async getIrradiation(lat: number, long: number): Promise<Irradiation> {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=direct_radiation&timezone=Asia%2FSingapore&start_date=${formatDate(new Date())}&end_date=${formatDate(new Date())}`;
        const data = await fetch(url);
        const dataJSON = await data.json();
        return (await dataJSON) ?? [];
    }
}

function formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
