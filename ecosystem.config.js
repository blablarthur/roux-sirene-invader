module.exports = {
  apps : [
  {
    name   : "segment_file",
    script : "./segment_file.js"
  },
  {
   name: "worker",
   script: "./worker.js",
   args: "1" 
  }]
}
