import { connectFourApp } from "./app/app";

// eslint-disable-next-line angular/module-getter
connectFourApp.run(["gameMaster", function(gameMaster) { gameMaster.startNewMatch(); }]);