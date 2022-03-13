import type { Type } from "$lib/types/Types";

export enum TYPES {
    ACIER = 1,
    COMBAT = 2,
    DRAGON = 3,
    EAU = 4,
    ÉLECTRIK = 5,
    FEU = 6,
    FÉE = 7,
    GLACE = 8,
    INSECTE = 9,
    NORMAL = 10,
    PLANTE = 11,
    POISON = 12,
    PSY = 13,
    ROCHE = 14,
    SOL = 15,
    SPECTRE = 16,
    TÉNĖBRES = 17,
    VOL = 18,
}

export const types: Type[] = [
    {
        "id": 1,
        "type": {
            "fr": "Acier",
            "en": "Steel"
        },
        "weaknesses": [
            TYPES.COMBAT,
            TYPES.FEU,
            TYPES.SOL,
        ],
        "strengths": [
            TYPES.FÉE,
            TYPES.GLACE,
            TYPES.ROCHE,
        ]
    },
    {
        "id": 2,
        "type": {
            "fr": "Combat",
            "en": "Fighting"
        },
        "weaknesses": [
            TYPES.FÉE,
            TYPES.PSY,
            TYPES.VOL,
        ],
        "strengths": [
            TYPES.ACIER,
            TYPES.GLACE,
            TYPES.NORMAL,
            TYPES.ROCHE,
            TYPES.TÉNĖBRES
        ]
    },
    {
        "id": 3,
        "type": {
            "fr": "Dragon",
            "en": "Dragon"
        },
        "weaknesses": [
            TYPES.DRAGON,
            TYPES.FÉE,
            TYPES.GLACE
        ],
        "strengths": [
            TYPES.DRAGON
        ]
    },
    {
        "id": 4,
        "type": {
            "fr": "Eau",
            "en": "Water"
        },
        "weaknesses": [
            TYPES.ÉLECTRIK,
            TYPES.PLANTE
        ],
        "strengths": [
            TYPES.FEU,
            TYPES.ROCHE,
            TYPES.SOL
        ]
    },
    {
        "id": 5,
        "type": {
            "fr": "Electrique",
            "en": "Electrik"
        },
        "weaknesses": [
            TYPES.SOL
        ],
        "strengths": [
            TYPES.EAU,
            TYPES.VOL,
        ]
    },
    {
        "id": 6,
        "type": {
            "fr": "Feu",
            "en": "Fire"
        },
        "weaknesses": [
            TYPES.EAU,
            TYPES.ROCHE,
            TYPES.SOL
        ],
        "strengths": [
            TYPES.ACIER,
            TYPES.GLACE,
            TYPES.INSECTE,
            TYPES.PLANTE
        ]
    },
    {
        "id": 7,
        "type": {
            "fr": "Fée",
            "en": "Fairy"
        },
        "weaknesses": [
            TYPES.ACIER,
            TYPES.POISON
        ],
        "strengths": [
            TYPES.DRAGON,
            TYPES.TÉNĖBRES
        ]
    },
    {
        "id": 8,
        "type": {
            "fr": "Glace",
            "en": "Ice"
        },
        "weaknesses": [
            TYPES.ACIER,
            TYPES.COMBAT,
            TYPES.FEU,
            TYPES.ROCHE,
        ],
        "strengths": [
            TYPES.DRAGON,
            TYPES.PLANTE,
            TYPES.SOL,
            TYPES.VOL,
        ]
    },
    {
        "id": 9,
        "type": {
            "fr": "Insecte",
            "en": "Bug"
        },
        "weaknesses": [
            TYPES.FEU,
            TYPES.ROCHE,
            TYPES.VOL,
        ],
        "strengths": [
            TYPES.PLANTE,
            TYPES.PSY,
            TYPES.TÉNĖBRES
        ]
    },
    {
        "id": 10,
        "type": {
            "fr": "Normal",
            "en": "Normal"
        },
        "weaknesses": [
            TYPES.COMBAT
        ],
        "strengths": []
    },
    {
        "id": 11,
        "type": {
            "fr": "Plante",
            "en": "Grass"
        },
        "weaknesses": [
            TYPES.FEU,
            TYPES.GLACE,
            TYPES.INSECTE,
            TYPES.POISON,
            TYPES.VOL,
        ],
        "strengths": [
            TYPES.EAU,
            TYPES.ROCHE,
            TYPES.SOL,
        ]
    },
    {
        "id": 12,
        "type": {
            "fr": "Poison",
            "en": "Poison"
        },
        "weaknesses": [
            TYPES.PSY,
            TYPES.SOL
        ],
        "strengths": [
            TYPES.FÉE,
            TYPES.PLANTE,
        ]
    },
    {
        "id": 13,
        "type": {
            "fr": "Psy",
            "en": "Psychic"
        },
        "weaknesses": [
            TYPES.INSECTE,
            TYPES.SPECTRE,
            TYPES.TÉNĖBRES,
        ],
        "strengths": [
            TYPES.COMBAT,
            TYPES.POISON,
        ]
    },
    {
        "id": 14,
        "type": {
            "fr": "Roche",
            "en": "Rock"
        },
        "weaknesses": [
            TYPES.ACIER,
            TYPES.COMBAT,
            TYPES.EAU,
            TYPES.PLANTE,
            TYPES.SOL,
        ],
        "strengths": [
            TYPES.FEU,
            TYPES.INSECTE,
            TYPES.GLACE,
            TYPES.VOL,
        ]
    },
    {
        "id": 15,
        "type": {
            "fr": "Sol",
            "en": "Ground"
        },
        "weaknesses": [
            TYPES.EAU,
            TYPES.GLACE,
            TYPES.PLANTE,
        ],
        "strengths": [
            TYPES.ACIER,
            TYPES.ÉLECTRIK,
            TYPES.FEU,
            TYPES.POISON,
            TYPES.ROCHE
        ]
    },
    {
        "id": 16,
        "type": {
            "fr": "Spectre",
            "en": "Ghost"
        },
        "weaknesses": [
            TYPES.SPECTRE,
            TYPES.TÉNĖBRES
        ],
        "strengths": [
            TYPES.PSY,
            TYPES.SPECTRE
        ]
    },
    {
        "id": 17,
        "type": {
            "fr": "Ténèbres",
            "en": "Dark"
        },
        "weaknesses": [
            TYPES.COMBAT,
            TYPES.FÉE,
            TYPES.INSECTE,
        ],
        "strengths": [
            TYPES.PSY,
            TYPES.SPECTRE
        ]
    },
    {
        "id": 18,
        "type": {
            "fr": "Vol",
            "en": "Flying"
        },
        "weaknesses": [
            TYPES.ÉLECTRIK,
            TYPES.GLACE,
            TYPES.ROCHE
        ],
        "strengths": [
            TYPES.COMBAT,
            TYPES.PLANTE,
            TYPES.INSECTE,
        ]
    }
];
