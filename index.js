const readline = require("readline");
const { exec } = require("child_process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var recursiveAsyncReadLine = function() {
    rl.question("openchs=# ", function(answer) {
        answer = answer.trim();
        if (answer === "\\q") {
            return rl.close();
        }
        exec(`psql -d openchs -c "${answer}"`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return rl.close();
            }
            console.log(stdout);
            recursiveAsyncReadLine();
        });
    });
};

recursiveAsyncReadLine();
