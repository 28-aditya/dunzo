// ===========================
// ANALYTICS HELPER FUNCTIONS
// ===========================

function getWeekBounds() {

    const today = new Date();

    const day = today.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day;

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    return { weekStart, weekEnd };
}

function getCurrentWeekTasks() {

    const { weekStart, weekEnd } = getWeekBounds();

    return state.tasks.filter(task => {

        const taskDate = new Date(task.task_date);

        return (
            taskDate >= weekStart &&
            taskDate <= weekEnd
        );
    });
}

function getBestDay() {

    const counts = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0
    };

    state.tasks.forEach(task => {

        if (
            task.task_status !== "done" ||
            !task.time_completed
        ) {
            return;
        }

        const day = new Date(task.time_completed)
            .toLocaleDateString(
                "en-US",
                { weekday: "long" }
            );

        counts[day]++;
    });

    let bestDay = "--";
    let highest = 0;

    for (const day in counts) {

        if (counts[day] > highest) {
            highest = counts[day];
            bestDay = day;
        }
    }

    return bestDay;
}

function getCurrentStreak() {

    const completedDates = new Set(
        state.tasks
            .filter(
                task =>
                    task.task_status === "done" &&
                    task.time_completed
            )
            .map(
                task =>
                    new Date(task.time_completed)
                        .toISOString()
                        .split("T")[0]
            )
    );

    let streak = 0;

    const currentDate = new Date();

    while (true) {

        const dateString =
            currentDate
                .toISOString()
                .split("T")[0];

        if (completedDates.has(dateString)) {

            streak++;

            currentDate.setDate(
                currentDate.getDate() - 1
            );

        } else {

            break;
        }
    }

    return streak;
}

function getTrendData() {

    const completedTasks = state.tasks
        .filter(task =>
            task.task_status === "done" &&
            task.time_completed
        )
        .sort(
            (a, b) =>
                new Date(a.time_completed) -
                new Date(b.time_completed)
        );

    if (completedTasks.length === 0) {

        return {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            counts: [0, 0, 0, 0, 0, 0, 0],
            title: "Weekly Completion Trend"
        };
    }

    const firstCompletion =
        new Date(
            completedTasks[0].time_completed
        );

    const lastCompletion =
        new Date(
            completedTasks[
                completedTasks.length - 1
            ].time_completed
        );

    const daysCovered = Math.ceil(
        (
            lastCompletion -
            firstCompletion
        ) /
        (1000 * 60 * 60 * 24)
    );

    // ======================
    // SHOW DAYS
    // ======================

    if (daysCovered <= 21) {

        const { weekStart } =
            getWeekBounds();

        const labels = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ];

        const counts =
            [0, 0, 0, 0, 0, 0, 0];

        completedTasks.forEach(task => {

            const completedDate =
                new Date(
                    task.time_completed
                );

            const diff = Math.floor(
                (
                    completedDate -
                    weekStart
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );

            if (
                diff >= 0 &&
                diff < 7
            ) {
                counts[diff]++;
            }
        });

        return {
            labels,
            counts,
            title: "Weekly Completion Trend"
        };
    }

    // ======================
    // SHOW WEEKS
    // ======================

    const labels = [];
    const counts = [];

    const now = new Date();

    for (
        let i = 7;
        i >= 0;
        i--
    ) {

        const start =
            new Date(now);

        start.setDate(
            now.getDate() -
            (i * 7)
        );

        start.setHours(
            0,
            0,
            0,
            0
        );

        const end =
            new Date(start);

        end.setDate(
            start.getDate() + 6
        );

        end.setHours(
            23,
            59,
            59,
            999
        );

        const count =
            completedTasks.filter(
                task => {

                    const completed =
                        new Date(
                            task.time_completed
                        );

                    return (
                        completed >= start &&
                        completed <= end
                    );
                }
            ).length;

        labels.push(
            `W${8 - i}`
        );

        counts.push(count);
    }

    return {
        labels,
        counts,
        title:
            "Completion Trend (Last 8 Weeks)"
    };
}

function drawWeeklyTrend(canvasId) {

    const canvas =
        document.getElementById(canvasId);

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    const {
        labels,
        counts
    } = getTrendData();

    const padding = 50;

    const graphWidth =
        width - (padding * 2);

    const graphHeight =
        height - (padding * 2);

    const maxValue =
        Math.max(...counts, 1);

    const stepX =
        graphWidth /
        (labels.length - 1);

    // Grid

    ctx.strokeStyle =
        "rgba(255,255,255,0.08)";

    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {

        const y =
            padding +
            ((graphHeight / 4) * i);

        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - padding,
            y
        );

        ctx.stroke();
    }

    // Line

    ctx.beginPath();

    counts.forEach(
        (value, index) => {

            const x =
                padding +
                (stepX * index);

            const y =
                height -
                padding -
                (
                    value /
                    maxValue
                ) * graphHeight;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    );

    ctx.strokeStyle =
        "#c8f261";

    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.stroke();

    // Points

    counts.forEach(
        (value, index) => {

            const x =
                padding +
                (stepX * index);

            const y =
                height -
                padding -
                (
                    value /
                    maxValue
                ) * graphHeight;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#c8f261";

            ctx.fill();

            ctx.fillStyle =
                "#ffffff";

            ctx.font =
                "12px DM Sans";

            ctx.textAlign =
                "center";

            ctx.fillText(
                value,
                x,
                y - 14
            );
        }
    );

    // Labels

    ctx.fillStyle = "#888";
    ctx.font = "12px DM Sans";

    labels.forEach(
        (label, index) => {

            const x =
                padding +
                (stepX * index);

            ctx.fillText(
                label,
                x,
                height - 20
            );
        }
    );
}

// ===========================
// ANALYTICS RENDERING
// ===========================

function renderAnalytics() {

    const weekTasks =
        document.getElementById("week-tasks");

    const weekRate =
        document.getElementById("week-rate");

    const bestDay =
        document.getElementById("best-day");

    const streak =
        document.getElementById("streak-count");

    const chartTitle =
        document.querySelector(
            "#view-analytics .analytics-card.full .analytics-title"
        );

    const currentWeekTasks =
        getCurrentWeekTasks();

    const completedWeekTasks =
        currentWeekTasks.filter(
            task =>
                task.task_status === "done"
        );

    const completionRate =
        currentWeekTasks.length === 0
            ? 0
            : Math.round(
                (
                    completedWeekTasks.length /
                    currentWeekTasks.length
                ) * 100
            );

    weekTasks.textContent =
        `${currentWeekTasks.length} Tasks`;

    weekRate.textContent =
        `${completionRate}%`;

    bestDay.textContent =
        getBestDay();

    streak.textContent =
        `${getCurrentStreak()} days`;

    chartTitle.textContent =
        getTrendData().title;

    drawWeeklyTrend(
        "weekly-trend-chart"
    );
}