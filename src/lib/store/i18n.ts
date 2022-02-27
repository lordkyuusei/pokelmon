import { writable, derived } from "svelte/store";

const translations = {
    english: {
        "game-goal": "Guess the team of six pokémon of the day in less than {{ MAX_TRIALS }} trials",
        "game-won": "You won!",
        "game-lost": "You lost...",
        "game-copy": "Copy result",
        "game-copy-ongoing": "Copy...",
        "game-copy-success": "Copied to clipboard ✅",
        "game-copy-failure": "Failed to copy to clipboard ❌",
        "game-clipboard-header": "Kyuu's Pokelmon",
        "game-result-show": "Show game's result",
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
        "settings-rules-clue2": "Clue 2: A Pokemon will never be surrounded by Pokemon super effective against it. Ex: Ninetales surrounded by Sandslash & Stornjourner",
        "settings-items": "Items",
        "settings-items-desc": "With each guess, you can sometimes get an item. There are currently two items:",
        "settings-items-1": "💊 Potion - Removes your last guess from the board, granting you a new try.",
        "settings-items-2": "🔴 Pokeball - Reveals the Pokemon from the solution at your current guess cell.",
    },
    french: {
        "game-goal": "Devinez l'équipe de six pokémon du jour en moins de {{ MAX_TRIALS }} essais",
        "game-won": "Victoire !",
        "game-lost": "Défaite...",
        "game-copy": "Copier le résultat",
        "game-copy-ongoing": "Copie en cours...",
        "game-copy-success": "Copié dans le presse-papier ✅",
        "game-copy-failure": "Impossible de copier dans le presse-papier ❌",
        "game-clipboard-header": "Kyuu's Pokelmon",
        "game-result-show": "Montrer le score",
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
        "settings-rules-clue2": "Indice 2 : un Pokémon ne sera jamais entouré par des congénères super efficaces contre lui. Ex: pas de Feunard entre Dolman & Sablaireau.",
        "settings-items": "Objets",
        "settings-items-desc": "Avec chaque essai, vous pouvez parfois obtenir un objet. Il y a actuellement deux objets:",
        "settings-items-1": "💊 Potion - Supprime votre dernier essai du plateau, vous permettant d'essayer une fois supplémentaire.",
        "settings-items-2": "🔴 Pokeball - Révèle l'un des Pokémon de la solution, à votre position actuelle dans la ligne.",
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