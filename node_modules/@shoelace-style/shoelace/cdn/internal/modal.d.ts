export default class Modal {
    element: HTMLElement;
    tabDirection: 'forward' | 'backward';
    currentFocus: HTMLElement | null;
    constructor(element: HTMLElement);
    activate(): void;
    deactivate(): void;
    isActive(): boolean;
    checkFocus(): void;
    private handleFocusIn;
    get currentFocusIndex(): number;
    /**
     * Checks if the `startElement` is already focused. This is important if the modal already
     * has an existing focus prior to the first tab key.
     */
    startElementAlreadyFocused(startElement: HTMLElement): boolean;
    handleKeyDown: (event: KeyboardEvent) => void;
    private handleKeyUp;
}
