const prohibitedWords = [
    // please provide all the words you want to reject from comments:
  
    "badword01",
    "badword02",
    "badword03"
  ];
  
  const regexPattern = new RegExp(prohibitedWords.join("|"), "i");
  
  export default regexPattern;