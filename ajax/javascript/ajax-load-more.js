$(function () {
  var $content = $('#content');
  var pageSize = 5;
  var pageLast = 0;
  var orderItems = [];

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/orders',
    success: function(orders) {
      orderItems = orders;
      loadData(orders, pageLast, pageSize);
      
    },
    error: function() {
      alert('Error loading data');
    }
  });

  // $('#loadMore').on('click', function(){
  //   loadData(orderItems, pageLast, pageSize);
  // });
  
  function orderTemplate(order) {
    return `<div class="box" id="${order.id}">
              <p><strong>ID:</strong>${order.id}</p>
              <p><strong>Name:</strong>${order.name}</p>
              <p><strong>Drink:</strong>${order.drink}</p>
              <img class="" src="${order.img}"/>
            </div>`;

  }

  function loadData(data, start, limit) {  
    var order = [];

    console.log('START:', start);

    for (var i = start; i < start+limit; i++) {
      var object = data[i];
      var newElement = orderTemplate(object);
      order.push(newElement);

      console.log('item:', i);
    }
    
    $content.append(order);
    $content.append("<hr>");
    pageLast+=limit;
    console.log('pageLast:', pageLast);
  }

  $(window).scroll(function() {
    if (Math.round($(window).scrollTop()) + $(window).innerHeight() == $(document).height()) {
      loadData(orderItems, pageLast, pageSize);
    }
  });
});