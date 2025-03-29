import { COLORS } from "../constants/colors";

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export { getRandomColor };