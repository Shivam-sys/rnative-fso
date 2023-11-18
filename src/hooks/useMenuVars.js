import { useState } from "react";
const useMenuVars = () => {
  const [menuVisible, setIsMenuVisible] = useState(false);

  const showMenu = () => setIsMenuVisible(true);
  const hideMenu = () => setIsMenuVisible(false);

  return { menuVisible, showMenu, hideMenu };
};

export default useMenuVars;
