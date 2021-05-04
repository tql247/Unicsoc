function openUpdateModal() {
    document.getElementById("update_info_modal").style.opacity = "0.95";
    document.getElementById("update_info_modal").style.zIndex = "100";
}

function closeUpdateModal() {
    document.getElementById("update_info_modal").style.opacity = "0";
    document.getElementById("update_info_modal").style.zIndex = "-100";
}

function openAddFeedModal() {
    document.querySelector("#add_feed_modal .overlay").style.opacity = "0.7";
    document.querySelector("#add_feed_modal .content").style.zIndex = "101";
    document.getElementById("add_feed_modal").style.zIndex = "100";
}

function closeAddFeedModal() {
    document.querySelector("#add_feed_modal .overlay").style.opacity = "1";
    document.querySelector("#add_feed_modal .content").style.zIndex = "-11";
    document.getElementById("add_feed_modal").style.zIndex = "-100";
}

function openEditFeedModal() {
    document.querySelector("#edit_feed_modal .overlay").style.opacity = "0.7";
    document.querySelector("#edit_feed_modal .content").style.zIndex = "101";
    document.getElementById("edit_feed_modal").style.zIndex = "100";
}

function closeEditFeedModal() {
    document.querySelector("#edit_feed_modal .overlay").style.opacity = "1";
    document.querySelector("#edit_feed_modal .content").style.zIndex = "-11";
    document.getElementById("edit_feed_modal").style.zIndex = "-100";
}

function openAddNotificationModal() {
    document.querySelector(".add-notification-modal .overlay").style.opacity = "0.7";
    document.querySelector(".add-notification-modal .content").style.zIndex = "101";
    document.querySelector(".add-notification-modal").style.zIndex = "100";
}

function closeAddNotificationModal() {
    document.querySelector(".add-notification-modal .overlay").style.opacity = "1";
    document.querySelector(".add-notification-modal .content").style.zIndex = "-11";
    document.querySelector(".add-notification-modal").style.zIndex = "-100";
}

function clickElement(id) {
    document.getElementById(id).click();
}

function activeLoading() {
    document.getElementById("loading").classList.add("active");
}

function inactiveLoading() {
    document.getElementById("loading").classList.remove("active");
}

function addNewFeed(data) {
    $(data).prependTo("#feed_list");
}

function updateFeed(_id, data) {
    $(`#${_id}`).replaceWith(data)
    $(".edit-feed-btn").on('click', handleEditFeedBtn)
}

function deleteFeed(_id) {
    $(`#${_id}`).replaceWith('')
}

function addComment(feed_id, data) {
    const list_feed_cmt = $(`#${feed_id}`).find('.ls-cmt')
    $(data).appendTo(list_feed_cmt);
}

function deleteComment(_id) {
    $(`#${_id}`).replaceWith('')
}

function clearQueryUrl() {
    const uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        const clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
}

function setFeedModalContent(_id) {
    const parentModal = $("#edit_feed_modal")
    const content = $(`#${_id}`).find(".feed-content").text().trim();
    // const image_url = $(`#${_id}`).querySelector("")
    parentModal.find("#edit-feed-id").val(_id)
    parentModal.find(".edit-feed-content").text(content)
}

function handleEditFeedBtn(e) {
    const target_id = e.currentTarget.closest('.feed-item').id;
    setFeedModalContent(target_id);
    openEditFeedModal();
}

function handleDeleteFeedBtn(e) {
    const target_id = e.currentTarget.closest('.feed-item').id;
    $("#delete-feed-id").val(target_id)
    $('#confirmDeleteFeed').modal('show');
}

function handleDeleteCmtBtn(e) {
    const target_id = e.currentTarget.closest('.cmt').id;
    $("#delete-cmt-id").val(target_id)
    $('#confirmDeleteCmt').modal('show');
}

$(document).ready(function () {
    $("#add-acc-form").on("submit", function (e) {
        e.preventDefault();
        activeLoading();

        const dataString = $(this).serialize();
        console.log(dataString)
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/admin/create",
            data: dataString,
            async: true,
            success: (res) => {
                clearQueryUrl();
                location.reload()
                // inactiveLoading();
            },
            complete: () => {
                location.reload();
            }
        });

        return false;
    });


    $("#add-notification-form").on("submit", function (e) {
        e.preventDefault();
        console.log('add-notification')
        // activeLoading();
        document.getElementById("notification-title-hidden").value = document.getElementById("notification-title").textContent
        document.getElementById("notification-content-hidden").value = document.getElementById("notification-content").textContent

        const dataString = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/notification/post",
            data: dataString,
            async: true,
            success: (res) => {
                console.log(res)
            },
            complete: () => {
                // location.reload()
            }
        });

        return false;
    });

    $("#add-feed-form").on("submit", function (e) {
        e.preventDefault();
        console.log('add')
        activeLoading();

        document.getElementById("feed-input-text-hidden").value = document.getElementById("feed-input-text").textContent
        const dataString = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/feed/post",
            data: dataString,
            async: true,
            success: (res) => {
                // clear query string
                const uri = window.location.toString();
                if (uri.indexOf("?") > 0) {
                    const clean_uri = uri.substring(0, uri.indexOf("?"));
                    window.history.replaceState({}, document.title, clean_uri);
                }
                if (res.status !== 200) location.reload()
                addNewFeed(res.data)
                closeAddFeedModal();
                inactiveLoading();
            }
        });

        return false;
    });
    $("#edit-feed-form").on("submit", function (e) {
        console.log('edit')
        activeLoading();

        document.getElementById("edit_feed_content_hidden").value = document.getElementById("edit-feed-input-text").textContent
        const dataString = $(this).serialize();
        const _id = document.getElementById("edit-feed-id").value
        $.ajax({
            type: "POST",
            url: "/feed/update",
            data: dataString,
            async: true,
            success: (res) => {
                clearQueryUrl()
                if (res.status !== 200) location.reload()
                updateFeed(_id, res.data)
                closeEditFeedModal();
                inactiveLoading();
            }
        });

        e.preventDefault();
        return false;
    });
    $("#delete-feed-form").on("submit", function (e) {
        $('#confirmDeleteFeed').modal('hide');
        activeLoading();

        const dataString = $(this).serialize();
        const _id = document.getElementById("delete-feed-id").value
        $.ajax({
            type: "POST",
            url: "/feed/delete",
            data: dataString,
            async: true,
            success: (res) => {
                clearQueryUrl()
                if (res.status !== 200) location.reload()
                deleteFeed(_id, res.data)
                closeEditFeedModal();
                inactiveLoading();
            }
        });

        e.preventDefault();
        return false;
    });

    $(".edit-feed-btn").on('click', handleEditFeedBtn)
    $(".delete-feed-btn").on('click', handleDeleteFeedBtn)


    $(".add-comment-form").on("submit", function (e) {
        e.preventDefault();
        activeLoading();

        const _id = $(this).closest('.feed-item').attr('id')
        const dataString = $(this).serialize();
        const self = this;

        $.ajax({
            type: "POST",
            url: "/comment/post",
            data: dataString,
            async: true,
            success: (res) => {
                clearQueryUrl()
                if (res.status !== 200) location.reload()
                addComment(_id, res.data);
                inactiveLoading();
                self.reset();
            }
        });

        return false;
    });
    $("#delete-cmt-form").on("submit", function (e) {
        e.preventDefault();
        $('#confirmDeleteCmt').modal('hide');
        activeLoading();

        const dataString = $(this).serialize();
        const _id = document.getElementById("delete-cmt-id").value
        $.ajax({
            type: "POST",
            url: "/comment/delete",
            data: dataString,
            async: true,
            success: (res) => {
                clearQueryUrl()
                if (res.status !== 200) location.reload()
                deleteComment(_id)
                inactiveLoading();
            }
        });

        return false;
    });

    $(".delete-cmt-btn").on('click', handleDeleteCmtBtn);
})
