

var addNumber=(a,b)=>
{
return a+b;
}


describe("Addition",function(){
it("The function should add 2 numbers",function() {
var value=addNumber(5,6);
expect(value).toBe(11);
});
});