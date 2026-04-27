export function handleMenuState() {
    const closeButton = document.querySelector<HTMLElement>('.entity-list_close');
    const openButton = document.querySelector<HTMLElement>('.entity-list_open');
    const menu = document.querySelector<HTMLElement>('#entity-list_wrapper');

    if (!menu || !closeButton || !openButton) {
        return () => {};
    }

    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    const setMenuOpen = (open: boolean): void => {
        const menuWidth = menu.getBoundingClientRect().width;

        if (hideTimer !== null) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }

        menu.style.right = open ? '0' : `-${menuWidth}px`;
        menu.setAttribute('aria-hidden', String(!open));
        openButton.setAttribute('aria-expanded', String(open));
        openButton.style.display = open ? 'none' : 'block';

        if (!open) {
            const duration = parseTransitionDuration(menu);
            hideTimer = setTimeout(() => {
                menu.style.display = 'none';
                hideTimer = null;
            }, duration);
        } else {
            menu.style.display = 'block';
        }
    };

    const handleKeydown = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') setMenuOpen(false);
    };

    const isInitiallyOpen = menu.style.display !== 'none';
    menu.setAttribute('aria-hidden', String(!isInitiallyOpen));
    openButton.setAttribute('aria-expanded', String(isInitiallyOpen));
    openButton.setAttribute('aria-controls', menu.id);

    closeButton.addEventListener('click', () => setMenuOpen(false));
    openButton.addEventListener('click',  () => setMenuOpen(true));
    document.addEventListener('keydown', handleKeydown);

    return () => {
        if (hideTimer !== null) clearTimeout(hideTimer);
        closeButton.removeEventListener('click', () => setMenuOpen(false));
        openButton.removeEventListener('click',  () => setMenuOpen(true));
        document.removeEventListener('keydown', handleKeydown);
    };
}

function parseTransitionDuration(el: HTMLElement): number {
    const raw = getComputedStyle(el).transitionDuration;
    return raw ? parseFloat(raw) * 1000 : 0;
}