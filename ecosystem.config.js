module.exports = {
  apps : [
  {
    name   : "segment_file",
    script : "./segment_file.js"
  },
  {
   name: "worker",
   script: "./worker.js",
   args: "0" 
  },
  {
    name: "worker",
    script: "./worker.js",
    args: "1" 
   },
   {
    name: "worker",
    script: "./worker.js",
    args: "2" 
   }]
}