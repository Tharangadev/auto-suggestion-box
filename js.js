jQuery(document).ready(function($) {
    var auto_sugg = {
        block: "",
        init: function() {
            this.block = $('.block');
            this.bind();
        },
        bind: function() {
            this.block.find('.search_btn').click(function(event) {

            });
            this.block.find('.search').focus(function(event) {
                auto_sugg.block.find('.search').val("");
            });
            this.block.find('.search').focusout(function(event) {
               
            });
            this.block.find('.search').keyup(function(event) {
                if ($(this).val() !== "") {
                    auto_sugg.request($(this).val());
                };

            });
            $('.search_list').on('click', 'li', function() {
                var li_name = $(this).find('.name').html();
                console.log(li_name);
                auto_sugg.block.find('.search').val(li_name);
                $('.search_list').html("");
            });
        },

        request: function(value) {
            $.ajax({
                    url: 'search.php',
                    type: 'GET',
                    dataType: 'json',
                    data: { search: value },
                })
                .done(function(data) {
                    auto_sugg.template(data);
                });

        },
        template: function(data) {
            var online_display = "";
            var ajax_data = data;
            var main_temp = '';



            if (data.message == undefined || data.message == "") {

                for (var i = 0; i < data.length; i++) {
                    online_display += '<li><span class="name">' + data[i].first_name + '</span><span class="online_'+data[i].online +'"><span class="online_indi"></span></span></li>'
                };


                $('.search_list').html(online_display);
            } else {
                online_display = ' <li class="not_found">can not find</li>';
                $('.search_list').html(online_display);
            }


        }

    }
    auto_sugg.init();
});
