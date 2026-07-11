// =========================
// NOTIFICATIONS MODULE
// =========================

document.addEventListener("DOMContentLoaded", initNotifications);

const NOTIF_POLL_INTERVAL_MS = 30000;

let notifBtn, notifPanel, notifList, notifBadge;

function initNotifications() {
    notifBtn   = document.getElementById("notifications-btn");
    notifPanel = document.getElementById("notif-panel");
    notifList  = document.getElementById("notif-list");
    notifBadge = document.getElementById("notif-badge");

    if (notifBtn) notifBtn.addEventListener("click", toggleNotifPanel);

    // Click-away closes the panel.
    document.addEventListener("click", (e) => {
        if (!notifPanel || !notifBtn) return;
        if (
            notifPanel.classList.contains("active") &&
            !notifPanel.contains(e.target) &&
            !notifBtn.contains(e.target)
        ) {
            closeNotifPanel();
        }
    });

    refreshUnreadCount();
    setInterval(refreshUnreadCount, NOTIF_POLL_INTERVAL_MS);
}

// -------------------------
// PANEL OPEN / CLOSE
// -------------------------
async function toggleNotifPanel() {
    if (!notifPanel) return;
    if (notifPanel.classList.contains("active")) {
        closeNotifPanel();
    } else {
        await openNotifPanel();
    }
}

async function openNotifPanel() {
    notifPanel.classList.add("active");
    await loadNotifications();

    // "Seen" = the panel was opened and the notification was shown to the
    // user, so mark everything currently listed as read.
    const hadUnread = state.notifications.some(n => !n.is_read);
    if (hadUnread) {
        try {
            await apiMarkAllNotificationsRead();
            state.notifications.forEach(n => n.is_read = true);
            renderNotifications();
            updateNotifBadge(0);
        } catch (err) {
            console.error("Mark all notifications read failed:", err);
        }
    }
}

function closeNotifPanel() {
    notifPanel?.classList.remove("active");
}

// -------------------------
// DATA
// -------------------------
async function loadNotifications() {
    try {
        state.notifications = await apiGetNotifications();
        renderNotifications();
        updateNotifBadge(state.notifications.filter(n => !n.is_read).length);
    } catch (err) {
        console.error("Load notifications failed:", err);
    }
}

async function refreshUnreadCount() {
    try {
        const { count } = await apiGetUnreadNotificationCount();
        updateNotifBadge(count);
    } catch (err) {
        console.error("Refresh unread notification count failed:", err);
    }
}

function updateNotifBadge(count) {
    if (!notifBadge) return;
    if (count > 0) {
        notifBadge.textContent = count > 99 ? "99+" : String(count);
        notifBadge.classList.remove("hidden");
    } else {
        notifBadge.classList.add("hidden");
    }
}

// -------------------------
// RENDER
// -------------------------
function renderNotifications() {
    if (!notifList) return;
    notifList.innerHTML = "";

    if (state.notifications.length === 0) {
        notifList.innerHTML = `<div class="empty-state">No notifications.</div>`;
        return;
    }

    state.notifications.forEach(n => {
        const item       = document.createElement("div");
        const body       = document.createElement("div");
        const msg        = document.createElement("p");
        const time       = document.createElement("span");
        const deleteBtn  = document.createElement("button");

        item.classList.add("notif-item");
        if (!n.is_read) item.classList.add("unread");

        body.classList.add("notif-item-body");
        msg.classList.add("notif-item-msg");
        time.classList.add("notif-item-time");
        deleteBtn.classList.add("notif-item-delete");

        msg.textContent    = n.message;
        time.textContent   = formatNotifTime(n.created_at);
        deleteBtn.innerHTML = "&#10005;";
        deleteBtn.title     = "Delete notification";
        deleteBtn.type      = "button";

        body.append(msg, time);
        item.append(body, deleteBtn);
        notifList.append(item);

        deleteBtn.addEventListener("click", async (e) => {
            e.stopPropagation();

            state.notifications = state.notifications.filter(x => x.id !== n.id);
            renderNotifications();
            updateNotifBadge(state.notifications.filter(x => !x.is_read).length);

            try {
                await apiDeleteNotification(n.id);
            } catch (err) {
                console.error("Delete notification failed:", err);
            }
        });
    });
}

function formatNotifTime(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";

    const diffMin = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diffMin < 1)  return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;

    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}d ago`;
}