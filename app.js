// import {UserDao} from 'dao/UserDao.js';


var root = "website";
var errorPage = 'error.html';




function login(input, callback) {
	if (Validate.checkParam(input, ['phonenumber', 'password'])) {
		UserDao.checkLoginByPhonenumber(input.phonenumber, input.password, function (err, res) {
			if (err || res == false) {
				callback(null, Output.create(9995, {}));
			}
			else {
				UserDao.findByPhonenumber(input.phonenumber, { id: 1, username: 1, avatar: 1 }, function (err, res) {
					if (err || Validate.isEmpty(res)) {
						callback(null, Output.create(9995, {}));
					}
					else {
						if (Validate.isEmpty(res.avatar))
							res.avatar = '-1';
						var token = UserDao.getToken(input.phonenumber, input.password);
						res.token = token;
						callback(null, Output.create(1000, res));
					}

				});

			}
		});
	}
	else {
		callback(null, Output.create(1002, {}));
	}
}

function login_social(input) {
	var out;
	return out;
}

function logout(input) {
	var out;
	return out;
}

function signup(input, callback) {


	console.log("signup: input: " + JSON.stringify(input));
	if (Validate.checkParam(input, ['phonenumber', 'password'])) {

		UserDao.findOne({ phonenumber: input.phonenumber }, function (err, res) {

			if (err) {
				console.log(err);

				callback(err, Output.create(1001, {}));
			}
			else if (Validate.isEmpty(res)) {
				UserDao.save({ phonenumber: input.phonenumber, password: input.password, uuid: input.uuid }, function (err, res) {
					if (err) {
						//Exception error
						callback(err, Output.create(9999));
					}
					else {
						//OK
						callback(null, Output.create(1000));
					}


				});
			}
			else {
				//User existed
				callback(null, Output.create(9996));
			}
		});

	}
	else {
		callback(null, Output.create(1002));
	}





}
function signup_social(input) {
	var out;
	return out;
}
function signed_social(input) {
	var out;
	return out;
}
function sms_verify(input) {
	var out;
	return out;
}
function resend_sms_verify(input) {
	var out;
	return out;
}
function create_code_reset_password(input, callback) {
	if (Validate.checkParam(input, ['phonenumber'])) {
		const start = 100000, end = 999999;
		var code = Math.floor(Math.random() * (1 + end - start) ) + start;
		
		UserDao.createResetPasswordCode(input.phonenumber, code, function(err, res){
			if (err || res == false){
				callback(err, Output.create(1005));
			}
			else{
				callback(null, Output.create(1000));
			}
		});
	}
	else {
		callback(null, Output.create(1002));
	}
}
function check_code_reset_password(input, callback) {
	if (Validate.checkParam(input, ['phonenumber', 'reset_code'])) {
		
		UserDao.checkResetPasswordCode(input.phonenumber, input.reset_code, function(err, res){
			if (err || res == false){
				callback(err, Output.create(1005));
			}
			else{
				callback(null, Output.create(1000));
			}
		});
	}
	else {
		callback(null, Output.create(1002));
	}
}
function reset_password(input) {
	var out;
	return out;
}
function get_invite_code(input) {
	var out;
	return out;
}
function get_categories(input) {
	var out;
	return out;
}
function get_list_products(input) {
	var out;
	return out;
}
function get_products(input) {
	var out;
	return out;
}
function add_products(input) {
	var out;
	return out;
}
function get_key_add_products(input) {
	var out;
	return out;
}
function edit_products(input) {
	var out;
	return out;
}
function del_products(input) {
	var out;
	return out;
}
function get_comment_products(input) {
	var out;
	return out;
}
function set_comment_products(input) {
	var out;
	return out;
}
function report_products(input) {
	var out;
	return out;
}
function like_products(input) {
	var out;
	return out;
}
function buy_products(input) {
	var out;
	return out;
}
function search(input) {
	var out;
	return out;
}
function save_search(input) {
	var out;
	return out;
}
function get_list_saved_search(input) {
	var out;
	return out;
}
function get_list_news(input) {
	var out;
	return out;
}
function get_news(input) {
	var out;
	return out;
}
function get_my_likes(input) {
	var out;
	return out;
}
function get_user_listings(input) {
	var out;
	return out;
}
function get_my_purchases(input) {
	var out;
	return out;
}
function get_notification(input) {
	var out;
	return out;
}
function get_user_info(input) {
	var out;
	return out;
}
function set_user_info(input) {
	var out;
	return out;
}
function get_rates(input) {
	var out;
	return out;
}
function set_rates(input) {
	var out;
	return out;
}
function get_list_blocks(input) {
	var out;
	return out;
}
function blocks(input) {
	var out;
	return out;
}
function get_list_sizes(input) {
	var out;
	return out;
}
function get_list_brands(input) {
	var out;
	return out;
}
function get_list_buyer_products(input) {
	var out;
	return out;
}
function set_accept_buyer(input) {
	var out;
	return out;
}
function set_confirm_purchases(input) {
	var out;
	return out;
}
function search_user(input) {
	var out;
	return out;
}
function set_follow_user(input) {
	var out;
	return out;
}
function get_ship_from(input) {
	var out;
	return out;
}
function change_state_purchase(input) {
	var out;
	return out;
}
function get_list_purchase(input) {
	var out;
	return out;
}
function request_withdraw(input) {
	var out;
	return out;
}
function cancel_withdraw(input) {
	var out;
	return out;
}
function get_balance_history(input) {
	var out;
	return out;
}
function get_list_followed(input) {
	var out;
	return out;
}
function get_list_following(input) {
	var out;
	return out;
}
function get_deposit_history(input) {
	var out;
	return out;
}
function change_password(input) {
	var out;
	return out;
}
function get_push_setting(input) {
	var out;
	return out;
}
function set_push_setting(input) {
	var out;
	return out;
}
function get_order_status(input) {
	var out;
	return out;
}
function change_info_after_signup(input) {
	var out;
	return out;
}
function get_current_balance(input) {
	var out;
	return out;
}
function get_user_setting(input) {
	var out;
	return out;
}
function set_user_setting(input) {
	var out;
	return out;
}
function check_new_version(input) {
	var out;
	return out;
}
function set_devtoken(input) {
	var out;
	return out;
}
function get_purchase(input) {
	var out;
	return out;
}
function edit_purchase(input) {
	var out;
	return out;
}
function get_deposit_detail(input) {
	var out;
	return out;
}
function check_password(input) {
	var out;
	return out;
}
function get_rating_data(input) {
	var out;
	return out;
}
function login_admin(input) {
	var out;
	return out;
}
function get_ship_fee(input) {
	var out;
	return out;
}
function set_conversation(input) {
	var out;
	return out;
}
function set_conversation(input) {
	var out;
	return out;
}
function get_list_order_address(input) {
	var out;
	return out;
}
function add_order_address(input) {
	var out;
	return out;
}
function edit_order_address(input) {
	var out;
	return out;
}
function delete_order_address(input) {
	var out;
	return out;
}
function accept_offers(input) {
	var out;
	return out;
}
function set_offers(input) {
	var out;
	return out;
}
function sent_sms_withdraw(input) {
	var out;
	return out;
}
function get_list_conversation(input) {
	var out;
	return out;
}
function get_conversation_detail(input) {
	var out;
	return out;
}
function get_list_user_bank(input) {
	var out;
	return out;
}
function add_user_bank(input) {
	var out;
	return out;
}
function edit_user_bank(input) {
	var out;
	return out;
}
function delete_user_bank(input) {
	var out;
	return out;
}
function check_promotion_code(input) {
	var out;
	return out;
}
function get_list_campaigns(input) {
	var out;
	return out;
}
function check_new_items(input) {
	var out;
	return out;
}
function set_user_contact(input) {
	var out;
	return out;
}
function set_read_message(input) {
	var out;
	return out;
}
function upload_video(input) {
	var out;
	return out;
}
function set_read_notification(input) {
	var out;
	return out;
}
function get_list_charity_campaign(input) {
	var out;
	return out;
}
function get_charity_campaign(input) {
	var out;
	return out;
}
function get_list_product_donated(input) {
	var out;
	return out;
}
function get_list_member_donated(input) {
	var out;
	return out;
}
function get_user_history_donate(input) {
	var out;
	return out;
}
function donates(input) {
	var out;
	return out;
}
function get_rank_donate(input) {
	var out;
	return out;
}
function cancel_donate(input) {
	var out;
	return out;
}
function get_key_voisearch(input) {
	var out;
	return out;
}


