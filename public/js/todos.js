// check off specific todos

$('ul').on('click', 'li', function() {
	$(this).toggleClass('completed');
});

//click on X to delete todo
$('ul').on('click', '.delete', function(event) {
	$(this).parent().fadeOut(500, function() {
		// event.preventDefault();
		// $('#del').attr('action', '/test1/newtodo/' + this + '?_method=DELETE').submit();
		$(this).remove();
		document.forms['del'].submit();
	});
	event.stopPropagation(); //stop event bubbling
});

$("input[type='text']").keypress(function(event) {
	if (event.which === 13) {
		document.forms[0].submit();
		// var todoText = $(this).val();
		// $(this).val('');
		// $('ul').append('<li><span class="delete"><i class="fas fa-trash-alt"></i></span> ' + todoText + '</li');
	}
});

$('.fa-pencil-alt').click(function() {
	$("input[type='text']").fadeToggle();
});
