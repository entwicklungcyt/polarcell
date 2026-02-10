export const useRichTranslation = () => {
    const { t } = useI18n();

    const parseMarkup = (text: string): string => {
    // Handle paired tags
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'i', 'b', 'span', 'div', 'a'];
    let result = text;
    
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
        rt, // "rich translation"
        parseMarkup
    };
};