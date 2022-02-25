import { writable, derived } from "svelte/store";

const translations = {
    english: {
        "game-goal": "Guess the team of six pokémon of the day in less than {{ MAX_TRIALS }} trials",
        "game-won": "You won!",
        "game-lost": "You lost...",
        "game-copy": "Copy result",
        "game-clipboard-header": "Kyuu's Pokelmon",
        "game-copy-success": "Copied to clipboard",
        "game-copy-failure": "Failed to copy to clipboard",
        "settings-lang": "Language",
        "settings-lang-en": "English",
        "settings-lang-fr": "French",
        "settings-accessibility": "Accessibility mode",
        "settings-accessibility-on": "On",
        "settings-accessibility-off": "Off",
        "settings-close": "Close",
        "settings-rules": "Rules",
        "settings-rules-1": "You need to guess the content of today's pokémon team. A pokémon team is made of 6 Pokémon. In the following situation:",
        "settings-rules-correct": "Green background: present & right position.",
        "settings-rules-misplaced": "Orange background: present but wrong position.",
        "settings-rules-wrong": "Red background: not present in the team.",
        "settings-rules-clue1": "Clue 1: A Pokemon will never be surrounded by itself directly. Ex: two Ninetales side by side.",
        "settings-rules-clue2": "Clue 2: A Pokemon will never be surrounded by Pokemon super effective against it.",

    },
    french: {
        "game-goal": "Devinez l'équipe de six pokémon du jour en moins de {{ MAX_TRIALS }} essais",
        "game-won": "Victoire !",
        "game-lost": "Défaite...",
        "game-copy": "Copier le résultat",
        "game-clipboard-header": "Kyuu's Pokelmon",
        "game-copy-success": "Copié dans le presse-papier",
        "game-copy-failure": "Impossible de copier dans le presse-papier",
        "settings-lang": "Langue",
        "settings-lang-en": "Anglais",
        "settings-lang-fr": "Français",
        "settings-accessibility": "Mode Accessibilité",
        "settings-accessibility-on": "Activé",
        "settings-accessibility-off": "Désactivé",
        "settings-close": "Close",
        "settings-rules": "Règles",
        "settings-rules-1": "Vous devez deviner l'équipe de pokémon du jour. Une équipe de pokémon est constituée de 6 Pokémon. Dans le cas suivant:",
        "settings-rules-correct": "Fond vert: le Pokémon est présent et positionné correctement.",
        "settings-rules-misplaced": "Fond orange: le Pokémon est présent mais mal positionné.",
        "settings-rules-wrong": "Fond rouge: le Pokémon n'est pas présent dans l'équipe.",
        "settings-rules-clue1": "Indice 1 : un Pokémon ne sera jamais entouré par son propre doublon directement. Ex: 2 Pharamp de suite.",
        "settings-rules-clue2": "Indice 2 : un Pokémon ne sera jamais entouré par des congénères super efficaces contre lui. Ex: un Feunard entre un Dolmen et un Sablaireau.",
    }
}
export const locale = writable("english");
export const locales = Object.keys(translations);

const translate = (locale: string, key: string, vars: { [x: string]: any; }): string => {
    if (!key || !locale) {
        throw new Error("Missing translation key or variables");
    }

    let translation = translations[locale][key.toLocaleLowerCase()];

    try {
        if (!translation) {
            throw new Error(`Missing translation for key "${key}"`);
        }
    }
    catch (err) {
        console.error(err);
        return `[${key}.${locale}]`;
    }

    Object.keys(vars).map((key) => {
        const regex = new RegExp(`{{ ${key} }}`, "g");
        translation = translation.replace(regex, vars[key]);
    })

    return translation;
}

export const t = derived(locale, ($locale) => (key: string, vars = {}) => translate($locale, key, vars));