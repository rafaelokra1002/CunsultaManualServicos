const cli = require("next/dist/cli/next-start");
process.argv = ["node", "next", "-p", "3001"];
cli.nextStart();
