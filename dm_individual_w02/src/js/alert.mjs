import { getJSON } from "./utils.mjs";

function alertTemplate(alert) {
    return `<p style="background:${alert.background}; color:${alert.color}; padding:10px; text-align:center; margin:0;">${alert.message}</p>`;
}

export default class Alert {
    constructor() {
        this.alertSource = "json/alerts.json";
        this.parentElement = document.querySelector('main');
    }

    async init() {
        try {
            console.log("Loading alerts from:", this.alertSource);
            const alerts = await getJSON(this.alertSource);
            console.log("Alerts data:", alerts);

            if (alerts && alerts.length > 0) {
                this.renderAlerts(alerts);
            } else {
                console.log("No alerts found or empty array");
            }
        } catch (error) {
            console.error("Error loading alerts:", error);
        }
    }

    renderAlerts(alerts) {
        const alertSection = document.createElement('section');
        alertSection.className = 'alert-list';

        const alertHTML = alerts.map(alertTemplate).join('');
        alertSection.innerHTML = alertHTML;

        this.parentElement.prepend(alertSection);
        console.log("Alerts rendered successfully");
    }
}

