
const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const path = require("path");
const { error } = require("console");
const options = { stats: true };
compiler.init(options);

app.use(bodyP.json());
app.use("/codemirror-5.65.16", express.static(path.join(__dirname, 'codemirror-5.65.16')));

app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted");
    });
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;

    try {
        
        if (lang == "Cpp" || lang == "C") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error });
                        console.log(data.error);
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error });
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error });
                        
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error});
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error});
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error });
                    }
                });
            }
        }

    } catch (e) {
        console.log("error");
    }
});

const port = 8000;
const ipAddress = ""; 

app.listen(port, ipAddress, () => {
    console.log(`Server is running on  10.10.12.211:${port}`);
});


