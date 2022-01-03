export const applyToggleLoadingState = (state) => ({
    ...state,
    loading: !state.loading,
});
