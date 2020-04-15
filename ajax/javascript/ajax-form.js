// API CALL
// http://rest.learncode.academy/api/learncode/friends

$(function () {
  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  $('form').on('submit', function(e) {
    e.preventDefault();
  });

  function addOrder(order) {
    return '<li class="order-list" data-id="' + order.id+ '" style="display: none;">' +
              '<p>' +
                '<strong>Name: </strong>' +
                '<span class="name noedit">' + order.name + '</span>' +
                '<input class="edit name" type="text">' +
              '</p>' +
              '<p>' +
                '<strong>Drink: </strong>' +
                '<span class="drink noedit">' + order.drink + '</span>' +
                '<input class="edit drink" type="text">' +
              '</p>' +
              '<button class="remove">Remove</button>' +
              '<button class="editOrder noedit">Edit</button>' +
              '<button class="saveEdit edit">Save</button>' +
              '<button class="cancelEdit edit">Cancel</button>' +
            '</li>';
  }

  // GET all the data
	$.ajax({
    method: 'GET',
    url: 'http://localhost:3000/orders',
    dataType: 'json',
    success: function(orders) {
      var delayctr = 100;
      
      $.each(orders, function(i, order) {
        // var orderTemplate = $('<li class="order-list" data-id="' + order.id+ '" style="display:none;">Name: ' + order.name + ' Drink: ' + order.drink + '<button class="remove" data-id="' + order.id+ '" style="margin-left: 5px; cursor: pointer;">&times;</button></li>');

        // $orders.append(orderTemplate);
        $orders.append(addOrder(order));
        $('.order-list[data-id="' + order.id + '"]').delay(delayctr).slideDown(200);
        delayctr += 150;
      });
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
    }
  });
  
  // POST the entered data
  $('#add-order').on('click', function() {
    var order = {
      name: $('#name').val(),
      drink: $('#drink').val()
    }

    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/orders',
      data: { "name": $('#name').val(), "drink": $('#drink').val() },
      success: function(newOrder) {
        // var orderTemplate = $('<li class="order-list" data-id="' + newOrder.id+ '">Name: ' + newOrder.name + ' Drink: ' + newOrder.drink + '<button class="remove" data-id="' + newOrder.id+ '" style="margin-left: 5px; cursor: pointer;">&times;</button></li>');

        // $orders.append(orderTemplate);
        $orders.append(addOrder(newOrder));
        $('.order-list[data-id="' + newOrder.id + '"]').hide().slideDown(200);

        $name.val('');
        $drink.val('');
      },
      error: function() {
        alert('error saving order');
      }
    });
  });

  // DELETE the selected data
  $orders.delegate('.remove', 'click', function() {
    var orderId = $(this).attr('data-id');
    var $li = $(this).closest('li');

    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/orders/' + $li.attr('data-id'),
      dataType: 'JSON',
      data: { "id": orderId },
      success: function(response) {
        $li.slideUp(200, function() {
          $(this).remove();
        });
      }
    });
  });

  // Populate the data of the selected order
  $orders.delegate('.editOrder', 'click', function() {
    var $li = $(this).closest('li');
    $li.find($('input.name')).val( $li.find($('span.name')).text());
    $li.find($('input.drink')).val( $li.find($('span.drink')).text());
    $li.addClass('edit');
  });

  // Cancel editing order
  $orders.delegate('.cancelEdit', 'click', function() {
    var $li = $(this).closest('li');
    $li.removeClass('edit');
  });

  // Update the order of the selected item
  $orders.delegate('.saveEdit', 'click', function() {
    var $li = $(this).closest('li');
    var order = {
      name: $li.find($('input.name')).val(),
      drink: $li.find($('input.drink')).val(),
    }

    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3000/orders/' + $li.attr('data-id'),
      dataType: 'JSON',
      data: order,
      success: function(response) {
        $li.find($('span.name')).text(order.name);
        $li.find($('span.drink')).text(order.drink);
        $li.removeClass('edit');
      },
      error: function() {
        alert('Error updating order');
      }
    });
  });
});