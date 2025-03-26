const COLORS = [
    "rgb(16, 24, 39)",
    "rgb(20, 83, 45)",  
    "rgb(120, 53, 15)", 
    "rgb(127, 29, 29)",
    "rgb(158, 25, 86)",
    "rgb(51, 31, 128)", 
    "rgb(187, 71, 36)", 
    "rgb(232, 105, 21)",
    "rgb(72, 66, 167)",
    "rgb(53, 122, 91)",
    "rgb(2, 5, 141)",
  ];
  
  const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
  
  export { COLORS, getRandomColor };