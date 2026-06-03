function generateMockTasks(count = 70) {

    const titles = [
        "Complete analytics dashboard",
        "Study operating systems",
        "Review internship applications",
        "Practice LeetCode",
        "Refactor notes module",
        "Book haircut appointment",
        "Review cybersecurity lecture",
        "Buy groceries",
        "Prepare project presentation",
        "Morning run",
        "Budget review",
        "Read system design article",
        "Update portfolio website",
        "Submit scholarship paperwork",
        "Research cloud security",
        "Meal prep",
        "Fix search functionality",
        "Complete database exercises",
        "Schedule dentist visit",
        "Read 30 pages",
        "Prepare Trinity News application",
        "Watch JavaScript tutorial",
        "Organize workspace",
        "Write project documentation",
        "Prepare interview questions",
        "Review networking concepts",
        "Create wireframes",
        "Update resume",
        "Finish UI redesign",
        "Research authentication systems"
    ];

    const categories = [
        "work",
        "study",
        "personal",
        "health",
        "fitness",
        "finance"
    ];

    const tasks = [];

    const now = new Date();

    for (let i = 0; i < count; i++) {

        const title =
            titles[Math.floor(Math.random() * titles.length)];

        const category =
            categories[Math.floor(Math.random() * categories.length)];

        const rand = Math.random();

        let status;

        if (rand < 0.45) {
            status = "done";
        }
        else if (rand < 0.75) {
            status = "doing";
        }
        else {
            status = "todo";
        }

        const createdDate = new Date(now);

        createdDate.setDate(
            now.getDate() -
            Math.floor(Math.random() * 90)
        );

        createdDate.setHours(
            Math.floor(Math.random() * 24),
            Math.floor(Math.random() * 60),
            0,
            0
        );

        const dueDate = new Date(createdDate);

        dueDate.setDate(
            dueDate.getDate() +
            Math.floor(Math.random() * 14) + 1
        );

        const task = new TaskItem(
            title,
            `${title} task`,
            status,
            category,
            dueDate.toISOString().split("T")[0],
            dueDate.toTimeString().slice(0, 5)
        );

        task.time_created =
            createdDate.toISOString();

        if (status === "done") {

            const completedDate = new Date(createdDate);

            completedDate.setDate(
                completedDate.getDate() +
                Math.floor(Math.random() * 10) + 1
            );

            completedDate.setHours(
                Math.floor(Math.random() * 24),
                Math.floor(Math.random() * 60),
                0,
                0
            );

            task.time_completed =
                completedDate.toISOString();
        }

        tasks.push(task);
    }

    return tasks;
}

state.tasks = generateMockTasks(70);