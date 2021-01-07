$(document).ready(function () {

    var index_list = [];
    var count = 0;
    var q1, q2, q3;
    var opts1, opts2, opts3;

    // $('button.btn_start').click(function () {
    //     console.log('hi');
    //     alert('clicked');
    // });

    $('button#start_page').on('click', function (e) {
        // start testing
        // make random questions index
        var index_list = makeRandoms(6);
        // console.log(index_list);
        // get corresponding question str and options
        $.ajax({
            url: './test_ques.json',
            dataType: 'json',
            type: 'get',
            cache: true,
            success: function (data) {
                q1 = data[index_list[0]]['question']
                q2 = data[index_list[1]]['question']
                q3 = data[index_list[2]]['question']
                opts1 = data[index_list[0]]['options']
                opts2 = data[index_list[1]]['options']
                opts3 = data[index_list[2]]['options']
            }
        });

        // $(this).hide();
        $('#question_page .q1 .ques_str').append("<p>" + q1 + "</p>");
        $('#question_page .q1 .options_str #opt1').append("<p>" + opts1[0]['option'] + "</p>");
        // $('#question_page .q1 .options_str ul').append("<li>" + opts1[1]['option'] + "</li>");
        // $('#question_page .q1 .options_str ul').append("<li>" + opts1[2]['option'] + "</li>");
        // $('#question_page .q1 .options_str ul').append("<li>" + opts1[3]['option'] + "</li>");

        $('#question_page .q2 .ques_str').append("<p>" + q2 + "</p>");
        $('#question_page .q2 .options_str ul').append("<li>" + opts2[0]['option'] + "</li>");
        $('#question_page .q2 .options_str ul').append("<li>" + opts2[1]['option'] + "</li>");
        $('#question_page .q2 .options_str ul').append("<li>" + opts2[2]['option'] + "</li>");
        $('#question_page .q2 .options_str ul').append("<li>" + opts2[3]['option'] + "</li>");

        $('#question_page .q3 .ques_str').append("<p>" + q3 + "</p>");
        $('#question_page .q3 .options_str ul').append("<li>" + opts3[0]['option'] + "</li>");
        $('#question_page .q3 .options_str ul').append("<li>" + opts3[1]['option'] + "</li>");
        $('#question_page .q3 .options_str ul').append("<li>" + opts3[2]['option'] + "</li>");
        $('#question_page .q3 .options_str ul').append("<li>" + opts3[3]['option'] + "</li>");
        console.log(q1);
    })

});


// $.ajax({
//     url: './test_ques.json',
//     dataType: 'json',
//     type: 'get',
//     cache: true,
//     success: function (data) {
//         index_list = makeRandoms(data.length); // creat index list
//         // console.log(data);
//         select_ques = [data[index_list[0]], data[index_list[1]], data[index_list[2]]];
//         console.log(select_ques);
//         console.log('here');
//     }
// });




function makeRandoms(notThis) {
    var randoms = [0, 1, 2, 3, 4, 5];
    var result = [];

    // faster way to remove an array item when you don't care about array order
    function removeArrayItem(i) {
        var val = randoms.pop();
        // console.log("pop:", val);
        if (i < randoms.length) {
            randoms[i] = val;
        }
    }

    function makeRandom() {
        var rand = randoms[Math.floor(Math.random() * randoms.length)];
        removeArrayItem(rand);
        return rand;
    }

    // remove the notThis item from the array
    if (notThis < randoms.length) {
        removeArrayItem(notThis);
    }

    result = [makeRandom(), makeRandom(), makeRandom()];
    return result;
}