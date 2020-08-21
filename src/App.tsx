import React from "react";
import { NavBar } from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import { DEFAULT_THEME } from "./themes";
import { applyTheme } from "./utils/theme";
import { setlocalStorage, getlocalStorage } from "./utils/localStorage";
export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  state = {
    theme: DEFAULT_THEME,
  };
  async componentDidMount() {
    const value = await getlocalStorage("theme");
    if (value) this.setState({ theme: value });
    applyTheme(this.state.theme);
  }
  async setTheme(theme: string) {
    this.setState({ theme: theme });
    applyTheme(theme);
    await setlocalStorage("theme", theme);
  }
  // setDefaultTheme
  render() {
    return (
      <div>
        <div className="p-5">
          <div className="mx-auto m-6">
            {this.state.theme === "default" ? (
              <button
                className="text-secondary border border-primary p-3"
                onClick={() => this.setTheme("dark")}
              >
                Apply Dark Theme
              </button>
            ) : (
              <button
                className="text-secondary border border-primary p-3"
                onClick={() => this.setTheme("default")}
              >
                Apply Light Theme
              </button>
            )}
          </div>
        </div>
        <div className="sticky top-0 z-10 bg-secondary-background">
          <NavBar />
        </div>

        <Home />

        <Footer />
      </div>
    );
  }
}

export default App;
