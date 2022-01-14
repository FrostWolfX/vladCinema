const loadingBlock = '<div class="cssload-loader"></div>';
const blockLoading = document.querySelectorAll('.blockLoading');

const baseLoading = {
    startLoad: () => {
        blockLoading.forEach(element => {
            element.innerHTML = loadingBlock;
            element.style = 'text-align: center; padding: 0 0 5rem 0;';
        });

    },
    endLoad: () => {
        blockLoading.forEach(element => {
            element.textContent = '';
            element.style = '';
        });

    },
};

export default baseLoading;