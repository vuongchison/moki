import MongoDbConnection from "../db/MongoDbConnection";

class ProductDao {
	userId;
	
	constructor(userId)
	{
		this.userId = userId;
	}
	
	
	save(product) {
		MongoDbConnection.getConnect();
	}
	
	find() {
		
	}
	
	getAll() {
		
	}
	
	update() {
		
	}
	
	delete() {
		
	}
	
}