const readline = require("readline");
const { exec } = require("child_process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const dbName = process.env.DB_NAME;

var recursiveAsyncReadLine = function() {
    rl.question(`${dbName}=# `, function(answer) {
        answer = answer.trim();
        if (answer === "\\q") {
            return rl.close();
        }
        exec(`psql -d ${dbName} -c "${answer}"`, (err, stdout, stderr) => {
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
