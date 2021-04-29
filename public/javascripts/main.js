function openUpdateModal() {
    document.getElementById("update_info_modal").style.opacity = "0.95";
    document.getElementById("update_info_modal").style.zIndex = "100";
}

function closeUpdateModal(event) {
    document.getElementById("update_info_modal").style.opacity = "0";
    document.getElementById("update_info_modal").style.zIndex = "-100";
}

function openAddFeedModal() {
    document.querySelector("#add_feed_modal .overlay").style.opacity = "0.7";
    document.querySelector("#add_feed_modal .content").style.zIndex = "101";
    document.getElementById("add_feed_modal").style.zIndex = "100";
}

function closeAddFeedModal(event) {
    document.querySelector("#add_feed_modal .overlay").style.opacity = "1";
    document.querySelector("#add_feed_modal .content").style.zIndex = "-11";
    document.getElementById("add_feed_modal").style.zIndex = "-100";
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

function addNewFeed(feed) {
    console.log(feed)
    if (!feed["_id"])
        return
    // location.reload();

    const user_img_url = document.querySelector("img#user-avatar").src;
    const user_full_name = document.querySelector("#user_full_name").textContent;
    const feed_id = feed["_id"]
    const feed_content = feed["content"]
    const feed_image = feed["image"] ? `data:image/${feed["image"].contentType};base64,${feed["image"].data.toString('base64')}` : null
    const feed_embed_url = feed["embed_url"]

    const newFeedHTML = `<div id="feed_id_${feed_id}" class="mb-5 feed-item list-group-item flex-column align-items-start w-100">
                    <div class="w-100 mb-3 pd-sm">
                        <div class="float-right btn-float-right">
            <span type="button" data-toggle="modal" data-whatever="" data-target="#editFeed"
                  class="material-icons hv-3d">
            edit
            </span>
                            <span type="button" data-toggle="modal" data-whatever="" data-target="#confirmDeleteFeed"
                                  class="material-icons hv-3d c-danger">
            delete
            </span>
                        </div>
                        <div class="d-middle-y">
                            <a href=""><img class="feed_user_avatar" src="${user_img_url}"></a>
                            <div class="feed_title"><strong>${user_full_name}</strong></div>
                        </div>
                        <div class="pd-sm">
                            ${feed_content}
                        </div>
                        <div class="pd-sm">
                            <div>
                                ${feed_image ? '<img width=" 100%" class="feed_cover" src="' + feed_image + '" alt="Ảnh đính kèm">' : ''}
                            </div>
                            <div class="video-container">`
        +

    feed_embed_url==null?`<iframe class_name="embed_iframe" src="https://www.youtube.com/embed/Wvq9HBirtrU"\\n' +
        '                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"\\n' +
        '                allowFullScreen></iframe>`:`z`

        +
        `</div>
                        </div>
                    </div>
                    <hr>
                    <div class="cmt mt-1 pd-sm">
                        <div class="title mb-4 pd-sm">
                            <h5>Thảo luận</h5>
                        </div>
                        <div class="cmt-section pd-sm">
                            <div class="ls-cmt">
                                <div class="cmt">
                                    <div class="list-group-item flex-column align-items-start mb-3">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6><strong>
                                                </strong></h6>
                                            <span type="button" data-toggle="modal" data-target="#confirmDeleteCMT"
                                                  data-cmt-id=""
                                                  class="c-danger material-icons btn-float-right hv-3d">
                        delete_forever
                        </span>
                                        </div>
                                        <div>
                                            <span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="new-cmt">
                                <form action="../../service/addComment.php" method="POST">
                                    <div class="input-group mb-1">
                                        <input type="text" name="content_comment" class="form-control"
                                               placeholder="Nhập thảo luận mới"
                                               aria-label="Recipient's username" aria-describedby="basic-addon2">
                                        <input type="hidden" name="id_feed" value="<?= $feed['id'] ?>">
                                        <input type="hidden" name="id_user_current" value="">
                                        <div class="input-group-append">
                                            <button class="btn btn-secondary x-center" type="submit">
                                                <span class="material-icons">
                                                    send
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`;
    const feedDOM = document.createElement('div')
    feedDOM.innerText = newFeedHTML;
    console.log(newFeedHTML);
    console.log()

    // $('#feed_list').prepend(newFeedHTML)
}

$(document).ready(function () {
    $("#add-feed-form").on("submit", function (e) {
        activeLoading();

        document.getElementById("feed-input-text-hidden").value = document.getElementById("feed-input-text").textContent
        const dataString = $(this).serialize();
        const response = $.ajax({
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
                addNewFeed(res)
                closeAddFeedModal();
                inactiveLoading();
            }
        });

        e.preventDefault();
        return false;
    });
})
