export const useRichTranslation = () => {
    const { t } = useI18n();

    const parseMarkup = (text: string): string => {
        let result = text;

        // Handle anchor tags with href: [a:/link]text[/a]
        result = result.replace(/\[a:(.*?)\](.*?)\[\/a\]/gs, '<a href="$1">$2</a>');

        // Handle paired tags
        const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'i', 'b', 'span', 'div'];
        tags.forEach(tag => {
            const regex = new RegExp(`\\[${tag}\\](.*?)\\[\\/${tag}\\]`, 'gs');
            result = result.replace(regex, `<${tag}>$1</${tag}>`);
        });

        // Handle self-closing tags
        result = result.replace(/\[br\]/gi, '<br>');

        return result;
    };

    const rt = (key: string): string => {
        const translation = t(key);
        return parseMarkup(translation);
    };

    return {
        rt,
        parseMarkup
    };
};