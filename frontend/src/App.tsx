import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div>
      <div>
        <header>
          <center>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <Button variant={"default"}>
                <UserButton />
              </Button>
            </SignedIn>
          </center>
        </header>
      </div>
    </div>
  );
}

export default App;
