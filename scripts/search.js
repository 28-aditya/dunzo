// ===========================
// SEARCH VIEW FUNCTIONALITY
// ===========================

function renderSearchResults() {

    const searchInput           = document.getElementById("search-input");
    const searchBarEmptyResults = document.getElementById("search-bar-empty-result");

    const query = searchInput.value.toLowerCase();

    if (query.length === 0) {
        searchBarEmptyResults.classList.add("active");
        document.getElementById("search-results").innerHTML = "";
        return;
    }

    searchBarEmptyResults.classList.remove("active");

    const requiredTasks = state.tasks.filter(task =>
        task.task_title.toLowerCase().includes(query)      ||
        (task.task_description || "").toLowerCase().includes(query) ||
        task.task_category.toLowerCase().includes(query)
    );

    renderTaskList({
        tasks: requiredTasks,
        containerId: "search-results"
    });
}

// attach input listener once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-input")
        .addEventListener("input", renderSearchResults);
});