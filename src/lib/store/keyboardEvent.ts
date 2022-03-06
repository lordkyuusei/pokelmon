export const handleKeyboardEvent = (node: HTMLElement) => {
    const handleKeyboard = (event: KeyboardEvent) =>
        node.dispatchEvent(
            new KeyboardEvent('keyboardPress', {
                key: event.key,
                code: event.code,
                bubbles: true,
                cancelable: true,
                composed: true
            })
        );

    document.addEventListener('keyup', handleKeyboard, true);
    return {
        destroy() {
            document.removeEventListener('keyup', handleKeyboard, true);
        }
    };
};
