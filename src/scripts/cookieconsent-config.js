import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

// Enable dark mode
document.documentElement.classList.add('cc--darkmode');

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "cloud inline",
            position: "bottom right",
            equalWeightButtons: true,
            flipButtons: true
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: true
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        analytics: {}
    },
    language: {
        default: "es",
        translations: {
            es: {
                consentModal: {
                    title: "¡Holis, es la hora de las galletas!",
                    description: "Nosotros y terceros seleccionados utilizamos cookies o tecnologías similares con fines técnicos y, con su consentimiento, para las finalidades de medición según se especifica en la política de cookies.",
                    closeIconLabel: "",
                    acceptAllBtn: "Aceptar todo",
                    acceptNecessaryBtn: "Rechazar todo",
                    showPreferencesBtn: "Gestionar preferencias",
                    footer: "<a href=\"https://pc.pablopl.dev/intro/legal/politica-de-privacidad/\">Política de privacidad</a>\n<a href=\"https://pc.pablopl.dev/intro/legal/politica-de-cookies/\">Política de cookies</a>"
                },
                preferencesModal: {
                    title: "Preferencias de Consentimiento",
                    closeIconLabel: "Cerrar modal",
                    acceptAllBtn: "Aceptar todo",
                    acceptNecessaryBtn: "Rechazar todo",
                    savePreferencesBtn: "Guardar preferencias",
                    serviceCounterLabel: "Servicios",
                    sections: [
                        {
                            title: "Uso de Cookies",
                            description: "Las opciones proporcionadas en esta sección le permiten personalizar sus preferencias de consentimiento para cualesquiera tecnologías de seguimiento utilizadas para las finalidades descritas a continuación."
                        },
                        {
                            title: "Cookies Estrictamente Necesarias <span class=\"pm__badge\">Siempre Habilitado</span>",
                            description: "Estos rastreadores se utilizan para actividades que son estrictamente necesarias para gestionar o prestar el servicio que usted nos ha solicitado y, por tanto, no exigen su consentimiento.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Cookies Analíticas",
                            description: "Estos rastreadores nos ayudan a medir el tráfico y a analizar su comportamiento con el fin de mejorar nuestro servicio.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Más información",
                            description: "Para más información consulte la <a class=\"cc__link\" href=\"https://pc.pablopl.dev/intro/legal/politica-de-cookies/\">política de cookies</a>."
                        }
                    ]
                }
            }
        },
        autoDetect: "browser"
    }
});