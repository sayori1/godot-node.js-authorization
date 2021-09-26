extends HTTPRequest

var baseURL = "http://127.0.0.1:3030"

var user = {}

func login(login, password):
	var data = {"login":login, "password": password}
	var headers = ["User-Agent: Jeff", "Content-Type: application/json"]
	request(baseURL + "/auth/login", headers, false, HTTPClient.METHOD_POST, JSON.print(data) );

func register(login, password, name):
	var data = {"login":login, "password": password, "name": name}
	var headers = ["User-Agent: Jeff", "Content-Type: application/json"]
	request(baseURL + "/auth/register", headers, false, HTTPClient.METHOD_POST, JSON.print(data) );

func getRequest(result, response_code, headers, body):
	if(response_code == 200):
		print(body.get_string_from_utf8())
		result = JSON.parse(body.get_string_from_utf8())
		user = result.result
		print(user)
		print("successfully created account or logged in")

	print(body.get_string_from_utf8())

func makeRequest(url, data_, method=HTTPClient.METHOD_POST):
	var data = {"token": user.token}
	data["data"] = data_
	var headers = ["User-Agent: Jeff", "Content-Type: application/json"]
	request(baseURL + url, headers, false, method, JSON.print(data) );
