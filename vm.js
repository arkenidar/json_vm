
var program_for_not_gate=
{
	"start": {
		"type": "copy",
		"read": "in",
		"write": "ps",
		"next": "select for inverting input"
	},
	"select for inverting input": {
		"type": "select",
		"selector": "ps",
		"select0": "output 1",
		"select1": "output 0"
	},
	"output 0": {
		"type": "copy",
		"read": "0",
		"write": "out",
		"next": "stop"
	},
	"output 1": {
		"type": "copy",
		"read": "1",
		"write": "out",
		"next": "stop"
	}
}
execute(program_for_not_gate)

function execute(program){

    if(typeof prompt!="undefined")
        var question=prompt
    else{
        var readline = require("readline-sync")
        var question=readline.question
    }
    function read_input(){
        while(true){
            var line=question("input: 0 or 1 ? ")
            if(line=="0"||line=="1")
                return parseInt(line)
            else
                write_output("error: input not valid (not 0 nor 1)")
        }
    }
    function write_output(what){
        console.log(what)
    }

    var memory={"0":0, "1":1}
    function read(from){
        if(from=="in") return read_input()
        else return memory[from]
    }
    function write(to, what){
        if(to=="out") write_output("output: "+what)
        else memory[to]=what
    }

    var label="start"
    while(label!="stop"){
        instruction=program[label]
        if(instruction.type=="copy"){
            write(instruction.write, read(instruction.read))
            label=instruction.next
        }else if(instruction.type=="select"){
            var table={0: "select0", 1: "select1"}
            label=instruction[table[read(instruction.selector)]]
        }
    }
}
