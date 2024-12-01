export const truncateText = (text: string | undefined, maxLength: number, fallback: string) => {
    if (!text) return fallback;
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };