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

function openEditNotificationModal() {
    document.querySelector("#edit_notification_modal .overlay").style.opacity = "0.7";
    document.querySelector("#edit_notification_modal .content").style.zIndex = "101";
    document.getElementById("edit_notification_modal").style.zIndex = "100";
}

function closeEditNotificationModal() {
    document.querySelector("#edit_notification_modal .overlay").style.opacity = "1";
    document.querySelector("#edit_notification_modal .content").style.zIndex = "-11";
    document.getElementById("edit_notification_modal").style.zIndex = "-100";
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

function setEditNotificationModalContent(_id) {
    const parentModal = $("#edit_notification_modal")
    const title = $(`#${_id}`).find(".notify-title").text().trim();
    const content = $(`#${_id}`).find(".notify-detail").text().trim();
    parentModal.find("#edit_notification_id").val(_id)
    parentModal.find("#edit-notification-title").text(title)
    parentModal.find("#edit-notification-content").text(content)
}

function setEditFeedModalContent(_id) {
    const parentModal = $("#edit_feed_modal")
    const content = $(`#${_id}`).find(".feed-content").text().trim();
    // const image_url = $(`#${_id}`).querySelector("")
    parentModal.find("#edit-feed-id").val(_id)
    parentModal.find(".edit-feed-content").text(content)
}

function handleEditNotificationBtn(e) {
    const target_id = e.currentTarget.closest('.notification-item').id;
    setEditNotificationModalContent(target_id);
    openEditNotificationModal();
}

function handleDeleteNotificationBtn(e) {
    const target_id = e.currentTarget.closest('.notification-item').id;
    $("#delete-notification-id").val(target_id)
    $('#confirmDeleteNotification').modal('show');
}

function handleEditFeedBtn(e) {
    const target_id = e.currentTarget.closest('.feed-item').id;
    setEditFeedModalContent(target_id);
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

function handleLoadMoreFeed(res) {
    if (res.status === 200) {
        if (res.data) {
            $(res.data).appendTo("#feed_list")
            window.isLoadingFeed = false
        } else {
            $("<h5 class='d-middle-x p-5'>Đã tải hết</h5>").appendTo("#feed_list")
        }
    }
}

function handleComment(e) {
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
}

function loadMoreFeed() {
    console.log('load')
    // Kiểm tra có đang tải hay không, nếu đang tải thì thôi
    if (window.isLoadingFeed) {
        return
    }
    console.log('allow')

    // Đánh dấu là đang tải
    window.isLoadingFeed = true
    // Tăng trang đã tải lên 1
    window.feedIndex++;

    // Kiểm tra có phải đang xem trang cá nhân của mình hay không
    if (window.location.href.match('/user/me')) {
        //  Lấy bài viết của mình thôi
        $.ajax({
            type: "POST",
            url: "/feed/view",
            dataType: "json",
            data: {feedIndex: window.feedIndex, my_feed: true},
            async: true,
            success: handleLoadMoreFeed
        });
    }
    // Kiểm tra có phải đang xem trang cá nhân của ai đó không
    else if (window.location.href.match('/user/visit')) {
        //  Lấy bài viết của một người đó thôi
        //    Lấy tất cả các bài viết
        $.ajax({
            type: "POST",
            url: "/feed/view",
            dataType: "json",
            data: {feedIndex: window.feedIndex, host_id: $("#hoster-id").val()},
            async: true,
            success: handleLoadMoreFeed
        });
    } else {
        //    Lấy tất cả các bài viết
        $.ajax({
            type: "POST",
            url: "/feed/view",
            dataType: "json",
            data: {feedIndex: window.feedIndex},
            async: true,
            success: handleLoadMoreFeed
        });
    }

}

function beep() {
    const audio = new Audio(
        '/public/media/beep.wav');
    audio.play();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#imgInp").change(function() {
    readURL(this);
});

function eventStuff() {
    $("#add-acc-form").on("submit", function (e) {
        e.preventDefault();
        activeLoading();

        const dataString = $(this).serialize();
        console.log(dataString)
        $.ajax({
            type: "POST",
            url: "/admin/create",
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


    $(document).on("submit", "#add-notification-form", function (e) {
        e.preventDefault();
        console.log('add-notification')
        activeLoading();
        document.getElementById("notification-title-hidden").value = document.getElementById("notification-title").textContent
        document.getElementById("notification-content-hidden").value = document.getElementById("notification-content").textContent

        const dataString = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/notification/post",
            data: dataString,
            async: true,
            success: (res) => {
                console.log(res)
            },
            complete: () => {
                location.reload()
            }
        });

        return false;
    });
    $(document).on("submit", "#edit-notification-form", function (e) {
        e.preventDefault();
        console.log('edit-notification')
        // activeLoading();
        document.getElementById("edit-notification-title-hidden").value = document.getElementById("edit-notification-title").textContent
        document.getElementById("edit-notification-content-hidden").value = document.getElementById("edit-notification-content").textContent

        const dataString = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/notification/edit",
            data: dataString,
            async: true,
            success: (res) => {
                console.log(res)
            },
            complete: () => {
                location.reload()
            }
        });

        return false;
    });
    $(document).on("submit", "#delete-notification-form", function (e) {
        e.preventDefault();
        $('#confirmDeleteNotification').modal('hide');
        activeLoading();

        const dataString = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/notification/delete",
            data: dataString,
            async: true,
            success: (res) => {
                console.log(res)
            },
            complete: () => {
                location.reload()
            }
        });

        return false;
    });
    $(document).on('click', ".edit-notification-btn", handleEditNotificationBtn)
    $(document).on('click', ".delete-notification-btn", handleDeleteNotificationBtn)


    $(document).on("submit", "#add-feed-form", function (e) {
        e.preventDefault();
        console.log('add')
        activeLoading();
        document.getElementById("feed-input-text-hidden").value = document.getElementById("feed-input-text").textContent

        $.ajax({
            type: "POST",
            url: "/feed/post",
            processData: false,
            contentType: false,
            data: new FormData(this),
            async: true,
            success: (res) => {
                clearQueryUrl();
                if (res.status !== 200) console.log(res)
                addNewFeed(res.data)
                closeAddFeedModal();
                inactiveLoading();
            }
        });

        return false;
    });
    $(document).on("submit", "#edit-feed-form", function (e) {
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
    $(document).on("submit", "#delete-feed-form", function (e) {
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
    $(document).on('click', ".edit-feed-btn", handleEditFeedBtn)
    $(document).on('click', ".delete-feed-btn", handleDeleteFeedBtn)


    $(document).on("submit", ".add-comment-form", handleComment);
    $(document).on("submit", "#delete-cmt-form", function (e) {
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
    $(document).on('click', ".delete-cmt-btn", handleDeleteCmtBtn);

    $(document).on("submit", "#update_info_form", function (e) {
        activeLoading();
    });

    $('#topic-filter').on('change', function (e) {
        if (this.value === "Tất cả")  window.location.href = '/notification/1'
        window.location.href = '/notification/' + this.value + '/1'
    });

    $("#update-avatar").on('click', function (e) {
        $("#update-avatar-hidden").click();
    })

    $("#loginForm").validate({
        rules: {
            password: "required",
            username: "required"
        },
        messages: {
            password: "Vui lòng nhập mật khẩu",
            username: "Vui lòng nhập username"
        }
    });

}


$(document).ready(function () {
    eventStuff();
    /*
    * Hàm này dùng để tự động tải thêm bài viết, thông báo khi kéo đến cuối trang
    * */
    // Đánh dấu là có đang tải hay không, tránh trường hợp liên tục gửi request
    // Dùng window để khai báo biến có thể dùng được ở mọi chỗ
    window.isLoadingFeed = false;
    // Đánh dấu trang đã tải
    window.feedIndex = 1;
    // Xử lý sự kiện lăn chuột hoặc scroll page
    $(window).scroll(function () {
        // Hàm này dùng để kiểm tra có phải đã lăn chuột xuống cuối trang hay không
        if (Math.round($(window).scrollTop() + $(window).height()) > $(document).height() - 5) {
            // Kiểm tra là đang xem thông báo hay đang xem bài viết
            if (window.location.href.match('/notification')) {
            } else {
                // Nếu đang xem bài viết thì tải thêm bài viết
                loadMoreFeed()
            }
        }
    });
})
let socketClient = io.connect('https://universitysocial.herokuapp.com/');

socketClient.on('outside', function () {
    beep()
    console.log('outside');
});

socketClient.on('new-notify', function (data) {
    beep()
    $(data.data).prependTo("#qw-notify-list")
});