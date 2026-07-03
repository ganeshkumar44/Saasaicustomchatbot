import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectChatbotList,
  selectChatbotListError,
  selectChatbotListLoading,
} from '@/store/chatbotSelectors';
import { fetchChatbotList } from '@/store/chatbotThunk';
import type {
  ChatbotStatusFilter,
  ChatbotViewMode,
} from '@/types/chatbot.types';
import {
  CHATBOT_LIST_PAGE_SIZE,
  filterChatbotsBySearch,
  filterChatbotsByStatus,
  getAvailableStatusFilters,
  sortChatbotsByUpdatedAtDesc,
} from '@/utils/chatbotList';
import { getTotalPages, paginateItems } from '@/utils/pagination';

export function useChatbotListPage() {
  const dispatch = useAppDispatch();
  const allChatbotList = useAppSelector(selectChatbotList);
  const loading = useAppSelector(selectChatbotListLoading);
  const error = useAppSelector(selectChatbotListError);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ChatbotStatusFilter>('all');
  const [viewMode, setViewMode] = useState<ChatbotViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const refetch = useCallback(
    () => dispatch(fetchChatbotList()),
    [dispatch],
  );

  useEffect(() => {
    if (allChatbotList.length === 0 && !loading) {
      void refetch();
    }
  }, [allChatbotList.length, loading, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const availableStatusFilters = useMemo(
    () => getAvailableStatusFilters(allChatbotList),
    [allChatbotList],
  );

  const filteredChatbots = useMemo(() => {
    const searched = filterChatbotsBySearch(allChatbotList, searchTerm);
    return filterChatbotsByStatus(searched, statusFilter);
  }, [allChatbotList, searchTerm, statusFilter]);

  const sortedChatbots = useMemo(
    () => sortChatbotsByUpdatedAtDesc(filteredChatbots),
    [filteredChatbots],
  );

  const totalPages = getTotalPages(sortedChatbots.length, CHATBOT_LIST_PAGE_SIZE);

  const paginatedChatbots = useMemo(
    () => paginateItems(sortedChatbots, currentPage, CHATBOT_LIST_PAGE_SIZE),
    [sortedChatbots, currentPage],
  );

  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    allChatbotList,
    filteredChatbots,
    paginatedChatbots,
    loading,
    error,
    refetch,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    availableStatusFilters,
    viewMode,
    setViewMode,
    currentPage,
    totalPages,
    changePage,
  };
}
