$(document).ready(function () {
    $("#select").on('click', function () {
        var file = $("#file");
        file.trigger("click");
        $('input[type="file"]').change(function (e) {
            // var fileName = e.target.files[0].name;
            // $("#file_name").val(fileName);
            var reader = new FileReader();
            reader.onload = function (e) {
                // get loaded data and render thumbnail.
                document.getElementById("preview").src = e.target.result;
                $('#select').text("Image Selected");
            };
            // read the image file as a data URL.
            if (!this.files[0]){
                return
            }
            reader.readAsDataURL(this.files[0]);
            $('#select').removeClass("btn-primary").addClass("btn-secondary");
            $('#upload').text("Upload");
            $('#upload').prop('disabled', false);
            $('#upload').removeClass("btn-danger btn-success btn-secondary").addClass("btn-primary")
        });
    });
});

$(document).ready(function (e) {
    $('#upload').on('click', function () {
        var file_data = $('#file').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        $('#upload').text("Uploading");
        $('#upload').addClass("btn-warning");
        $.ajax({
            url: 'https://image.xiangliu.ca/api/test', // point to server-side controller method
            dataType: 'json', // what to expect back from the server
            contentType: false,
            processData: false,
            async: true,
            cache: false,
            data: form_data,
            type: 'POST',
            success: function (response) {
                $('#select').text("Select New Image");
                $('#upload').text("Your image is: " + response)
                $('#upload').removeClass("btn-warning").addClass("btn-success")
            },
            error: function (response) {
                $('#upload').text("Failed")
                $('#upload').removeClass("btn-warning").addClass("btn-danger")
                console.log("Fail")
            }
        });
        $('#select').removeClass("btn-secondary").addClass(" btn-primary");
    });
});