const loadingBlock = '<div class="cssload-loader"></div>';
const blockLoading = document.querySelector('.blockLoading');

const baseLoading = {
    startLoad: () => {
        blockLoading.innerHTML = loadingBlock;
        blockLoading.style = 'text-align: center; padding: 0 0 5rem 0;';
    },
    endLoad: () => {
        blockLoading.textContent = '';
        blockLoading.style = '';
    },
};

export default baseLoading;