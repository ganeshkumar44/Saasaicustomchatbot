import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectChatbotList,
  selectListableChatbotList,
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
  CHATBOTS_PAGE_STATUS_FILTERS,
  filterChatbotsBySearch,
  filterChatbotsByStatus,
  sortChatbotsByUpdatedAtDesc,
} from '@/utils/chatbotList';
import { getTotalPages, paginateItems } from '@/utils/pagination';

export function useChatbotListPage() {
  const dispatch = useAppDispatch();
  const rawChatbotList = useAppSelector(selectChatbotList);
  const listableChatbotList = useAppSelector(selectListableChatbotList);
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
    if (rawChatbotList.length === 0 && !loading) {
      void refetch();
    }
  }, [rawChatbotList.length, loading, refetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const filteredChatbots = useMemo(() => {
    const searched = filterChatbotsBySearch(listableChatbotList, searchTerm);
    return filterChatbotsByStatus(searched, statusFilter);
  }, [listableChatbotList, searchTerm, statusFilter]);

  const sortedChatbots = useMemo(
    () => sortChatbotsByUpdatedAtDesc(filteredChatbots),
    [filteredChatbots],
  );

  const totalPages = getTotalPages(sortedChatbots.length, CHATBOT_LIST_PAGE_SIZE);

  const paginatedChatbots = useMemo(
    () => paginateItems(sortedChatbots, currentPage, CHATBOT_LIST_PAGE_SIZE),
    [sortedChatbots, currentPage],
  );

  useEffect(() => {
    const nextTotalPages = getTotalPages(sortedChatbots.length, CHATBOT_LIST_PAGE_SIZE);

    if (currentPage > nextTotalPages && nextTotalPages > 0) {
      setCurrentPage(nextTotalPages);
    }
  }, [sortedChatbots.length, currentPage]);

  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    chatbotList: listableChatbotList,
    filteredChatbots,
    paginatedChatbots,
    loading,
    error,
    refetch,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    availableStatusFilters: CHATBOTS_PAGE_STATUS_FILTERS,
    viewMode,
    setViewMode,
    currentPage,
    totalPages,
    changePage,
  };
}
