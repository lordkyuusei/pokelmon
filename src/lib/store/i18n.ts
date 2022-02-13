import { writable, derived } from "svelte/store";

const translations = {
    english: {
        "game-goal": "Guess the team of six pokémon of the day in less than six trials",
        "game-won": "You won!",
        "game-lost": "You lost...",
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

    },
    french: {
        "game-goal": "Devinez l'équipe de six pokémon du jour en moins de six essais",
        "game-won": "Victoire !",
        "game-lost": "Défaite...",
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
        const regex = new RegExp(`{{${key}}}`, "g");
        translation = translation.replace(regex, vars[key]);
    })

    return translation;
}

export const t = derived(locale, ($locale) => (key: string, vars = {}) => translate($locale, key, vars));