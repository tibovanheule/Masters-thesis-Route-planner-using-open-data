export class Dienstkalender extends JsonLD {
    "@type": "Dienstkalender";
    "Dienstkalender.naam": string;
    "Dienstkalender.vanDatum": number;
    "Dienstkalender.totDatum": number;
    "Dienstkalender.binnen": UicOperationelePeriode;
    "Dienstkalender-operationeleDag": OperationeleDag[];
}