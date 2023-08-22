//========== HTML Console option (opening)

var html_console_out

function html_console_log_setup(){
    if(typeof document == "undefined") return
    html_console_out = document.querySelector("#console_out")
    if(!html_console_out) alert("#console_out not found")
}

html_console_log_setup()

function html_console_log(...args){
    if(typeof document == "undefined") return
    if(!html_console_out) return
    var out_text = [...args].join(" ")+"\n"
    html_console_out.textContent+=out_text
}

function console_log(...args){
    console.log(...args)
    html_console_log(...args)
}

//========== HTML Console option (closing)

var program_for_not_gate=
{
	"start": {
		"type": "copy_bit",
		"read": "input",
		"write": "path_selector_bit",
		"next": "select path for inverting input"
	},
	"select path for inverting input": {
		"type": "select_path",
		"select0": "output 1",
		"select1": "output 0"
	},
	"output 0": {
		"type": "copy_bit",
		"read": "0",
		"write": "output",
		"next": "stop"
	},
	"output 1": {
		"type": "copy_bit",
		"read": "1",
		"write": "output",
		"next": "stop"
	}
}

var program_for_not_gate_combined=
{
	"start": {
		"type": "copy_bit_and_select_path",
		"read": "input",
		"write": "path_selector_bit",
		"select0": "output 1",
		"select1": "output 0"
	},
	"output 0": {
		"type": "copy_bit",
		"read": "0",
		"write": "output",
		"next": "stop"
	},
	"output 1": {
		"type": "copy_bit",
		"read": "1",
		"write": "output",
		"next": "stop"
	}
}

execute(program_for_not_gate_combined)

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
        console_log(what)
    }

    var memory={"0":0, "1":1}
    function read(from){
        if(from=="input") return read_input()
        else return memory[from]
    }
    function write(to, what){
        if(to=="output") write_output("output: "+what)
        else memory[to]=what
    }

    var table={0: "select0", 1: "select1"}
    var label="start"
    while(label!="stop"){
        instruction=program[label]
        console.log(label, instruction)
        if(instruction.type=="copy_bit"){
            write(instruction.write, read(instruction.read))
            label=instruction.next
        }else if(instruction.type=="select_path"){
            label=instruction[table[read("path_selector_bit")]]
        }else if(instruction.type=="copy_bit_and_select_path"){
            write(instruction.write, read(instruction.read))
            label=instruction[table[read("path_selector_bit")]]
        }
    }
}
