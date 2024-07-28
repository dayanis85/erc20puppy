import { useTheme } from "next-themes";


const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return setTheme("dark")

};

export default ThemeToggler;
