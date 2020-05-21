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
