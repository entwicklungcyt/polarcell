interface LastSeenItem {
  itemId: number;
  variationId: number;
}

const STORAGE_KEY = 'lastSeen';
const MAX_ITEMS = 11;

export const useLastSeen = () => {
  const items = useState<LastSeenItem[]>('last-seen', () => []);

  const load = (): LastSeenItem[] => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const save = (data: LastSeenItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const add = (itemId: number, variationId: number) => {
    const list = load();
    const filtered = list.filter((i) => i.variationId !== variationId);
    filtered.unshift({ itemId, variationId });
    const trimmed = filtered.slice(0, MAX_ITEMS);
    save(trimmed);
    items.value = trimmed;
  };

  const remove = (variationId: number) => {
    const list = load();
    const filtered = list.filter((i) => i.variationId !== variationId);
    save(filtered);
    items.value = filtered;
  };

  const getItems = (excludeVariationId?: number): LastSeenItem[] => {
    const list = load();
    items.value = list;
    if (excludeVariationId) {
      return list.filter((i) => i.variationId !== excludeVariationId);
    }
    return list;
  };

  return {
    items,
    add,
    remove,
    getItems,
  };
};