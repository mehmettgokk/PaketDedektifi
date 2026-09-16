import { ref, onMounted } from 'vue';

const THEME_KEY = 'paket_dedektifi_theme';

export const useTheme = () => {
    const currentTheme = useState<'light' | 'dark'>('app_theme', () => 'light');

    const applyTheme = (theme: 'light' | 'dark') => {
        currentTheme.value = theme;
        if (import.meta.client) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        }
    };

    const toggleTheme = () => {
        const nextTheme = currentTheme.value === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
    };

    const initTheme = () => {
        if (import.meta.client) {
        const saved = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
        if (saved && (saved === 'light' || saved === 'dark')) {
            applyTheme(saved);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
        }
    };

    return {
        currentTheme,
        toggleTheme,
        initTheme,
    };
};