import { useTheme } from "next-themes";


const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  setTheme("dark")

};

export default ThemeToggler;
