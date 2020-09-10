$(document).ready(function() {
    var new_Id =0;
    var localValue;

    function showTasks() {
        var Storage_size =localStorage.length;
        if (Storage_size>0){
            for (var i=0; i<Storage_size; i++){
                var key=localStorage.key(i);
                $('.todo-list').append("<li class='item' data-item=" + localStorage.key(i)  + ">" + localStorage[key] + "</li>");
            }
        }

    }
    showTasks();

    $('#todo-input').on('keydown',function (e) {
        if(e.keyCode != 13) return;
        var str = this.value;
        e.target.value = "";
        if (str.length>0){
            $('.item').each(function (index, el) {
                var element_Id = $(this).attr('data-item');
                if(element_Id>new_Id){
                    new_Id = element_Id;
                }
            })
            new_Id++;
            localStorage.setItem('taskId_'+new_Id, str);
            localValue = localStorage.getItem('taskId_' + new_Id);
            $('.todo-list').append("<li class='item' data-item='" + new_Id + "'><span class='item-value'>" + localValue + "</span></li>");;
        }
    });
    $('.btn-default').click(function () {
        $('.item').remove();
        localStorage.clear();
        new_Id = 0;
    })
});

// $(document).ready(function() {
//     // Добавляем новую запись, когда произошел клик по кнопке
//     $("#FormSubmit").click(function (e) {
//
//         e.preventDefault();
//
//
//         var myData = "task=" + $("#task").val(); //post variables
//
//         jQuery.ajax({
//             type: "POST", // HTTP метод  POST или GET
//             url: "", //url-адрес, по которому будет отправлен запрос
//             dataType: "text", // Тип данных,  которые пришлет сервер в ответ на запрос ,например, HTML, json
//             data: myData, //данные, которые будут отправлены на сервер (post переменные)
//             success: function (response) {
//                 $("#responds").append(response);
//                 $("#task").val(''); //очищаем текстовое поле после успешной вставки
//             },
//             error: function (xhr, ajaxOptions, thrownError) {
//                 alert(thrownError); //выводим ошибку
//             }
//         });
//     });
// });

