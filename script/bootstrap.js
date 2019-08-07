var bs= {};
(function (cx) {

    let currentColSize = 'sm';

    cx.noGuttersTest = function()
    {
	const noGuttersClass = 'no-gutters';
	let theRow = $('#no-gutters-test');
	if(theRow.hasClass(noGuttersClass))
	{
	    theRow.removeClass(noGuttersClass);
	    $('#btnNoGutters').html('remove  gutters');
	}
	else
	{
	    theRow.addClass(noGuttersClass);	    
	    $('#btnNoGutters').html('restore gutters');
	}
    }

    cx.changeColumnSize = function()
    {
	let cols = $('.col-' + currentColSize);
	cols.removeClass('col-' + currentColSize);
	switch(currentColSize)
	{
	    case 'sm':
	    currentColSize = 'md';
	    break;
	    case 'md':
	    currentColSize = 'lg';
	    break;
	    case 'lg':
	    currentColSize = 'xl';
	    break;
	    case 'xl':
	    currentColSize = 'sm';
	    break;
	    default:
	    currentColSize = 'sm';
	}

	cols.addClass('col-' + currentColSize);
	$('#btnChangeColSize').html(currentColSize + '');
    }
    
})(bs);
