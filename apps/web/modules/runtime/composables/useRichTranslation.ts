export const useRichTranslation = () => {
    const { t } = useI18n();

    const parseMarkup = (text: string): string => {
        const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'i', 'b', 'span', 'div'];
        let result = text;
        
        tags.forEach(tag => {
            const regex = new RegExp(`\\[${tag}\\](.*?)\\[\\/${tag}\\]`, 'gs');
            result = result.replace(regex, `<${tag}>$1</${tag}>`);
        });
        
        return result;
    };

    const rt = (key: string): string => {
        const translation = t(key);
        return parseMarkup(translation);
    };

    return {
        rt, // "rich translation"
        parseMarkup
    };
};