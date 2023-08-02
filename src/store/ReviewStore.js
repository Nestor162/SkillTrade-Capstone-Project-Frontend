import { create } from 'zustand'
import { getReviewsOfProfile } from '../utils/api'
import { mountStoreDevtool } from 'simple-zustand-devtools'

export const useReviewStore = create(set => ({
  reviews: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  errorMsg: '',
  handleGetReviewsOfProfile: async (id, page, sortBy = 'publicationDate') => {
    set({ isLoading: true })
    const { data, error } = await getReviewsOfProfile(id, page - 1, sortBy)
    if (error) {
      set({ errorMsg: error.message })
    } else {
      set({ reviews: data.content, totalPages: data.totalPages })
    }
    set({ isLoading: false })
  },
  handlePageClick: pageNumber => {
    set({ currentPage: pageNumber })
  },
  addReview: review => set(state => ({ reviews: [review, ...state.reviews] })),
  removeReview: id => set(state => ({ reviews: state.reviews.filter(review => review.id !== id) })),
  editReview: (id, updatedReview) =>
    set(state => ({
      reviews: state.reviews.map(review => (review.id === id ? updatedReview : review))
    }))
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Reviews', useReviewStore)
}
