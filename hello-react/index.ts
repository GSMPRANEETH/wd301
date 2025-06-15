let myName: any = "hello";
myName = 42;
myName = false;

function printHello(): void {
	console.log("Hello!");
}

function throwError(): never {
	throw new Error("An error occurred!");
}

type User = {
	name: string;
	// add other properties if needed
};

function addUser(user: User): string {
	return user.name + " added successfully";
}
