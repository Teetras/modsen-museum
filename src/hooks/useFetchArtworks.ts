import { useState, useCallback, useEffect } from "react";
import { Artwork, Pagination } from "../types/interfaces";
import { fetchArtworks } from "../api/api";

const useFetchArtworks = (page: number, limit: number) => {
  const [data, setData] = useState<Artwork[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    limit: 1,
    offset: 0,
    total_pages: 1,
    current_page: 1,
    next_url: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchArtworks(page, limit);
      setData(res.data);
      setPagination(res.pagination);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, pagination, isLoading };
};

export default useFetchArtworks;
