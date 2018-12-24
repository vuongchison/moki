// import {UserDao} from 'dao/UserDao.js';


var root = "D:\\Eclipse\\moki\\website";
var errorPage = 'error.html';




function login(input, callback) {
	if (Validate.checkParam(input, ['phonenumber', 'password'])) {
		if (Validate.checkPhonenumber(input.phonenumber) && Validate.checkPassword(input.password)) {

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
							res.id = res['_id'];
							ssn.phonenumber = input.phonenumber;
							console.log("ssn: phonenumber: " + ssn.phonenumber);
							callback(null, Output.create(1000, Filter(res, ['id', 'username', 'avatar', 'token'])));
						}

					});

				}
			});
		}
		else {
			callback(null, Output.create(1004, {}));
		}

	}
	else {
		callback(null, Output.create(1002, {}));
	}
}

function login_social(input, callback) {


}

function logout(input, callback) {
	ssn.destroy();
	callback(null, Output.create(1000));

}

function signup(input, callback) {

	console.log("signup: input: " + JSON.stringify(input, callback));
	if (Validate.checkParam(input, ['phonenumber', 'password'])) {

		if (Validate.checkPhonenumber(input.phonenumber) && Validate.checkPassword(input.password)) {

			UserDao.findByPhonenumber({ phonenumber: input.phonenumber }, {}, function (err, res) {

				if (err) {
					console.log(err);

					callback(err, Output.create(1001, {}));
				}
				else if (Validate.isEmpty(res)) {
					var code = RandomCode();

					UserDao.save({ phonenumber: input.phonenumber, password: input.password, uuid: input.uuid, verified: false, VerifyCode: code, CreateCodeTime: Date.now(), active: -1 }, function (err, res) {
						if (err) {
							//Exception error
							callback(err, Output.create(9999));
						}
						else {
							//OK
							callback(null, Output.create(1000));
							SMS.send(input.phonenumber, "Verify code: " + code);

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
			callback(null, Output.create(1004));
		}

	}
	else {
		callback(null, Output.create(1002));
	}
}

function signup_social(input, callback) {


}
function signed_social(input, callback) {


}
function sms_verify(input, callback) {
	if (Validate.checkParam(input, ['phonenumber', 'code_verify'])) {
		if (Validate.checkPhonenumber(input.phonenumber)) {
			var phonenumber = input.phonenumber;
			var code_verify = parseInt(input.code_verify);

			UserDao.checkVerifyCode(phonenumber, code_verify, function (err, res) {
				if (err) {
					callback(null, Output.create(1001));
				} else if (res == true) {
					UserDao.findByPhonenumber(phonenumber, { id: 1, active: 1, password: 1 }, function (err, res) {
						console.log("sms_verify: res: " + JSON.stringify(res));

						if (err || Validate.isEmpty(res)) {
							callback(null, Output.create(1001));
						} else {
							var token = UserDao.getToken(input.phonenumber, res.password);

							callback(null, Output.create(1000, { id: res.id, token: token, active: res.active }));

							UserDao.updateByPhonenumber(input.phonenumber, { verified: true }, function (err, res) { });
						}
					});
				} else {

				}
			});
		} else {
			callback(null, Output.create(1004));
		}
	} else {
		callback(null, Output.create(1002));
	}
}
function resend_sms_verify(input, callback) {
	if (Validate.checkParam(input, ['phonenumber'])) {
		if (Validate.checkPhonenumber(input.phonenumber)) {
			var code = RandomCode();
			UserDao.createVerifyCode(input.phonenumber, code, function (err, res) {
				if (err || res == false) {
					callback(null, Output.create(1001));
				} else {
					callback(null, Output.create(1000));
					SMS.send(input.phonenumber, "Verify code: " + code);

				}
			});
		} else {
			callback(null, Output.create(1004));
		}
	} else {
		callback(null, Output.create(1002));
	}
}
function create_code_reset_password(input, callback) {
	if (Validate.checkParam(input, ['phonenumber'])) {
		// const start = 100000, end = 999999;
		// var code = Math.floor(Math.random() * (1 + end - start)) + start;
		var code = RandomCode();

		UserDao.createVerifyCode(input.phonenumber, code, function (err, res) {
			if (err || res == false) {
				callback(err, Output.create(1005));
			}
			else {
				callback(null, Output.create(1000));

				SMS.send(input.phonenumber, "Reset password code: " + code);
			}
		});
	}
	else {
		callback(null, Output.create(1002));
	}
}
function check_code_reset_password(input, callback) {
	if (Validate.checkParam(input, ['phonenumber', 'reset_code'])) {

		UserDao.checkResetPasswordCode(input.phonenumber, input.reset_code, function (err, res) {
			if (err || res == false) {
				callback(err, Output.create(1005));
			}
			else {
				callback(null, Output.create(1000));
			}
		});
	}
	else {
		callback(null, Output.create(1002));
	}
}
function reset_password(input, callback) {
	if (Validate.checkParam(input, ['phonenumber', 'password'])) {
		var phonenumber = input.phonenumber, password = input.password;
		if (Validate.checkPhonenumber(phonenumber) && Validate.checkPassword(password)) {
			UserDao.updateByPhonenumber(phonenumber, { password: password }, function (err, res) {
				if (err || res == false) {
					callback(null, Output.create(1001));
				} else {
					var token = UserDao.getToken(input.phonenumber, res.password);

					callback(null, Output.create(1000, { id: res.id, token: token, avatar: res.avatar || null }));
				}
			});
		} else {
			callback(null, Output.create(1004));
		}
	} else {
		callback(null, Output.create(1002));
	}
}
function get_invite_code(input, callback) {
	//bỏ
}

function get_categories(input, callback) {
	// thì giả sử tất cả categories không có danh mục con ở bên trong (has_child = 0), và không có weight (require_weight = 0), has_brand = 1. 
	//Trường sort thì bỏ đi

	CategoryDao.find({}, { id: 1, name: 1 }, function (err, res) {
		if (err) {
			callback(err, Output.create(1001));
		}
		else {
			res = res || [];
			for (var i = 0, l = res.length; i < l; i++) {
				res[i]['has_child'] = '0';
				res[i]['require_weight'] = '0';
				res[i]['has_brand'] = '1';
			}
			callback(null, Output.create(1000, res));
		}
	});


}
function get_list_products(input, callback) {
	// cần bỏ đi các tham số input sau: price_min, price_max, seller_id, in_campaign, order, longtitude, lattitude, keyword

	if (Validate.checkParam(input, ['index', 'count'])) {
		var index = parseInt(input.index);
		var count = parseInt(input.count);
		console.log("input: " + JSON.stringify(input));
		var query = {};
		if (input.category_id)
			query['category.id'] = (input.category_id);
		if (input.brand_id)
			query['brand.id'] = (input.brand_id);
		if (input.product_size_id)
			query['size.id'] = (input.product_size_id);
		if (input.condition)
			query['condition'] = input.condition;

		ProductDao.find(query, { _id: 0, id: 1, name: 1, image: 1, video: 1, price: 1, price_percent: 1, brand: 1, described: 1, created: 1, like: 1, comment: 1, state: 1 }, function (err, res) {
			if (err) {
				callback(err, Output.create(1001));
			}
			else {
				//sắp xếp theo ngày tạo (mới -> cũ)
				res.sort((a, b) => - parseInt(a.created) + parseInt(b.created));

				// console.log("res: " + JSON.stringify(res));

				var last_index = -1;
				if (input.last_id) {
					last_index = res.findIndex((i) => (i.id == input.last_id));
				}
				console.log('last_index: ' + last_index);
				if (index > res.length - 1) {
					callback(null, Output.create(1000));
				}
				else if (index >= last_index + 1) {
					//không có sản phẩm mới đăng hoặc lần đầu get_list_products

					var result = res.slice(index, index + count);
					// console.log("result: " + result);
					callback(null, Output.create(1000, { products: result, new_items: 0, last_id: result[result.length - 1]['id'] }));

				} else {
					//có sản phẩm mới đăng
					var result = [];
					var first_index = last_index - index + 1; //product đầu tiên đã get
					var c = 0;

					for (var i = first_index - 1; c < count && i >= 0; i-- , c++) {
						result.push(res[i]);
					}

					for (var i = last_index + 1, l = res.length; c < count && i < l; i++ , c++) {
						result.push(res[i]);
					}

					callback(null, Output.create(1000, { products: result, new_items: first_index, last_id: result[result.length - 1].id }));

				}

			}
		});


	}
	else {
		callback(null, Output.create(1002));
	}

}
function get_products(input, callback) {
	// bỏ các trường price_new, modified, best_offers, can_buy, product_waiting_rate, seller_vacation_mode, offers, allow_offer, auto_accept, messages (nằm trong data)
	if (Validate.checkParam(input, ['id'])) {
		ProductDao.findById(input.id, { _id: 0, id: 1, name: 1, price: 1, price_percent: 1, described: 1, ships_from: 1, ships_from_id: 1, condition: 1, created: 1, like: 1, comment: 1, image: 1, video: 1, size: 1, brand: 1, seller: 1, category: 1, state: 1, weight: 1, dimension: 1 }, function (err, res) {
			if (err) {
				callback(err, Output.create(1001));
			} else if (Validate.isEmpty(res)) {
				callback(err, Output.create(1004));
			} else {
				callback(err, Output.create(1000, res));
			}
		});
	} else {
		callback(null, Output.create(1002));
	}
}
function add_products(input, callback) {
	// Trường (input) key của API add_product bỏ, price_new, allow_offer, auto_accept bỏ. Trả về url để người dùng có thể share sản phẩm. Trường thumb chỉ cần nếu client trước đó có gọi api upload_video. Trường image, video phải gửi mảng byte lên.

	if (Validate.checkParam(input, ['token', 'name', 'price', 'category_id', 'ships_from', 'ships_from_id', 'condition'])) {
		var user = UserDao.checkToken(input.token);
		if (user == false) {
			callback(null, Output.create(9998));
		} else {
			UserDao.findByPhonenumber(user.phonenumber, { id: 1, name: 1, avatar: 1 }, function (err, res) {
				if (err) {
					callback(err, Output.create(1001));
				} else if (Validate.isEmpty(res)) {
					callback(null, Output.create(1004));
				} else {
					var product = Filter(input, ['name', 'price', 'image', 'video', 'thumb', 'described', 'condition', 'dimension', 'weight']);

					product[seller] = res;

					if (product[brand]) product[brand] = { id: id };


					CategoryDao.findById(input.category_id, { id: 1, name: 1 }, function (err, res) {
						if (err) {
							callback(err, Output.create(1001));
						} else if (Validate.isEmpty(res)) {
							callback(null, Output.create(1004));
						} else {

							product[category] = [{ id: res.id, name: res.name }];
							product[id] = parseInt(db.product_last_id) + 1;
							product[created] = product[modified] = Math.floor(Date.now() / 1000);


							ProductDao.save(product, function (err, res) {
								if (err || Validate.isEmpty(res)) {
									callback(err, Output.create(1001));
								} else {
									db.product_last_id++;
									callback(null, Output.create(1000), { id: res.id, url: "/product/" + id });
								}
							});

						}
					});
				}
			});
		}
	} else {
		callback(null, Output.create(1002));
	}

}
function get_key_add_products(input, callback) {
	//bỏ

}
function edit_products(input, callback) {
	if (Validate.checkParam(input, ['token', 'id'])) {
		var user = UserDao.checkToken(input.token);
		if (user == false) {
			callback(null, Output.create(9998));
		} else {
			UserDao.findByPhonenumber(user.phonenumber, { id: 1, phonenumber: 1 }, function (err, res) {
				if (err) {
					callback(err, Output.create(1001));
				} else if (Validate.isEmpty(res)) {
					callback(null, Output.create(1004));
				} else {
					var userId = res.id;
					ProductDao.findById(input.id, {}, function (err, res) {
						if (err) {
							callback(err, Output.create(1001));
						} else if (Validate.isEmpty(res)) {
							callback(null, Output.create(1004));
						} else if (userId != res.seller.id) {
							//not access
							callback(null, Output.create(1009));
						} else {
							var values = Filter(input, ['name', 'price', 'described', 'brand_id', 'ships_from', 'ships_from_id', 'condition', 'dimension', 'weight']);

							if (input['brand_id']) values['brand'] = { id: input['brand_id'] };
							if (input['category_id']) values['category'] = { id: input['category_id'] };

							values[modified] = Math.floor(Date.now() / 1000);

							ProductDao.updateById(input.id, values, function (err, res) {
								if (err) {
									callback(err, Output.create(1001));
								} else if (Validate.isEmpty(res)) {
									callback(null, Output.create(1004));
								} else {
									callback(null, Output.create(1000));
								}
							})
						}

					})

				}
			});
		}
	} else {
		callback(null, Output.create(1002));
	}

}
function del_products(input, callback) {
	if (Validate.checkParam(input, ['token', 'id'])) {
		var user = UserDao.checkToken(input.token);
		if (user == false) {
			callback(null, Output.create(9998));
		} else {
			UserDao.findByPhonenumber(user.phonenumber, { id: 1, phonenumber: 1 }, function (err, res) {
				if (err) {
					callback(err, Output.create(1001));
				} else if (Validate.isEmpty(res)) {
					callback(null, Output.create(1004));
				} else {
					var userId = res.id;
					ProductDao.findById(input.id, {}, function (err, res) {
						if (err) {
							callback(err, Output.create(1001));
						} else if (Validate.isEmpty(res)) {
							callback(null, Output.create(1004));
						} else if (userId != res.seller.id) {
							//not access
							callback(null, Output.create(1009));
						} else {
							ProductDao.deleteById(input.id, function (err, res) {
								if (err || res == false) {
									callback(err, Output.create(1001));
								} else {
									callback(null, Output.create(1000));
								}
							})
						}

					})

				}
			});
		}
	} else {
		callback(null, Output.create(1002));
	}

}
function get_comment_products(input, callback) {


}
function set_comment_products(input, callback) {


}
function report_products(input, callback) {


}
function like_products(input, callback) {


}
function buy_products(input, callback) {
	//bỏ

}
function search(input, callback) {

	if (Validate.checkParam(input, ['index', 'count'])) {
		var index = parseInt(input.index);
		var count = parseInt(input.count);
		console.log("input: " + JSON.stringify(input));
		var query = {};
		if (input.category_id)
			query['category.id'] = (input.category_id);
		if (input.brand_id)
			query['brand.id'] = (input.brand_id);
		if (input.product_size_id)
			query['size.id'] = (input.product_size_id);
		if (input.price_min)
			query['price']['$gte'] = parseInt(input.price_min);
		if (input.price_max)
			query['price']['$lte'] = parseInt(input.price_max);
		if (input.condition)
			query['condition'] = input.condition;
		if (input.seller_id)
			query['seller.id'] = input.seller_id;

		var keyword = (input['keyword'] || '');

		ProductDao.search(keyword, query, { _id: 0, id: 1, name: 1, image: 1, video: 1, price: 1, price_percent: 1, like: 1, comment: 1 }, function (err, res) {
			if (err) {
				callback(err, Output.create(1001));
			}
			else {

				var result = res.slice(index, index + count);
				for (var i = 0, l = result.length; i < l; i++) {
					result[i] = Filter(result[i], ['id', 'name', 'image', 'video', 'price', 'price_percent', 'like', 'comment', 'described']);

				}
				callback(null, Output.create(1000, result));


			}
		});


	}
	else {
		callback(null, Output.create(1002));
	}


}
function save_search(input, callback) {


}
function get_list_saved_search(input, callback) {


}
function get_list_news(input, callback) {


}
function get_news(input, callback) {


}
function get_my_likes(input, callback) {


}
function get_user_listings(input, callback) {


}
function get_my_purchases(input, callback) {


}
function get_notification(input, callback) {
	//bỏ

}
function get_user_info(input, callback) {


}
function set_user_info(input, callback) {


}
function get_rates(input, callback) {


}
function set_rates(input, callback) {


}
function get_list_blocks(input, callback) {


}
function blocks(input, callback) {


}
function get_list_sizes(input, callback) {


}
function get_list_brands(input, callback) {


}
function get_list_buyer_products(input, callback) {


}
function set_accept_buyer(input, callback) {


}
function set_confirm_purchases(input, callback) {


}
function search_user(input, callback) {


}
function set_follow_user(input, callback) {


}
function get_ship_from(input, callback) {


}
function change_state_purchase(input, callback) {


}
function get_list_purchase(input, callback) {


}
function request_withdraw(input, callback) {


}
function cancel_withdraw(input, callback) {


}
function get_balance_history(input, callback) {


}
function get_list_followed(input, callback) {


}
function get_list_following(input, callback) {


}
function get_deposit_history(input, callback) {


}
function change_password(input, callback) {
	if (Validate.checkParam(input, ['token', 'password', 'new_password'])) {
		if (Validate.checkPassword(input['new_password']) && Validate.checkPassword(input['password'])) {
			var user = UserDao.checkToken(input['token']);
			if (!user) {
				callback(null, Output.create(9998));
			} else {
				var phonenumber = user['phonenumber'];
				if (input['password'] != user['password']) {
					callback(err, Output.create(9995));
				}
				UserDao.updateByPhonenumber(phonenumber, { password: input['new_password'] }, function (err, res) {
					if (err || !res) {
						callback(err, Output.create(1001));
					} else {
						callback(err, Output.create(1000, { token: UserDao.getToken(phonenumber, input['new_password']) }));
					}
				});
			}
		} else {
			callback(null, Output.create(1004));
		}
	} else {
		callback(null, Output.create(1002));
	}

}
function get_push_setting(input, callback) {


}
function set_push_setting(input, callback) {


}
function get_order_status(input, callback) {


}
function change_info_after_signup(input, callback) {


}
function get_current_balance(input, callback) {


}
function get_user_setting(input, callback) {


}
function set_user_setting(input, callback) {


}
function check_new_version(input, callback) {


}
function set_devtoken(input, callback) {


}
function get_purchase(input, callback) {


}
function edit_purchase(input, callback) {


}
function get_deposit_detail(input, callback) {


}
function check_password(input, callback) {
	// console.log("input: " + JSON.stringify(input));
	if (Validate.checkParam(input, ['token', 'password'])) {
		if (Validate.checkPassword(input['password'])) {
			var user = UserDao.checkToken(input['token']);
			if (!user) {
				callback(null, Output.create(9998));
			} else {
				var phonenumber = user['phonenumber'];
				if (input['password'] === user['password']) {
					callback(null, Output.create(1000, { is_correct: 1 }));
				} else {
					UserDao.findByPhonenumber(phonenumber, { password: 1 }, function (err, res) {
						if (err || Validate.isEmpty(res)) {
							callback(err, Output.create(1001));
						} else if (input['password'] === res['password']) {
							callback(err, Output.create(1000, { is_correct: 1 }));
						} else {
							callback(err, Output.create(1000, { is_correct: 0 }));
						}
					})
				}


			}
		} else {
			callback(null, Output.create(1004));
		}
	} else {
		callback(null, Output.create(1002));
	}

}
function get_rating_data(input, callback) {


}
function login_admin(input, callback) {


}
function get_ship_fee(input, callback) {


}
function set_conversation(input, callback) {


}
function set_conversation(input, callback) {


}
function get_list_order_address(input, callback) {


}
function add_order_address(input, callback) {


}
function edit_order_address(input, callback) {


}
function delete_order_address(input, callback) {


}
function accept_offers(input, callback) {


}
function set_offers(input, callback) {


}
function sent_sms_withdraw(input, callback) {


}
function get_list_conversation(input, callback) {


}
function get_conversation_detail(input, callback) {


}
function get_list_user_bank(input, callback) {


}
function add_user_bank(input, callback) {


}
function edit_user_bank(input, callback) {


}
function delete_user_bank(input, callback) {


}
function check_promotion_code(input, callback) {


}
function get_list_campaigns(input, callback) {


}
function check_new_items(input, callback) {


}
function set_user_contact(input, callback) {
	//bỏ

}
function set_read_message(input, callback) {


}
function upload_video(input, callback) {
	//không cần làm

}
function set_read_notification(input, callback) {
	//bỏ

}
function get_list_charity_campaign(input, callback) {


}
function get_charity_campaign(input, callback) {


}
function get_list_product_donated(input, callback) {


}
function get_list_member_donated(input, callback) {


}
function get_user_history_donate(input, callback) {


}
function donates(input, callback) {


}
function get_rank_donate(input, callback) {


}
function cancel_donate(input, callback) {


}
function get_key_voisearch(input, callback) {


}


function post(req, res) {
	console.log("POST " + req.originalUrl);

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

	var apiFun = api[req.originalUrl];
	if (apiFun != null) {

		ssn = req.session; console.log('phonenumber: ' + ssn.phonenumber);
		try {
			apiFun(req.body, function (err, result) {
				// result = JSON.stringify(result);
				if (err) {
					console.log(err);
				}
				res.status(200);
				res.json(result);
			});
		} catch (err) {
			console.log(err);
		}

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
	}

	if (!fileSystem.existsSync(filePath)) {
		filePath = path.join(root, errorPage);
	}

	var stat = fileSystem.statSync(filePath);
	res.writeHead(200, { 'Content-Type': mime.getType(filePath), 'Content-Length': stat.size });

	var readStream = fileSystem.createReadStream(filePath);
	readStream.pipe(res);

}





var UserDao = require('./dao/UserDao');
var CategoryDao = require('./dao/CategoryDao');
var ProductDao = require('./dao/ProductDao');

var Validate = require('./util/Validate');
var Output = require('./util/Output');
var SMS = require('./util/SMS');
var RandomCode = require('./util/RandomCode');
var Filter = require('./util/Filter');
var File = require('./util/File');

const dbConfigPath = './config/mongodb.JSON';
var db = File.loadData(dbConfigPath);

process.on('exit', (code) => {
	console.log("exiting...");
	File.storeData(db, dbConfigPath);
});
process.on('SIGINT', function () {
	console.log("Interrupt signal");
	process.exit();
});


var mime = require('./mime');
var https = require('https');
var http = require('http');
var pem = require('pem');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var ssn;

pem.config({
	pathOpenSSL: 'C:\\Program Files\\OpenSSL-Win64\\bin\\openssl.exe'
});
pem.createCertificate({ days: 365, selfSigned: true }, function (err, keys) {
	if (err) {
		throw err;
	}
	console.log(keys);

	var app = express();
	app.use(session({ secret: 'MOKI' }));
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



	app.get('/', function (req, res) {
		var path = require("path"),
			fileSystem = require("fs"),
			filePath;

		console.log("GET " + req.originalUrl);

		filePath = path.join(root, "index.html");


		if (!fileSystem.existsSync(filePath)) {
			filePath = path.join(root, errorPage);
		}
		console.log(filePath);
		res.status(200);
		res.sendFile(filePath);
	});

	app.get('/*', function (req, res) {
		var path = require("path"),
			fileSystem = require("fs"),
			filePath;

		console.log("GET " + req.path);

		filePath = path.join(root, req.path);


		if (!fileSystem.existsSync(filePath)) {
			// filePath = path.join(root, errorPage);
			res.sendStatus(404);

		}
		else {
			res.status(200);
			res.sendFile(filePath);
		}
	});

	app.post('/api/*', post);
	app.post('/login.html', function (req, res) {
		req.originalUrl = '/api/login';
		post(req, res);
	});

	http.createServer(app).listen(80);
	https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(443);

});