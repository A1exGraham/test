$(document).ready(function() {
    var local_Id = 0;
    var localValue;
    var elTask = "<a href='#' class='edit-button'><span class='glyphicon glyphicon-pencil'></span></a>" +
        "<a href='#' class='remove-button'><span class='glyphicon glyphicon-remove'></span></a>";


    function showTasks() {
        var Storage_size =localStorage.length;
        if (Storage_size>0){
            for (var i=0; i<Storage_size; i++){
                var key=localStorage.key(i);
                $('.todo-list').append("<li class='item' data-item=" + localStorage.key(i)  + ">" + localStorage[key] + elTask + "</li>");
            }
        }
    }
    showTasks();


    $('#todo-input').on('keydown',function (e) {

        var str = this.value;
        if(e.keyCode === 13) {
            e.target.value = "";
                $('.item').each(function (index, el) {
                    var element_Id = $(this).data('item');
                    if(element_Id>local_Id) {
                        local_Id = element_Id;

                    }
                })
            local_Id++;
            localStorage.setItem(local_Id, str);
            localValue = localStorage.getItem(local_Id);
            $('.todo-list').append("<li class='item' data-item='" + local_Id + "'><span class='item-value'>" + localValue +
                elTask+"</span></li>");


            $.post("/test/index.php", { id: local_Id, text: localValue});

            // $.ajax({
            //     url: '/test/index.php',         /* Куда пойдет запрос */
            //     method: 'POST',             /* Метод передачи (post или get) */
            //     data: {id: local_Id, text: localValue},     /* Параметры передаваемые в запросе. */
            //     success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
            //         alert(data);            /* В переменной data содержится ответ от index.php. */
            //     }

            // });
        }
    });
    $('.btn-default').click(function () {
        $('.item').remove();
        localStorage.clear();
        local_Id = 0;
    })
    $('.todo-list').on('click','.remove-button',function () {
        var removeTask = $(this).closest('.item','todo-list');
        localStorage.removeItem(removeTask.attr("data-item"));
        removeTask.remove();
    })

    $('.todo-list').on('click', '.edit-button', function () {
        var editTask = $(this).closest('.item','todo-list');
        editTask.html('<input type="text" class="edit-task">'+' '+'<a href="#" class="save-button"><span class="glyphicon glyphicon-chevron-down"></span></a>' +
            ' '+'<a href="#" class="cancel-button"><span class="glyphicon glyphicon-ban-circle"></span></a>')

        $('.save-button').on('click',function () {
            var newTask=$('.edit-task').val();
            localStorage.setItem(editTask.attr('data-item'),newTask);
            editTask.text(newTask);
            editTask.append(elTask);
            $.post("/test/index.php", { id: local_Id, text: newTask} );
        })

        $('.cancel-button').on('click', function () {
            editTask.text(localStorage.getItem(editTask.attr('data-item')));
            editTask.append(elTask);
        })
    })



});