function post(req, res) {
	console.log("POST " + req.url);

	var api = {
		'/api/login': login,
		'/api/login_social': login_social,
		'/api/logout': logout,
		'/api/signup': signup,
		'/api/signup_social': signup_social,
		'/api/sms_verify': sms_verify,
		'/api/resend_sms_verify': resend_sms_verify,
		'/api/create_code_reset_password': create_code_reset_password,
		'/api/check_code_reset_password': check_code_reset_password,
		'/api/reset_password': reset_password,
		'/api/get_invite_code': get_invite_code,
		'/api/get_categories': get_categories,
		'/api/get_list_products': get_list_products,
		'/api/get_products': get_products,
		'/api/add_products': add_products,
		'/api/get_key_add_products': get_key_add_products,
		'/api/edit_products': edit_products,
		'/api/del_products': del_products,
		'/api/get_comment_products': get_comment_products,
		'/api/set_comment_products': set_comment_products,
		'/api/report_products': report_products,
		'/api/like_products': like_products,
		'/api/buy_products': buy_products,
		'/api/search': search,
		'/api/save_search': save_search,
		'/api/get_list_saved_search': get_list_saved_search,
		'/api/get_list_news': get_list_news,
		'/api/get_news': get_news,
		'/api/get_my_likes': get_my_likes,
		'/api/get_user_listings': get_user_listings,
		'/api/get_my_purchases': get_my_purchases,
		'/api/get_notification': get_notification,
		'/api/get_user_info': get_user_info,
		'/api/set_user_info': set_user_info,
		'/api/get_rates': get_rates,
		'/api/set_rates': set_rates,
		'/api/get_list_blocks': get_list_blocks,
		'/api/blocks': blocks,
		'/api/get_list_sizes': get_list_sizes,
		'/api/get_list_brands': get_list_brands,
		'/api/get_list_buyer_products': get_list_buyer_products,
		'/api/set_accept_buyer': set_accept_buyer,
		'/api/set_confirm_purchases': set_confirm_purchases,
		'/api/search_user': search_user,
		'/api/set_follow_user': set_follow_user,
		'/api/get_ship_from': get_ship_from,
		'/api/change_state_purchase': change_state_purchase,
		'/api/get_list_purchase': get_list_purchase,
		'/api/request_withdraw': request_withdraw,
		'/api/cancel_withdraw': cancel_withdraw,
		'/api/get_balance_history': get_balance_history,
		'/api/get_list_followed': get_list_followed,
		'/api/get_list_following': get_list_following,
		'/api/get_deposit_history': get_deposit_history,
		'/api/change_password': change_password,
		'/api/get_push_setting': get_push_setting,
		'/api/set_push_setting': set_push_setting,
		'/api/get_order_status': get_order_status,
		'/api/change_info_after_signup': change_info_after_signup,
		'/api/get_current_balance': get_current_balance,
		'/api/get_user_setting': get_user_setting,
		'/api/set_user_setting': set_user_setting,
		'/api/check_new_version': check_new_version,
		'/api/set_devtoken': set_devtoken,
		'/api/get_purchase': get_purchase,
		'/api/edit_purchase': edit_purchase,
		'/api/get_deposit_detail': get_deposit_detail,
		'/api/check_password': check_password,
		'/api/get_rating_data': get_rating_data,
		'/api/login_admin': login_admin,
		'/api/get_ship_fee': get_ship_fee,
		'/api/set_conversation': set_conversation,
		'/api/get_list_order_address': get_list_order_address,
		'/api/add_order_address': add_order_address,
		'/api/edit_order_address': edit_order_address,
		'/api/delete_order_address': delete_order_address,
		'/api/accept_offers': accept_offers,
		'/api/set_offers': set_offers,
		'/api/sent_sms_withdraw': sent_sms_withdraw,
		'/api/get_list_conversation': get_list_conversation,
		'/api/get_conversation_detail': get_conversation_detail,
		'/api/get_list_user_bank': get_list_user_bank,
		'/api/add_user_bank': add_user_bank,
		'/api/edit_user_bank': edit_user_bank,
		'/api/delete_user_bank': delete_user_bank,
		'/api/check_promotion_code': check_promotion_code,
		'/api/get_list_campaigns': get_list_campaigns,
		'/api/check_new_items': check_new_items,
		'/api/set_user_contact': set_user_contact,
		'/api/set_read_message': set_read_message,
		'/api/upload_video': upload_video,
		'/api/set_read_notification': set_read_notification,
		'/api/get_list_charity_campaign': get_list_charity_campaign,
		'/api/get_charity_campaign': get_charity_campaign,
		'/api/get_list_product_donated': get_list_product_donated,
		'/api/get_list_member_donated': get_list_member_donated,
		'/api/get_user_history_donate': get_user_history_donate,
		'/api/donates': donates,
		'/api/get_rank_donate': get_rank_donate,
		'/api/cancel_donate': cancel_donate,
		'/api/get_key_voisearch': get_key_voisearch
	};

	var apiFun = api[req.url];
	if (apiFun != null) {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString(); // convert Buffer to string
		});
		req.on('end', () => {
			console.log(body);
			apiFun(JSON.parse(body), function (err, result) {
				result = JSON.stringify(result);
				res.writeHead(200, { 'Content-Type': mime.getType('.JSON'), 'Content-Length': result.length });
				res.end(result);
			});


		});
		// console.log(req);


	}
	else {
		//not found
	}

}


