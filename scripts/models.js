// ======================
// TASK CLASS
// ======================

class TaskItem {
    constructor(
        title,
        description,
        status,
        category,
        date,
        time,
        timeCreated = null,
        timeCompleted = null
    ) {

        this.task_id = crypto.randomUUID();

        this.task_title       = title;
        this.task_description = description;
        this.task_status      = status;
        this.task_category    = category;
        this.task_date        = date;
        this.task_time        = time;

        this.time_created = timeCreated || new Date().toISOString();

        if (timeCompleted) {
            this.time_completed = timeCompleted;
        } else if (status === "done" && date && time) {
            const parsed = new Date(`${date}T${time}`);
            this.time_completed = isNaN(parsed.getTime())
                ? new Date().toISOString()
                : parsed.toISOString();
        } else {
            this.time_completed = null;
        }
    }
}

// ======================
// NOTE CLASS
// ======================

class NoteItem {
    constructor(title, content) {
        this.note_id       = crypto.randomUUID();
        this.note_title    = title;
        this.note_content  = content;
        this.linked_tasks  = [];
        this.time_created  = new Date().toISOString();
        this.time_modified = null;
    }
}