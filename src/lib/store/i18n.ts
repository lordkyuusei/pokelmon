import { writable, derived } from "svelte/store";

const translations = {
    english: {
        "game-goal": "Guess the team of six pokémon in less than {{ MAX_TRIALS }} trials",
        "game-dupe": "You found a duplicate pokémon! Another one is hiding in the challenge.",
        "game-won": "You won!",
        "game-lost": "You lost...",
        "game-copy": "Copy result",
        "game-copy-ongoing": "Copy...",
        "game-copy-success": "Copied to clipboard ✅",
        "game-copy-failure": "Failed to copy to clipboard ❌",
        "game-clipboard-header": "Kyuu's Pokelmon",
        "game-result-show": "Show game's result",
        "pokemon-strengths": "Strengths",
        "pokemon-weaknesses": "Weaknesses",
        "settings-lang": "Language",
        "settings-lang-en": "English",
        "settings-lang-fr": "French",
        "settings-accessibility": "Accessibility mode",
        "settings-accessibility-on": "On",
        "settings-accessibility-off": "Off",
        "settings-close": "Close",
        "settings-rules": "Game's rules",
        "settings-rules-1": "Take a look at the color scheme:",
        "settings-rules-correct": "Green background: in the team & right position.",
        "settings-rules-misplaced": "Orange background: in the team but wrong position.",
        "settings-rules-wrong": "Red background: not in the team.",
        "settings-rules-clue1": "Rule 1: There will never be Pokemon duplicates side-by-side.",
        "settings-rules-clue2": "Clue 2: There will never be Pokemon surrounded by super-effective typing against it.",
        "settings-items": "Items",
        "settings-items-desc": "With each guess, you can sometimes get an item. There are currently two items:",
        "settings-items-1": "💊 Potion - Removes your first guess from the board, granting you a new try.",
        "settings-items-2": "🔴 Pokeball - Reveals the Pokemon from the solution at your current guess cell.",
    },
    french: {
        "game-goal": "Devinez l'équipe de six pokémon en moins de {{ MAX_TRIALS }} essais",
        "game-dupe": "Vous avez trouvé un doublon ! Un autre est caché dans le challenge.",
        "game-won": "Victoire !",
        "game-lost": "Défaite...",
        "game-copy": "Copier le résultat",
        "game-copy-ongoing": "Copie en cours...",
        "game-copy-success": "Copié dans le presse-papier ✅",
        "game-copy-failure": "Impossible de copier dans le presse-papier ❌",
        "game-clipboard-header": "Kyuu's Pokelmon",
        "game-result-show": "Montrer le score",
        "pokemon-strengths": "Forces",
        "pokemon-weaknesses": "Faiblesses",
        "settings-lang": "Langue",
        "settings-lang-en": "Anglais",
        "settings-lang-fr": "Français",
        "settings-accessibility": "Accessibilité",
        "settings-accessibility-on": "Activé",
        "settings-accessibility-off": "Désactivé",
        "settings-close": "Fermer",
        "settings-rules": "Règles du jeu",
        "settings-rules-1": "Voici le code couleur utilisé:",
        "settings-rules-correct": "Fond vert: le Pokémon est présent et positionné correctement.",
        "settings-rules-misplaced": "Fond orange: le Pokémon est présent mais mal positionné.",
        "settings-rules-wrong": "Fond rouge: le Pokémon n'est pas présent dans l'équipe.",
        "settings-rules-clue1": "Règle 1: Il n'y aura jamais deux Pokémon identiques côte à côte.",
        "settings-rules-clue2": "Règle 2: Il n'y aura jamais de Pokémon entouré par des congénères avec un type super efficace contre lui.",
        "settings-items": "Objets",
        "settings-items-desc": "Avec chaque essai, vous pouvez parfois obtenir un objet. Il y a actuellement deux objets:",
        "settings-items-1": "💊 Potion - Supprime votre dernier essai du plateau.",
        "settings-items-2": "🔴 Pokeball - Révèle le Pokémon à l'emplacement du curseur.",
    }
}

export const locale = writable("french");
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