var ques_index;
var test_count;
var test_count_max = 3;
var ques_data;
var count_point;
var ques1, ques2, ques3;


function start() {
    reset();
    console.log('start');

    fetch('./test_ques.json').then(function (resp) {
        return resp.json();
    }).then(function (data) {
        self.ques_data = data;
        self.ques_index = select_random_questions(data.length);
        ques1 = data[ques_index[0]];
        ques2 = data[ques_index[1]];
        ques3 = data[ques_index[2]];
        set_ques_and_opt_string(1, ques1);
        set_ques_and_opt_string(2, ques2);
        set_ques_and_opt_string(3, ques3);
    })

    $('#start_page').hide();
    $('.q' + self.test_count).show();
}

function set_ques_and_opt_string(index, ques_num) {
    $(".q" + index + " .question_" + index).append('<p>' + ques_num['question'] + '</p>')

    for (var i = 1; i <= 4; i++) {
        var id_num = "r" + index + "_" + i;
        $("input#" + id_num).next("label[for='" + id_num + "']").next("span").text(ques_num['options'][i - 1]['option'])
    }
}

function select_random_questions(random_range) {
    var rand1 = Math.floor(Math.random() * random_range);
    var rand2 = Math.floor(Math.random() * random_range);
    var rand3 = Math.floor(Math.random() * random_range);
    var duplicated = true;

    while (duplicated) {
        if (rand2 === rand1) {
            rand2 = Math.floor(Math.random() * random_range);
            continue;
        }
        if (rand3 === rand1 || rand3 === rand2) {
            rand3 = Math.floor(Math.random() * random_range);
            continue;
        }
        duplicated = false;
    }
    return [rand1, rand2, rand3];
}



function get_select() {
    var radio_name = "radio_" + self.test_count;
    var opt_val = $("input[name=" + radio_name + "]:checked").val();
    return opt_val;
}

function my_confirm() {
    var opt_val = get_select(test_count);

    if (opt_val == null) {
        alert('請先選擇答案');
        return false;
    } else {
        var confirm_msg = "Your select option is: " + opt_val + ", submit?";
    }

    if (confirm(confirm_msg) == true) {
        self.count_point += self.ques_data[self.ques_index[self.test_count - 1]]['options'][opt_val - 1]['point']
        console.log('count point: ', self.count_point);
        if (self.test_count < self.test_count_max) {
            $('.q' + self.test_count).hide();
            self.test_count += 1;
            $('.q' + self.test_count).show();
        } else {
            show_result();
        }
    } else {
        return false;
    }
}

function show_result() {
    $('.q' + self.test_count).hide();
    switch (Math.floor(self.count_point / 4)) {
        case 3:
            console.log('10-12');
            $('.show_result').append("<img id='result_img' src='imgs/result_classic.png' alt='Result Img'/>");
            break;
        case 2:
            console.log('7-9');
            $('.show_result').append("<img id='result_img' src='imgs/result_old.png' alt='Result Img'/>");
            break;
        case 1:
            console.log('4-6');
            $('.show_result').append("<img id='result_img' src='imgs/result_rock.png' alt='Result Img'/> ");
            break;
        case 0:
            console.log('1-3');
            $('.show_result').append("<img id='result_img' src='imgs/result_pop.png' alt='Result Img'/> ");
            break;
        default:
            console.log('no result');
    }
    $('.show_result').show();
}

function reset() {
    self.ques_index = [];
    self.ques_data = null;
    self.count_point = 0;
    self.test_count = 1;
}

// $(document).ready(function () {

//     $('button#start').on('click', function () {
//         start();
//         // $('#start_page').hide();
//         // $('.q' + self.test_count).show();
//     })
// });