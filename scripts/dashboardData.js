state.tasks = [
    new TaskItem(
        "Complete dashboard JavaScript",
        "Finish rendering logic",
        "doing",
        "study",
        "2026-05-31",
        "09:00"
    ),

    new TaskItem(
        "Study database normalization",
        "Review 3NF and BCNF",
        "todo",
        "study",
        "2026-05-31",
        "13:00"
    ),

    new TaskItem(
        "Workout session",
        "Chest and triceps",
        "done",
        "health",
        "2026-05-31",
        "19:00"
    ),

    new TaskItem(
        "Finish economics assignment",
        "Macroeconomics questions",
        "todo",
        "study",
        "2026-06-01",
        "11:00"
    ),

    new TaskItem(
        "Prepare presentation slides",
        "For project review",
        "doing",
        "work",
        "2026-06-02",
        "15:30"
    ),

    new TaskItem(
        "Complete dashboard JavaScript",
        "Finish rendering logic",
        "doing",
        "study",
        "2026-06-01",
        "09:00"
    ),

    new TaskItem(
        "Study database normalization",
        "Review 3NF and BCNF",
        "todo",
        "study",
        "2026-06-01",
        "13:00"
    ),

    new TaskItem(
        "Workout session",
        "Chest and triceps",
        "done",
        "health",
        "2026-06-01",
        "19:00"
    ),

    new TaskItem(
        "Finish economics assignment",
        "Macroeconomics questions",
        "todo",
        "study",
        "2026-06-02",
        "11:00"
    ),

    new TaskItem(
        "Prepare presentation slides",
        "For project review",
        "doing",
        "work",
        "2026-06-03",
        "15:30"
    ),

    new TaskItem(
        "Update LinkedIn profile",
        "Add latest projects",
        "done",
        "personal",
        "2026-05-30",
        "17:00"
    ),

    new TaskItem(
        "Practice LeetCode",
        "Solve 5 medium questions",
        "doing",
        "study",
        "2026-06-01",
        "20:00"
    ),

    new TaskItem(
        "Book dentist appointment",
        "Annual checkup",
        "todo",
        "health",
        "2026-06-05",
        "10:00"
    ),

    new TaskItem(
        "Review cybersecurity notes",
        "Authentication and hashing",
        "done",
        "study",
        "2026-05-29",
        "21:00"
    ),

    new TaskItem(
        "Clean workspace",
        "Organize desk and cables",
        "todo",
        "personal",
        "2026-06-04",
        "18:00"
    ),

    new TaskItem(
        "Prepare internship applications",
        "Finalize resume and cover letter",
        "doing",
        "work",
        "2026-06-03",
        "14:00"
    ),

    new TaskItem(
        "Read system design article",
        "Distributed caching",
        "todo",
        "study",
        "2026-06-06",
        "16:00"
    ),

    new TaskItem(
        "Morning run",
        "5km easy pace",
        "done",
        "fitness",
        "2026-05-28",
        "07:00"
    ),

    new TaskItem(
        "Budget planning",
        "Review monthly expenses",
        "todo",
        "finance",
        "2026-06-07",
        "12:00"
    ),

    new TaskItem(
        "Create API documentation",
        "Endpoints and examples",
        "doing",
        "work",
        "2026-06-02",
        "09:30"
    ),

    new TaskItem(
        "Buy groceries",
        "Weekly shopping",
        "done",
        "personal",
        "2026-05-31",
        "17:30"
    ),

    new TaskItem(
        "Research cloud providers",
        "AWS vs Azure comparison",
        "todo",
        "study",
        "2026-06-08",
        "15:00"
    ),

    new TaskItem(
        "Refactor CSS",
        "Reduce duplication",
        "doing",
        "work",
        "2026-06-04",
        "11:00"
    ),

    new TaskItem(
        "Submit scholarship documents",
        "Upload remaining forms",
        "done",
        "personal",
        "2026-05-27",
        "13:00"
    ),

    // Overdue tasks

    new TaskItem(
        "Finish database report",
        "Submission missed",
        "todo",
        "study",
        "2026-05-20",
        "23:59"
    ),

    new TaskItem(
        "Pay internet bill",
        "Monthly payment",
        "todo",
        "finance",
        "2026-05-25",
        "18:00"
    ),

    new TaskItem(
        "Review project proposal",
        "Feedback required",
        "doing",
        "work",
        "2026-05-26",
        "12:00"
    )
];

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
    if (state.currentView === "search") {
        renderSearchResults();
    }
});