function get(req, res) {
	//	console.log(req.getHeader());
	var path = require("path"),
		fileSystem = require("fs"),
		filePath;

	console.log("GET " + req.url);

	if (req.url === "/") {
		filePath = path.join(root, "index.html");
	}
	else {
		filePath = path.join(root, req.url);
		//		pathName += req.url.pathname;
	}

	//	console.log(filePath);

	if (!fileSystem.existsSync(filePath)) {
		filePath = path.join(root, errorPage);
	}

	var stat = fileSystem.statSync(filePath);

	// console.log(res.type("html"));

	// console.log(path.extname(filePath));
	// res.type(path.extname(filePath))

	//	console.log(mime.getType(filePath));
	res.writeHead(200, { 'Content-Type': mime.getType(filePath), 'Content-Length': stat.size });

	//	res.writeHead(200, {'Content-Type': 'text/plain'});

	var readStream = fileSystem.createReadStream(filePath);
	readStream.pipe(res);

}





var UserDao = require('./dao/UserDao');
// var LoginDao = require('./dao/LoginDao');

var Validate = require('./util/Validate');
var Output = require('./util/Output');

var http = require('http');
var mime = require('./mime');
http.createServer(function handler(req, res) {

	if (req.method === "GET") {
		get(req, res);
		//		res.writeHead(200, {'Content-Type': 'text/plain'});
		//		res.end('Hello World\n');
	}
	else if (req.method === "POST") {
		post(req, res);
	}
}).listen(80, '127.0.0.1');
console.log('Server running at http://127.0.0.1:80/');



