extends Control

func loginButton():
	API.login($VBoxContainer/Login.text, $VBoxContainer/Password.text)

func regButton():
	API.register($VBoxContainer/Login.text, $VBoxContainer/Password.text, $VBoxContainer/Name.text)

func test():
	API.makeRequest("/check_access", {"message":"test"}, HTTPClient.METHOD_GET)
