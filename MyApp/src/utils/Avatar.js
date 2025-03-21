import { getRandomColor } from "../constants/colors";

const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const getMerchantAvatar = (merchant) => {
  return {
    initials: getInitials(merchant),
    backgroundColor: getRandomColor(),
  };
};

export { getInitials, getMerchantAvatar };